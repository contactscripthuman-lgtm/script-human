import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb, admin } from '@/lib/firebase-admin';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                await handleSubscriptionCreated(checkoutSession);
                break;
            case 'customer.subscription.updated':
                const subscriptionUpdated = event.data.object as Stripe.Subscription;
                await handleSubscriptionUpdated(subscriptionUpdated);
                break;
            case 'customer.subscription.deleted':
                const subscriptionDeleted = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscriptionDeleted);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Error handling webhook event:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
    const uid = session.client_reference_id || session.metadata?.uid;
    if (!uid) {
        console.error('No UID found in checkout session');
        return;
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const priceId = subscription.items.data[0].price.id;

    const { planType, features } = getPlanDetails(priceId);

    // Storing under users/{uid}/subscription/current to match plan requirements and support easy fetching
    await adminDb.collection('users').doc(uid).collection('subscription').doc('current').set({
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subscription.id,
        planType,
        status: subscription.status,
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const snapshot = await adminDb.collectionGroup('subscription').where('stripeSubscriptionId', '==', subscription.id).get();

    if (snapshot.empty) {
        console.error(`No user found for subscription ${subscription.id}`);
        return;
    }

    const doc = snapshot.docs[0];
    const priceId = subscription.items.data[0].price.id;
    const { planType, features } = getPlanDetails(priceId);

    await doc.ref.update({
        planType,
        status: subscription.status,
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const snapshot = await adminDb.collectionGroup('subscription').where('stripeSubscriptionId', '==', subscription.id).get();

    if (snapshot.empty) {
        return;
    }

    const doc = snapshot.docs[0];
    const { planType, features } = getPlanDetails('free');

    await doc.ref.update({
        planType: 'Free',
        status: 'canceled',
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

function getPlanDetails(priceId: string) {
    switch (priceId) {
        case process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID:
        case 'price_enterprise':
            return {
                planType: 'Enterprise',
                features: { humanizeLimit: -1, bypassesLimit: -1, forensicAnalysis: true }
            };
        case process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID:
        case 'price_pro':
            return {
                planType: 'Pro',
                features: { humanizeLimit: 50, bypassesLimit: 100, forensicAnalysis: false }
            };
        case process.env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID:
        case 'price_cert':
            return {
                planType: 'Certificate',
                features: { humanizeLimit: -1, bypassesLimit: -1, forensicAnalysis: true }
            };
        default:
            return {
                planType: 'Free',
                features: { humanizeLimit: 5, bypassesLimit: 10, forensicAnalysis: false }
            };
    }
}

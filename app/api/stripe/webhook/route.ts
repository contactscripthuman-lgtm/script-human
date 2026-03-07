import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb, admin } from '@/lib/firebase-admin';
import { getPlanDetails, FREE_PLAN } from '@/lib/stripe-plans';
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
        console.error('No UID found in checkout session - skipping webhook');
        return;
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const priceId = subscription.items.data[0].price.id;

    const isActive = subscription.status === 'active' || subscription.status === 'trialing';
    const details = getPlanDetails(priceId);

    await adminDb.collection('users').doc(uid).collection('subscription').doc('current').set({
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subscription.id,
        planType: isActive ? details.planType : FREE_PLAN.planType,
        status: subscription.status,
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features: isActive ? details.features : FREE_PLAN.features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    let snapshot = await adminDb.collectionGroup('subscription').where('stripeSubscriptionId', '==', subscription.id).get();

    if (snapshot.empty && subscription.customer) {
        snapshot = await adminDb.collectionGroup('subscription').where('stripeCustomerId', '==', subscription.customer).get();
    }

    if (snapshot.empty) {
        console.error(`No user found for subscription ${subscription.id} - skipping webhook`);
        return;
    }

    const doc = snapshot.docs[0];
    const priceId = subscription.items.data[0].price.id;

    const isActive = subscription.status === 'active' || subscription.status === 'trialing';
    const details = getPlanDetails(priceId);

    await doc.ref.update({
        planType: isActive ? details.planType : FREE_PLAN.planType,
        status: subscription.status,
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features: isActive ? details.features : FREE_PLAN.features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        stripeSubscriptionId: subscription.id,
    });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    let snapshot = await adminDb.collectionGroup('subscription').where('stripeSubscriptionId', '==', subscription.id).get();

    if (snapshot.empty && subscription.customer) {
        snapshot = await adminDb.collectionGroup('subscription').where('stripeCustomerId', '==', subscription.customer).get();
    }

    if (snapshot.empty) {
        console.log(`No user found for deleted subscription ${subscription.id} - skipping webhook`);
        return;
    }

    const doc = snapshot.docs[0];

    await doc.ref.update({
        planType: FREE_PLAN.planType,
        status: 'canceled',
        currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
        features: FREE_PLAN.features,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

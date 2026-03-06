import { NextResponse } from 'next/server';
import { adminDb, admin } from '@/lib/firebase-admin';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { uid, sessionId } = body;

        if (!uid && !sessionId) {
            return NextResponse.json({ error: 'Missing uid or sessionId' }, { status: 400 });
        }

        let stripeSubscriptionId: string | undefined = undefined;
        let stripeCustomerId: string | undefined = undefined;
        let actualUid = uid;

        // Try getting subscription ID from user document first
        if (actualUid) {
            const subscriptionDoc = await adminDb.collection('users').doc(actualUid).collection('subscription').doc('current').get();
            if (subscriptionDoc.exists) {
                stripeSubscriptionId = subscriptionDoc.data()?.stripeSubscriptionId;
            }
        }

        // If no subscription record found, try to fetch from Stripe session instead
        if (!stripeSubscriptionId && sessionId) {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.subscription) {
                stripeSubscriptionId = session.subscription as string;
                stripeCustomerId = session.customer as string;
                if (!actualUid) {
                    actualUid = session.client_reference_id || session.metadata?.uid;
                }
            }
        }

        if (!stripeSubscriptionId || !actualUid) {
            return NextResponse.json({ success: true, message: 'No Stripe subscription ID found in Firebase or Session.' });
        }

        const subscriptionDocRef = adminDb.collection('users').doc(actualUid).collection('subscription').doc('current');

        // Fetch the latest full subscription object from Stripe
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

        // Ensure there is actually a price attached to it
        if (!subscription.items.data || subscription.items.data.length === 0) {
            return NextResponse.json({ error: 'No items on Stripe subscription.' }, { status: 400 });
        }

        const priceId = subscription.items.data[0].price.id;
        const { planType, features } = getPlanDetails(priceId);

        const updateData: any = {
            planType: subscription.status === 'active' || subscription.status === 'trialing' ? planType : 'Free',
            status: subscription.status,
            currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
            features,
            stripeSubscriptionId: subscription.id,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        if (stripeCustomerId) {
            updateData.stripeCustomerId = stripeCustomerId;
        }

        // Update Firebase with the definitive source of truth from Stripe
        await subscriptionDocRef.set(updateData, { merge: true });

        return NextResponse.json({
            success: true,
            message: 'Successfully synced subscription from Stripe',
            planType: subscription.status === 'active' || subscription.status === 'trialing' ? planType : 'Free'
        });

    } catch (error: any) {
        console.error('Stripe Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

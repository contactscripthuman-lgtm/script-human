import { NextResponse } from 'next/server';
import { adminDb, admin } from '@/lib/firebase-admin';
import { stripe } from '@/lib/stripe';
import { getPlanDetails, FREE_PLAN } from '@/lib/stripe-plans';
import Stripe from 'stripe';

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
        const isActive = subscription.status === 'active' || subscription.status === 'trialing';
        const { planType, features } = getPlanDetails(priceId);

        const updateData: Record<string, unknown> = {
            planType: isActive ? planType : FREE_PLAN.planType,
            status: subscription.status,
            currentPeriodEnd: admin.firestore.Timestamp.fromMillis((subscription as any).current_period_end * 1000),
            features: isActive ? features : FREE_PLAN.features,
            stripeSubscriptionId: subscription.id,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        if (stripeCustomerId) {
            updateData.stripeCustomerId = stripeCustomerId;
        }

        // Update Firebase with the definitive source of truth from Stripe
        await subscriptionDocRef.set(updateData, { merge: true });

        const resolvedPlan = isActive ? planType : FREE_PLAN.planType;
        return NextResponse.json({
            success: true,
            message: 'Successfully synced subscription from Stripe',
            planType: resolvedPlan,
        });

    } catch (error: any) {
        console.error('Stripe Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { uid } = body;

        if (!uid) {
            return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
        }

        const subscriptionDoc = await adminDb.collection('users').doc(uid).collection('subscription').doc('current').get();

        if (!subscriptionDoc.exists) {
            return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
        }

        const stripeCustomerId = subscriptionDoc.data()?.stripeCustomerId;

        if (!stripeCustomerId) {
            return NextResponse.json({ error: 'No stripe customer found' }, { status: 404 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Portal Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

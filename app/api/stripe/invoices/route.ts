import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

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

        const invoices = await stripe.invoices.list({
            customer: stripeCustomerId,
            limit: 1, // Only get the latest invoice
        });

        if (invoices.data.length === 0 || !invoices.data[0].invoice_pdf) {
            return NextResponse.json({ error: 'No invoices available to download' }, { status: 404 });
        }

        return NextResponse.json({ url: invoices.data[0].invoice_pdf });
    } catch (error: any) {
        console.error('Invoice Fetch Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

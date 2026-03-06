import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { priceId, uid } = body;

        if (!priceId || !uid) {
            return NextResponse.json({ error: 'Missing priceId or uid' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&price_id=${priceId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
            client_reference_id: uid,
            metadata: {
                uid, // Backup storage for uid
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length) {
        acc[key.trim()] = values.join('=').trim().replace(/"/g, '').replace(/'/g, '');
    }
    return acc;
}, {});

const stripe = require('stripe')(env.STRIPE_SECRET_KEY);

async function check() {
    console.log("Fetching recent checkout sessions...");
    const sessions = await stripe.checkout.sessions.list({ limit: 5 });
    for (const session of sessions.data) {
        console.log(`Session: ${session.id} - Status: ${session.status} - Payment Status: ${session.payment_status}`);
        if (session.subscription) {
            const sub = await stripe.subscriptions.retrieve(session.subscription);
            console.log(`  Subscription: ${sub.id} - Status: ${sub.status}`);
            console.log(`  Price ID: ${sub.items.data[0].price.id}`);

            // Check if it matches environment variables
            const certPrice = env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID;
            const proPrice = env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;
            const entPrice = env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID;
            console.log(`  Matches Certificate? ${sub.items.data[0].price.id === certPrice} (env: ${certPrice})`);
            console.log(`  Matches Pro? ${sub.items.data[0].price.id === proPrice} (env: ${proPrice})`);
        } else {
            console.log(`  No subscription created.`);
        }
    }
}
check();

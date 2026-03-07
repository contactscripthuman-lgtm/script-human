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
    const sessions = await stripe.checkout.sessions.list({ limit: 2 });
    for (const session of sessions.data) {
        console.log(`Session: ${session.id}`);
        console.log(`  client_reference_id: ${session.client_reference_id}`);
        console.log(`  metadata.uid: ${session.metadata?.uid}`);
    }
}
check();

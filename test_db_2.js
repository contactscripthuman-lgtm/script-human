const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Load env 
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length) {
        acc[key.trim()] = values.join('=').trim().replace(/"/g, '').replace(/'/g, '');
    }
    return acc;
}, {});

const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

const app = initializeApp({
    credential: cert({
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    })
});

const db = getFirestore(app);

async function check() {
    const sub = await db.collection('users').doc('TWuuC3Aj38VCowLbzH0PGbOhNx93').collection('subscription').doc('current').get();
    if (sub.exists) {
        console.log(sub.data());
    } else {
        console.log("No sub");
    }
}
check();

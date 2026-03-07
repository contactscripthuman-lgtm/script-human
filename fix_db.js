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

async function fix() {
    console.log("Fixing subscription for TWuuC3Aj38VCowLbzH0PGbOhNx93...");
    const subRef = db.collection('users').doc('TWuuC3Aj38VCowLbzH0PGbOhNx93').collection('subscription').doc('current');

    await subRef.set({
        planType: 'Pro',
        status: 'active',
        features: { humanizeLimit: 50, bypassesLimit: 100, forensicAnalysis: false },
        updatedAt: new Date()
    }, { merge: true });

    console.log("Done! User is now Pro.");
}
fix();

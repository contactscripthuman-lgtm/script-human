const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf8'));

const app = initializeApp({
    credential: cert(serviceAccount)
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

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Use the environment variable for credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = './service-account.json';

const app = initializeApp();
const db = getFirestore();

async function fix() {
    console.log("Fixing subscription for TWuuC3Aj38VCowLbzH0PGbOhNx93...");
    const subRef = db.collection('users').doc('TWuuC3Aj38VCowLbzH0PGbOhNx93').collection('subscription').doc('current');

    await subRef.set({
        planType: 'Pro',
        status: 'active',
        features: { humanizeLimit: 50, bypassesLimit: 100, forensicAnalysis: false },
        updatedAt: new Date(),
        stripeSubscriptionId: 'sub_1T7wInAlFhFcAwV0jxeX3VMg'
    }, { merge: true });

    console.log("Done! User is now Pro.");
}
fix();

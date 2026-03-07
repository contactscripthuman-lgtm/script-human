const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf8'));

const app = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(app);

async function initDb() {
    console.log("Initializing database collections...");

    // Create a dummy user
    const dummyUserId = 'dummy_system_user';
    const userRef = db.collection('users').doc(dummyUserId);

    await userRef.set({
        email: 'system@scripthuman.com',
        createdAt: FieldValue.serverTimestamp(),
        role: 'system_placeholder'
    });

    // Create subscription subcollection
    await userRef.collection('subscription').doc('current').set({
        planType: 'Free',
        status: 'active',
        features: { humanizeLimit: 5, bypassesLimit: 10, forensicAnalysis: false },
        stripeCustomerId: 'cus_dummy123',
        stripeSubscriptionId: 'sub_dummy123',
        currentPeriodEnd: Timestamp.now(),
        updatedAt: FieldValue.serverTimestamp()
    });

    // Create usage subcollection
    await userRef.collection('usage').doc('currentMonth').set({
        humanize: 0,
        bypass: 0,
        updatedAt: FieldValue.serverTimestamp()
    });

    console.log("Firestore Database schema initialized successfully!");
    process.exit(0);
}

initDb().catch(console.error);

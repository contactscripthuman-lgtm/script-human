const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf8'));

const app = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(app);

async function check() {
    const users = await db.collection('users').limit(10).get();
    for (const user of users.docs) {
        console.log("User:", user.id);
        const sub = await db.collection('users').doc(user.id).collection('subscription').doc('current').get();
        if (sub.exists) {
            console.log("  Subscription Tier:", sub.data().planType);
            console.log("  Features:", sub.data().features);
        } else {
            console.log("  No subscription");
        }
    }
}
check();

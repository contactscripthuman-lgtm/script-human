/**
 * Test script to verify Firebase Admin can write and read certificates from Firestore.
 * Run with: node scripts/test-firebase-cert.mjs
 */
import { readFileSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load env manually since we're outside Next.js
const env = {};
try {
    const raw = readFileSync(".env.local", "utf-8");
    for (const line of raw.split("\n")) {
        const [key, ...rest] = line.split("=");
        if (key && rest.length > 0) {
            env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
        }
    }
} catch (e) {
    console.error("Could not read .env.local:", e.message);
    process.exit(1);
}

const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const db = admin.firestore();

async function run() {
    const testId = `TEST-${Date.now()}`;
    console.log(`Writing test certificate with ID: ${testId}`);

    await db.collection("certificates").doc(testId).set({
        certificateId: testId,
        textHash: "abc123",
        confidenceScore: 88,
        verdict: "Likely Human",
        issuedAt: new Date().toISOString(),
        layers: {
            authenticity: { score: 90 },
            quality: { score: 85 },
            originality: { score: 88 },
            credibility: { score: 87 },
        },
        metrics: {},
    });

    console.log("Write successful! Reading back...");

    const snap = await db.collection("certificates").doc(testId).get();
    if (snap.exists) {
        console.log("✅ Read SUCCESS. Certificate data:", JSON.stringify(snap.data(), null, 2));
    } else {
        console.log("❌ Read FAILED — document does not exist after write!");
    }

    // Cleanup
    await db.collection("certificates").doc(testId).delete();
    console.log("Cleaned up test document.");
    process.exit(0);
}

run().catch((err) => {
    console.error("❌ ERROR:", err.message);
    process.exit(1);
});

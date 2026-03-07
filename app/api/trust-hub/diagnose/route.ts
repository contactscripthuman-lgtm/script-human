import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
    const results: Record<string, unknown> = {
        env: {
            hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
            hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
            hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
            privateKeyStarts: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30),
        }
    };

    try {
        const testId = `DIAG-${Date.now()}`;
        await adminDb.collection("certificates").doc(testId).set({
            test: true,
            createdAt: new Date().toISOString()
        });
        const snap = await adminDb.collection("certificates").doc(testId).get();
        await adminDb.collection("certificates").doc(testId).delete();

        results.firestore = {
            writeOk: true,
            readOk: snap.exists,
        };
    } catch (err) {
        results.firestore = {
            error: err instanceof Error ? err.message : String(err)
        };
    }

    return NextResponse.json(results);
}

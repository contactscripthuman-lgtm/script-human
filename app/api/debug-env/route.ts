import { NextResponse } from 'next/server';
import { adminDb, admin } from '@/lib/firebase-admin';

export async function GET() {
    try {
        // Test if Firebase admin can write a test document
        const testRef = adminDb.collection('_test').doc('env-check');
        await testRef.set({ timestamp: admin.firestore.FieldValue.serverTimestamp() });
        return NextResponse.json({
            success: true,
            message: 'Firebase Admin SDK is working',
            hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
            hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
            hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
            hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
            hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        });
    }
}

import { adminDb } from "@/lib/firebase-admin";
import type { VerificationData } from "./types";
import crypto from "crypto";

/**
 * Generate a cryptographically secure, branded certificate ID
 * Format: SH-{YEAR}-{RANDOM_HEX}-{TIMESTAMP}
 * Example: SH-2026-A1B2C3D4-1234
 */
function generateCandidateId(): string {
    const year = new Date().getFullYear();
    const randomBytes = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 chars
    const timestamp = Date.now().toString().slice(-4);
    return `SH-${year}-${randomBytes}-${timestamp}`;
}

/**
 * Generate a guaranteed unique Certificate ID
 */
export async function generateUniqueCertificateId(): Promise<string> {
    let isUnique = false;
    let certificateId = "";
    let attempts = 0;

    while (!isUnique && attempts < 10) {
        certificateId = generateCandidateId();
        const docRef = adminDb.collection("certificates").doc(certificateId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            isUnique = true;
        } else {
            attempts++;
        }
    }

    if (!isUnique) {
        throw new Error("Failed to generate unique Certificate ID after multiple attempts");
    }

    return certificateId;
}

/**
 * Store certificate for verification
 */
export async function storeCertificate(data: VerificationData): Promise<void> {
    await adminDb.collection("certificates").doc(data.certificateId).set(data);
}

/**
 * Retrieve certificate for verification
 */
export async function getCertificate(certificateId: string): Promise<VerificationData | null> {
    const docSnap = await adminDb.collection("certificates").doc(certificateId).get();
    if (docSnap.exists) {
        return docSnap.data() as VerificationData;
    }
    return null;
}

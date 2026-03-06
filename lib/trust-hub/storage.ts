
import fs from 'fs';
import path from 'path';
import type { VerificationData } from "./types";
import crypto from "crypto";

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
const CERTIFICATES_FILE = path.join(DATA_DIR, 'certificates.json');

// Ensure directory and file exist on module load
try {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
} catch (e) {
    console.warn("Could not create data directory, file persistence may fail if not exists:", e);
}

/**
 * Generate a cryptographically secure, branded certificate ID
 * Format: SH-{YEAR}-{RANDOM_HEX}-{CHECKSUM}
 * Example: SH-2026-A1B2C3D4-9X
 */
function generateCandidateId(): string {
    const year = new Date().getFullYear();
    const randomBytes = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 chars
    const timestamp = Date.now().toString().slice(-4);
    return `SH-${year}-${randomBytes}-${timestamp}`;
}

/**
 * Read certificates from local JSON file
 */
function readCertificates(): Record<string, VerificationData> {
    try {
        if (!fs.existsSync(CERTIFICATES_FILE)) {
            return {};
        }
        const data = fs.readFileSync(CERTIFICATES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read certificates file:', error);
        return {};
    }
}

/**
 * Write certificates to local JSON file
 */
function writeCertificates(certificates: Record<string, VerificationData>): void {
    try {
        fs.writeFileSync(CERTIFICATES_FILE, JSON.stringify(certificates, null, 2));
    } catch (error) {
        console.error('Failed to write certificates file:', error);
        throw new Error('Local storage failed');
    }
}

/**
 * Generate a guaranteed unique Certificate ID
 */
export async function generateUniqueCertificateId(): Promise<string> {
    let isUnique = false;
    let certificateId = "";
    let attempts = 0;

    // Read current certificates once to check against
    const certificates = readCertificates();

    while (!isUnique && attempts < 10) {
        certificateId = generateCandidateId();
        if (!certificates[certificateId]) {
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
    const certificates = readCertificates();
    certificates[data.certificateId] = data;
    writeCertificates(certificates);
}

/**
 * Retrieve certificate for verification
 */
export async function getCertificate(certificateId: string): Promise<VerificationData | null> {
    const certificates = readCertificates();
    return certificates[certificateId] || null;
}

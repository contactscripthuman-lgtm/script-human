import crypto from 'crypto';
import { adminDb, admin } from '@/lib/firebase-admin';

export interface ApiKey {
    id: string;
    userId: string;
    keyHash: string;
    keyPrefix: string;
    name: string;
    planType: string;
    isActive: boolean;
    createdAt: string;
    lastUsedAt: string | null;
    usageCount: number;
}

const COLLECTION = 'api_keys';

/**
 * Generates a new API key
 * Format: sk_live_[32 random hex chars]
 */
export function generateApiKey(): string {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return `sk_live_${randomBytes}`; // Total length: 8 + 32 = 40 chars
}

/**
 * Hashes the API key for secure storage using SHA-256
 */
export function hashApiKey(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Store a new API key in Firestore.
 * Returns the stored metadata (NOT the raw key — that is only shown once to the user).
 */
export async function storeApiKey(userId: string, name: string, planType: string): Promise<{ rawKey: string; meta: Omit<ApiKey, 'keyHash'> }> {
    const rawKey = generateApiKey();
    const keyHash = hashApiKey(rawKey);
    const keyPrefix = rawKey.substring(0, 15) + '...';

    const docRef = adminDb.collection(COLLECTION).doc();
    const now = new Date().toISOString();

    const data: ApiKey = {
        id: docRef.id,
        userId,
        keyHash,
        keyPrefix,
        name: name || 'API Key',
        planType,
        isActive: true,
        createdAt: now,
        lastUsedAt: null,
        usageCount: 0,
    };

    await docRef.set(data);

    // Return meta without the hash
    const { keyHash: _omit, ...meta } = data;
    return { rawKey, meta };
}

/**
 * List all active API keys for a user (without exposing keyHash).
 */
export async function listApiKeys(userId: string): Promise<Omit<ApiKey, 'keyHash'>[]> {
    const snapshot = await adminDb
        .collection(COLLECTION)
        .where('userId', '==', userId)
        .where('isActive', '==', true)
        .orderBy('createdAt', 'desc')
        .get();

    return snapshot.docs.map(doc => {
        const data = doc.data() as ApiKey;
        const { keyHash: _omit, ...rest } = data;
        return rest;
    });
}

/**
 * Soft-delete an API key by ID (sets isActive = false).
 */
export async function revokeApiKey(keyId: string, userId: string): Promise<boolean> {
    const docRef = adminDb.collection(COLLECTION).doc(keyId);
    const snap = await docRef.get();

    if (!snap.exists || snap.data()?.userId !== userId) {
        return false; // Not found or not owned by this user
    }

    await docRef.update({
        isActive: false,
        revokedAt: new Date().toISOString(),
    });

    return true;
}

/**
 * Validates an API key from an incoming request.
 * Hashes the raw key and looks it up in Firestore.
 * Updates lastUsedAt and usageCount on success.
 */
export async function validateApiKey(apiKey: string): Promise<Omit<ApiKey, 'keyHash'> | null> {
    // 1. Basic format check
    if (!apiKey || !apiKey.startsWith('sk_live_') || apiKey.length !== 40) {
        return null;
    }

    // 2. Hash and look up
    const keyHash = hashApiKey(apiKey);
    const snapshot = await adminDb
        .collection(COLLECTION)
        .where('keyHash', '==', keyHash)
        .where('isActive', '==', true)
        .limit(1)
        .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data() as ApiKey;

    // 3. Update last used timestamp and usage counter
    await doc.ref.update({
        lastUsedAt: new Date().toISOString(),
        usageCount: admin.firestore.FieldValue.increment(1),
    });

    const { keyHash: _omit, ...rest } = data;
    return rest;
}

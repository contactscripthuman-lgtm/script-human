import crypto from 'crypto';

export interface ApiKey {
    id: string;
    user_id: string;
    key_prefix: string;
    name: string;
    created_at: string;
    last_used_at: string | null;
    is_active: boolean;
}

/**
 * Generates a new API key
 * Format: sk_live_[32 random hex chars]
 */
export function generateApiKey(): string {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return `sk_live_${randomBytes}`; // Total length: 8 + 32 = 40 chars
}

/**
 * Hashes the API key for secure storage
 * Uses SHA-256
 */
export function hashApiKey(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Validates an API key against the database
 * Returns the key record if valid, null otherwise
 */
export async function validateApiKey(apiKey: string): Promise<ApiKey | null> {
    // 1. Basic format check
    if (!apiKey.startsWith('sk_live_')) {
        return null;
    }

    // Mock validation to simulate DB check
    const isValid = apiKey.length === 40; // Basic mock validation

    if (!isValid) {
        return null;
    }

    return {
        id: 'mock-key-1',
        user_id: 'mock-user-123',
        key_prefix: 'sk_live_mock...',
        name: 'Mock Validation Key',
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        is_active: true
    } as ApiKey;
}

/**
 * API Key Management Utilities
 * Client-side key generation and validation
 */

export interface APIKey {
    id: string;
    key: string;
    name: string;
    created: Date;
    lastUsed: Date | null;
    requestCount: number;
    isActive: boolean;
}

export interface APIRequest {
    id: string;
    timestamp: Date;
    text: string;
    sanitizedText: string;
    changes: Array<{ original: string; replacement: string; position: number }>;
    complianceScore: number;
    processingTime: number;
    apiKey: string;
}

/**
 * Generate a new API key
 */
export function generateAPIKey(): string {
    const prefix = 'ent';
    const random = Array.from({ length: 32 }, () =>
        Math.random().toString(36)[2] || '0'
    ).join('');

    return `${prefix}_${random}`;
}

/**
 * Create a new API key entry
 */
export function createAPIKey(name: string): APIKey {
    return {
        id: `key-${Date.now()}`,
        key: generateAPIKey(),
        name,
        created: new Date(),
        lastUsed: null,
        requestCount: 0,
        isActive: true
    };
}

/**
 * Get all API keys from localStorage
 */
export function getAPIKeys(): APIKey[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem('enterprise_api_keys');
    if (!stored) return [];

    const keys = JSON.parse(stored);
    return keys.map((k: APIKey) => ({
        ...k,
        created: new Date(k.created),
        lastUsed: k.lastUsed ? new Date(k.lastUsed) : null
    }));
}

/**
 * Save API keys to localStorage
 */
export function saveAPIKeys(keys: APIKey[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('enterprise_api_keys', JSON.stringify(keys));
}

/**
 * Validate API key
 */
export function validateAPIKey(key: string): APIKey | null {
    const keys = getAPIKeys();
    const found = keys.find(k => k.key === key && k.isActive);
    return found || null;
}

/**
 * Get transparency log (last 100 requests)
 */
export function getTransparencyLog(): APIRequest[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem('enterprise_transparency_log');
    if (!stored) return [];

    const log = JSON.parse(stored);
    return log.map((r: APIRequest) => ({
        ...r,
        timestamp: new Date(r.timestamp)
    }));
}

/**
 * Add request to transparency log
 */
export function addToTransparencyLog(request: APIRequest): void {
    if (typeof window === 'undefined') return;

    const log = getTransparencyLog();
    log.unshift(request);

    // Keep only last 100
    const trimmed = log.slice(0, 100);

    localStorage.setItem('enterprise_transparency_log', JSON.stringify(trimmed));
}

/**
 * Calculate RPS (requests per second) from log
 */
export function calculateRPS(): number {
    const log = getTransparencyLog();
    const now = new Date().getTime();
    const oneSecondAgo = now - 1000;

    const recentRequests = log.filter(r => r.timestamp.getTime() > oneSecondAgo);
    return recentRequests.length;
}

/**
 * Calculate average latency from recent requests
 */
export function calculateAvgLatency(): number {
    const log = getTransparencyLog();

    if (log.length === 0) return 0;

    const recent = log.slice(0, 10); // Last 10 requests
    const total = recent.reduce((sum, r) => sum + r.processingTime, 0);

    return Math.round(total / recent.length);
}

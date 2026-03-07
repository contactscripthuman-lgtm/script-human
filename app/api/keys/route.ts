import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { storeApiKey, listApiKeys, revokeApiKey } from '@/lib/api-keys';

/** Helper to get the authenticated Firebase user from the Authorization header. */
async function getAuthUser(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;
    const idToken = authHeader.split('Bearer ')[1];
    try {
        return await adminAuth.verifyIdToken(idToken);
    } catch {
        return null;
    }
}

/** Helper to check the user's subscription plan from Firestore. */
async function getUserPlan(uid: string): Promise<string> {
    const subDoc = await adminDb
        .collection('users')
        .doc(uid)
        .collection('subscription')
        .doc('current')
        .get();
    return (subDoc.exists ? subDoc.data()?.planType : 'Free') ?? 'Free';
}

/**
 * GET /api/keys
 * List all active API keys for the authenticated Enterprise user.
 */
export async function GET(req: NextRequest) {
    const decodedUser = await getAuthUser(req);
    if (!decodedUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plan = await getUserPlan(decodedUser.uid);
    if (plan !== 'Enterprise') {
        return NextResponse.json(
            { error: 'API key access requires the Enterprise plan.' },
            { status: 403 }
        );
    }

    const keys = await listApiKeys(decodedUser.uid);
    return NextResponse.json({ keys });
}

/**
 * POST /api/keys
 * Generate a new API key for the authenticated Enterprise user.
 * The raw key is returned ONCE — it cannot be retrieved again.
 */
export async function POST(req: NextRequest) {
    const decodedUser = await getAuthUser(req);
    if (!decodedUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plan = await getUserPlan(decodedUser.uid);
    if (plan !== 'Enterprise') {
        return NextResponse.json(
            { error: 'API key generation requires the Enterprise plan.' },
            { status: 403 }
        );
    }

    // Enforce a max of 5 active keys per user
    const existingKeys = await listApiKeys(decodedUser.uid);
    if (existingKeys.length >= 5) {
        return NextResponse.json(
            { error: 'Maximum of 5 active API keys allowed. Please revoke an existing key first.' },
            { status: 429 }
        );
    }

    const { name } = await req.json().catch(() => ({ name: 'API Key' }));
    const { rawKey, meta } = await storeApiKey(decodedUser.uid, name, plan);

    return NextResponse.json({
        message: 'API key created. Save this key now — it will not be shown again.',
        key: rawKey,
        meta,
    });
}

/**
 * DELETE /api/keys
 * Revoke an API key by ID.
 */
export async function DELETE(req: NextRequest) {
    const decodedUser = await getAuthUser(req);
    if (!decodedUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json().catch(() => ({ id: null }));
    if (!id) {
        return NextResponse.json({ error: 'Missing key ID' }, { status: 400 });
    }

    const revoked = await revokeApiKey(id, decodedUser.uid);
    if (!revoked) {
        return NextResponse.json({ error: 'Key not found or not owned by you' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'API key revoked.' });
}

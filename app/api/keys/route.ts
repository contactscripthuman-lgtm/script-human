import { NextRequest, NextResponse} from 'next/server';
import { generateApiKey, hashApiKey} from '@/lib/api-keys';

/**
 * GET /api/keys
 * List all active API keys for the current user
 */
export async function GET(_req: NextRequest) {
    // Mock user for now
    const user = { id: 'mock-user-123'};

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401});
   }

    // Mock keys
    const keys = [
        {
            id: 'mock-key-1',
            key_prefix: 'sk_live_mock...',
            name: 'Default Key',
            created_at: new Date().toISOString(),
            last_used_at: null
       }
    ];

    return NextResponse.json({ keys});
}

/**
 * POST /api/keys
 * Generate a new API key
 */
export async function POST(req: NextRequest) {
    // Mock user for now
    const user = { id: 'mock-user-123'};

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401});
   }

    const { name} = await req.json().catch(() => ({ name: 'Default Key'}));

    // Generate key
    const rawKey = generateApiKey();
    const prefix = rawKey.substring(0, 15) + '...';

    // Mock DB insert return
    const data = {
        id: 'mock-new-key-' + Date.now(),
        key_prefix: prefix,
        name: name || 'API Key',
        created_at: new Date().toISOString(),
   };

    return NextResponse.json({
        key: rawKey,
        meta: data
   });
}

/**
 * DELETE /api/keys
 * Revoke an API key
 */
export async function DELETE(req: NextRequest) {
    // Mock user for now
    const user = { id: 'mock-user-123'};

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401});
   }

    const { id} = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'Missing Key ID'}, { status: 400});
   }

    // Mock successful delete
    return NextResponse.json({ success: true});
}

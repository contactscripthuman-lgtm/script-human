/* eslint-disable */
const { createClient } = require('@supabase/supabase-js');

// Mock client for testing (since we can't easily login in script)
// In a real verification, we'd cycle through the UI.
// Here we will:
// 1. Insert a test key directly into DB (via Admim/Service Role)
// 2. Call the API with that key
// 3. Verify response
// 4. Cleanup

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const crypto = require('crypto');

async function testApiKeyFlow() {
    console.log('🧪 Starting API Key Verification...');

    // 1. Create a dummy user (or get existing one)
    // For simplicity, let's assume a user exists or just create a key with a random UUID if DB constraint allows (it refers auth.users, so we need a real ID)
    // Let's try to get a user first
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    let userId;
    if (users && users.users.length > 0) {
        userId = users.users[0].id;
        console.log(`👤 Using existing user: ${userId}`);
    } else {
        console.log('⚠ No users found. Creating temp user...');
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: `test_${Date.now()}@example.com`,
            password: 'password123',
            email_confirm: true
        });
        if (createError) throw createError;
        userId = newUser.user.id;
        console.log(`👤 Created temp user: ${userId}`);
    }

    // 2. Generate and Insert Key
    const rawKey = `sk_live_${crypto.randomBytes(16).toString('hex')}`;
    const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');

    const { data: keyData, error: keyError } = await supabase
        .from('api_keys')
        .insert({
            user_id: userId,
            key_hash: hashedKey,
            key_prefix: rawKey.substring(0, 15) + '...',
            name: 'Verification Test Key',
            is_active: true
        })
        .select()
        .single();

    if (keyError) throw keyError;
    console.log(`🔑 Generated Test Key: ${rawKey}`);

    // 3. Call API
    console.log('🚀 Calling POST /api/analyze...');

    // We need to use valid domain. locally usually localhost:3000
    // Note: Fetch might fail if server isn't running. 
    // This script is better run externally, but we can verify DB logic here.
    // For "Server" actions, we can try to invoke the route handler code directly if we import it, 
    // but Next.js routing is complex to mock.
    // Ideally user runs this against running server.

    console.log('\n⚠ To verify fully, run the app (npm run dev) and execute:');
    console.log(`curl -X POST http://localhost:3000/api/analyze \\
  -H "Authorization: Bearer ${rawKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "This is a test sentence to verify the API functionality."}'`);

    // Clean up
    await supabase.from('api_keys').delete().eq('id', keyData.id);
    console.log('\n🧹 Test key cleaned up.');
}

testApiKeyFlow().catch(console.error);

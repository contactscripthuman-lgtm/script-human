import { NextRequest, NextResponse} from 'next/server';
import { sanitizeText, createDefaultProfile} from '@/lib/enterprise/brand-guardrails';

export const runtime = 'edge';

interface SanitizeRequest {
    text: string;
    apiKey: string;
    profile?: string;
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const body: SanitizeRequest = await request.json();

        // Validate request
        if (!body.text || !body.apiKey) {
            return NextResponse.json(
                { error: 'Missing required fields: text, apiKey'},
                { status: 400}
            );
       }

        // Validate API key format
        if (!body.apiKey.startsWith('ent_')) {
            return NextResponse.json(
                { error: 'Invalid API key format'},
                { status: 401}
            );
       }

        // Sanitize text using brand guardrails
        const profile = createDefaultProfile();
        const result = sanitizeText(body.text, profile);

        const processingTime = Date.now() - startTime;

        // Build response
        return NextResponse.json({
            sanitizedText: result.sanitizedText,
            changes: result.violations.map(v => ({
                original: v.word,
                replacement: v.suggestions[0] || '[removed]',
                position: v.position
           })).slice(0, result.changesApplied),
            complianceScore: result.score / 100,
            processingTime,
            status: 'success'
       });

   } catch (_error) {
        return NextResponse.json(
            { error: 'Internal server error', status: 'error'},
            { status: 500}
        );
   }
}

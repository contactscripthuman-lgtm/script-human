import { NextRequest, NextResponse} from 'next/server';
import { validateApiKey} from '@/lib/api-keys';
import { analyzeContent} from '@/lib/trust-hub/forensic-engine';

/**
 * POST /api/analyze
 * Public API Endpoint for Content Analysis
 * Protected by API Key (Bearer Token)
 */
export async function POST(req: NextRequest) {
    try {
        // 1. Authorization Check
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Missing or invalid API Key. Use"Authorization: Bearer sk_live_..."'},
                { status: 401}
            );
       }

        const apiKey = authHeader.split(' ')[1];
        const keyData = await validateApiKey(apiKey);

        if (!keyData) {
            return NextResponse.json(
                { error: 'Invalid API Key'},
                { status: 401}
            );
       }

        // 2. Parse Body
        const body = await req.json().catch(() => ({}));
        const { content, metadata} = body;

        if (!content || typeof content !== 'string' || content.length < 10) {
            return NextResponse.json(
                { error: 'Content is required and must be at least 10 characters.'},
                { status: 400}
            );
       }

        // 3. Run Analysis
        const result = analyzeContent(content, metadata || {});

        // 4. Return clean JSON response
        return NextResponse.json({
            success: true,
            analysis: {
                score: result.layers.authenticity.score,
                ai_likelihood: result.layers.authenticity.aiLikelihood,
                metrics: {
                    burstiness: result.layers.authenticity.burstiness,
                    perplexity: 0, // Note: Forensic engine does not return perplexity yet
                    word_count: result.metrics.wordCount,
                    sentence_count: result.metrics.sentenceCount
               },
                issues: result.riskLevel === 'minimal' ? [] : ['Potential AI content detected'], // Simplified for now
                full_details: result // Include full object for power users
           },
            meta: {
                request_id: crypto.randomUUID(),
                timestamp: new Date().toISOString()
           }
       });

   } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error'},
            { status: 500}
        );
   }
}

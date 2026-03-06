import { NextRequest, NextResponse} from"next/server";
import { analyzeContent} from"@/lib/trust-hub/forensic-engine";
import type { ContentMetadata} from"@/lib/trust-hub/types";

// Using Node runtime for crypto compatibility
export const runtime ="nodejs";

export async function POST(req: NextRequest) {
    try {
        const { content, metadata} = await req.json();

        if (!content || typeof content !=="string") {
            return NextResponse.json(
                { error:"Content field is required"},
                { status: 400}
            );
       }

        if (content.length < 50) {
            return NextResponse.json(
                { error:"Content must be at least 50 characters for analysis"},
                { status: 400}
            );
       }

        // Run 4-layer content trust analysis
        const result = analyzeContent(content, metadata as ContentMetadata || {});

        return NextResponse.json(result, { status: 200});
   } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error:"Failed to analyze content"},
            { status: 500}
        );
   }
}

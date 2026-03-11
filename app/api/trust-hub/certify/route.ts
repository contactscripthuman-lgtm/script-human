import { NextRequest, NextResponse } from "next/server";
import { analyzeContent } from "@/lib/trust-hub/forensic-engine";
import type { ContentMetadata } from "@/lib/trust-hub/types";
import {
    generateVerificationUrl
} from "@/lib/trust-hub/pdf-generator";
import { storeCertificate, generateUniqueCertificateId, storeEmbedCode } from "@/lib/trust-hub/storage";

// Using Node runtime for crypto compatibility
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    // Guard: Firebase Admin env vars must be present
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        console.error("Certification error: Missing Firebase Admin environment variables");
        return NextResponse.json(
            { error: "Server configuration error: Firebase credentials are not set." },
            { status: 500 }
        );
    }

    try {
        const { content, metadata } = await req.json();

        if (!content || typeof content !== "string") {
            return NextResponse.json(
                { error: "Content field is required" },
                { status: 400 }
            );
        }

        // Run content analysis
        const result = analyzeContent(content, metadata as ContentMetadata || {});

        // Check if score meets certification threshold (75%)
        if (Math.round(result.overallTrustScore) < 75) {
            return NextResponse.json(
                {
                    error: "Trust score below 75% threshold",
                    trustScore: result.overallTrustScore,
                    riskLevel: result.riskLevel,
                    message: "Content requires improvements before certification"
                },
                { status: 400 }
            );
        }

        // Generate certificate ID and URL
        const certificateId = await generateUniqueCertificateId();
        const verificationUrl = generateVerificationUrl(certificateId);

        // Store verification data in Firestore
        await storeCertificate({
            certificateId,
            textHash: result.contentHash,
            confidenceScore: result.overallTrustScore,
            verdict: result.riskLevel,
            issuedAt: result.timestamp,
            layers: result.layers,
            metrics: result.metrics,
        });

        // Store Embed Code snippet into Firebase simultaneously
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scripthuman.com';
        const embedCodeSnippet = `<iframe src="${baseUrl}/verify/${certificateId}/seal" width="280" height="100" frameborder="0" scrolling="no" style="border:none; overflow:hidden;"></iframe>`;
        await storeEmbedCode(certificateId, embedCodeSnippet);

        // Return JSON with ID (Client will generate PDF)
        return NextResponse.json({
            certificateId,
            verificationUrl
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Certification error:", message);
        return NextResponse.json(
            { error: `Failed to generate certificate: ${message}` },
            { status: 500 }
        );
    }
}

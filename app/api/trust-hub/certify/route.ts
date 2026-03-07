import { NextRequest, NextResponse } from "next/server";
import { analyzeContent } from "@/lib/trust-hub/forensic-engine";
import type { ContentMetadata } from "@/lib/trust-hub/types";
import {
    generateVerificationUrl
} from "@/lib/trust-hub/pdf-generator";
import { storeCertificate, generateUniqueCertificateId } from "@/lib/trust-hub/storage";

// Using Node runtime for crypto compatibility
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
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

        // Store verification data
        await storeCertificate({
            certificateId,
            textHash: result.contentHash,
            confidenceScore: result.overallTrustScore,
            verdict: result.riskLevel,
            issuedAt: result.timestamp,
            layers: result.layers,
            metrics: result.metrics,
        });

        // Return JSON with ID (Client will generate PDF)
        return NextResponse.json({
            certificateId,
            verificationUrl
        });
    } catch (error) {
        console.error("Certification error:", error);
        return NextResponse.json(
            { error: "Failed to generate certificate" },
            { status: 500 }
        );
    }
}

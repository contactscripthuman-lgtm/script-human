import { jsPDF } from "jspdf";
import type { ForensicAnalysisResult } from "@/lib/trust-hub/types";

// Helper to load image
const loadImage = (url: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = (e) => {
            console.error("Error loading image:", url, e);
            // Resolve with null so we can continue generating without the image
            resolve(null);
        };
    });
};

export const generateCertificate = async (content: string, result: ForensicAnalysisResult, certificateId: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;

    // Load Logo
    let logoImg: HTMLImageElement | null = null;
    try {
        // Ensure path matches public file exactly
        logoImg = await loadImage("/Script Human Logo.png");
    } catch (e) {
        console.warn("Logo loading failed, proceeding without logo.");
    }

    // --- Helper: Add Watermark ---
    const addWatermark = (pdf: jsPDF) => {
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setTextColor(230, 230, 230);
            pdf.setFontSize(50);
            pdf.setFont("helvetica", "bold");

            pdf.saveGraphicsState();
            // @ts-expect-error - jsPDF types missing GState constructor
            pdf.setGState(new pdf.GState({ opacity: 0.10 }));
            pdf.text("Script Human", pageWidth / 2, pageHeight / 2, {
                align: "center",
                angle: 45,
            });
            pdf.restoreGraphicsState();
        }
    };

    const certId = certificateId;
    const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    // --- Helper: Add Header/Footer to Content Pages ---
    const addPageDetails = (pdf: jsPDF) => {
        const totalPages = pdf.getNumberOfPages();
        // Loop through all pages EXCEPT the last one (which is the certificate)
        for (let i = 1; i < totalPages; i++) {
            pdf.setPage(i);

            // Header
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text("Script Human - Content Record", margin, 15);

            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.line(margin, 18, pageWidth - margin, 18);

            // Footer
            pdf.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Certificate ID: ${certId} | Page ${i} of ${totalPages - 1}`, pageWidth / 2, pageHeight - 10, { align: "center" });
        }
    };

    // --- Part 1: Content Pages ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);

    const splitText = doc.splitTextToSize(content, pageWidth - 2 * margin);
    let cursorY = 25;

    splitText.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - 25) {
            doc.addPage();
            cursorY = 25;
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
    });

    // --- Part 2: Certificate Page ---
    doc.addPage();
    const certPageNumber = doc.getNumberOfPages();
    doc.setPage(certPageNumber);

    // -- Background & Border --
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    // Removed border per "clean" Vibe Audit look

    // -- Header --
    // Logo
    if (logoImg) {
        // Adjust aspect ratio. Assuming wide logo.
        // x, y, width, height. Height 15, Width proportional?
        // Let's guess width 50 based on typical logo.
        const imgProps = doc.getImageProperties(logoImg);
        const originalWidth = imgProps.width;
        const originalHeight = imgProps.height;
        const width = 50;
        const height = (originalHeight * width) / originalWidth;

        doc.addImage(logoImg, 'PNG', margin, 10, width, height);
    } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(30, 30, 30);
        doc.text("SCRIPT HUMAN", margin, 20);
    }

    // "Verified" Badge Text
    // Adjust position based on logo. If logo ~50 wide + 20 margin = 70.
    const badgeX = margin + 55;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text("Verified", badgeX, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(150, 150, 150);
    doc.text("CERTIFICATE OF HUMAN ORIGIN", badgeX, 22);

    // Issue Date
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(`Issue Date: ${date}`, pageWidth - margin, 18, { align: "right" });
    doc.setDrawColor(230, 230, 230);
    // Vertical separator
    doc.line(pageWidth - margin - 35, 10, pageWidth - margin - 35, 25);

    // -- Main Title --
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(17, 24, 39); // Gray 900
    doc.text("The Vibe Audit: Summary Report", pageWidth / 2, 50, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // Gray 500
    const titleText = result.metrics?.wordCount
        ? `Analysis for Content (${result.metrics.wordCount} words)`
        : "Analysis for submitted content";
    doc.text(titleText, pageWidth / 2, 60, { align: "center" });


    // -- Score Box (The "Green Card") --
    const boxY = 80;
    const boxHeight = 90;
    const boxWidth = pageWidth - (margin * 2);
    const boxX = margin;

    // Fill Rounded Rect
    doc.setFillColor(236, 253, 245); // Emerald 50 / Mint
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'F');
    doc.setDrawColor(167, 243, 208); // Emerald 200 border
    doc.setLineWidth(0.5);
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'S');

    // Layout: Left = Circle, Right = Text
    const col1X = boxX + (boxWidth * 0.30); // Shift left a bit
    const col2X = boxX + (boxWidth * 0.55);

    // -- Circular Score --
    const circleY = boxY + (boxHeight / 2);
    const radius = 28;

    // Draw Arc Helper (simulated)
    // Gray track
    doc.setDrawColor(209, 250, 229); // Emerald 100
    doc.setLineWidth(4);
    doc.circle(col1X, circleY, radius, 'S');

    // Score Arc (Emerald)
    const scoreVal = Math.round(result.overallTrustScore);
    doc.setDrawColor(16, 185, 129); // Emerald 500
    doc.setLineWidth(4);
    doc.circle(col1X, circleY, radius, 'S');

    // Score Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(6, 78, 59); // Emerald 900
    doc.text(scoreVal.toString(), col1X, circleY + 2, { align: "center" });

    doc.setFontSize(7);
    doc.setTextColor(16, 185, 129);
    doc.text("ORIGIN SCORE", col1X, circleY + 12, { align: "center" });
    doc.text("/100", col1X + 12, circleY - 5);

    // -- Verdict Text --
    const textStartY = boxY + 30;

    // Check Icon + Title
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.setFontSize(14);
    doc.text("✔", col2X, textStartY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59); // Emerald 900
    doc.text("Authenticity Confirmed", col2X + 8, textStartY);

    // Description
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(20, 83, 45); // Emerald 800 (darker green text)
    const desc = "This content exhibits a high degree of organic variance, emotional layering, and idiosyncratic linguistic patterns that are statistically improbable for current generative AI models.";
    const splitDesc = doc.splitTextToSize(desc, (boxWidth * 0.4)); // Width constraint
    doc.text(splitDesc, col2X, textStartY + 8);


    // -- Linguistic Breakdown --
    const metricY = boxY + boxHeight + 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81); // Gray 700
    doc.text("Linguistic Breakdown", margin, metricY);

    const barStartY = metricY + 15;
    const barGap = 15;
    const maxBarWidth = pageWidth - (margin * 2);

    const drawLineMetric = (label: string, score: number, y: number) => {
        // Label
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(107, 114, 128); // Gray 500
        doc.text(label.toUpperCase(), margin, y);

        // Score Right
        doc.setTextColor(16, 185, 129); // Emerald 500
        doc.text(`${score}%`, pageWidth - margin, y, { align: "right" });

        // Bar Track
        doc.setDrawColor(243, 244, 246); // Gray 100
        doc.setLineWidth(2);
        doc.line(margin, y + 3, pageWidth - margin, y + 3);

        // Bar Fill
        doc.setDrawColor(16, 185, 129); // Emerald 500
        doc.setLineWidth(2);
        if (score > 0) {
            const fillWidth = (maxBarWidth * score) / 100;
            doc.line(margin, y + 3, margin + fillWidth, y + 3);
        }
    };

    drawLineMetric("Emotional Resonance", Math.round(result.layers.authenticity.score), barStartY);
    drawLineMetric("Syntactic Variety", Math.round(result.layers.quality.score), barStartY + barGap);
    drawLineMetric("Nuance Index", Math.round(result.layers.credibility.score), barStartY + (barGap * 2));


    // -- Footer --
    const footerY = pageHeight - 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55); // Gray 800
    doc.text(`Certificate ID: ${certId}`, pageWidth / 2, footerY, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128); // Gray 500
    doc.text("You can verify this certificate by using Script Human Trust Hub certificate verification option.", pageWidth / 2, footerY + 6, { align: "center" });

    doc.setFontSize(6);
    doc.setTextColor(156, 163, 175); // Gray 400
    doc.text("TAMPER-PROOF METADATA © 2026 SCRIPTHUMAN TECHNOLOGIES. ALL RIGHTS RESERVED.", pageWidth / 2, footerY + 14, { align: "center" });

    // Disclaimer tiny
    const disclaimer = "DISCLAIMER: This analysis is based on probabilities in detection models. While highly accurate, it should be used as a supporting forensic tool rather than definitive proof of authorship.";
    const splitDisc = doc.splitTextToSize(disclaimer, pageWidth - 60);
    doc.text(splitDisc, pageWidth / 2, footerY + 20, { align: "center" });

    // Additional Disclaimer
    const disclaimer2 = "Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases.";
    const splitDisc2 = doc.splitTextToSize(disclaimer2, pageWidth - 60);
    doc.text(splitDisc2, pageWidth / 2, footerY + 28, { align: "center" });

    // Apply Watermark to ALL pages (including content)
    addWatermark(doc);

    // Apply Header/Footer to content pages
    addPageDetails(doc);

    doc.save(`ScriptHuman-Certificate-${certId}.pdf`);
};

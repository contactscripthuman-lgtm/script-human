import type { ForensicAnalysisResult } from "./types";
import crypto from "crypto";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

/**
 * Generate unique certificate ID
 */
export function generateCertificateId(): string {
  const timestamp = Date.now();
  const randomPart = crypto.randomBytes(6).toString('hex');
  return `SH-${new Date().getFullYear()}-${randomPart.substring(0, 4)}-${randomPart.substring(4)}`.toUpperCase();
}

/**
 * Generate verification URL for QR code
 */
export function generateVerificationUrl(certificateId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://scripthuman.com";
  return `${baseUrl}/verify/${certificateId}`;
}

/**
 * Helper to draw a circular arc for the progress meter
 */
function drawArc(doc: jsPDF, x: number, y: number, radius: number, startAngle: number, endAngle: number, lineWidth: number, color: [number, number, number]) {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(lineWidth);

  const step = 5; // degrees per step
  const points: { x: number, y: number }[] = [];

  // Convert degrees to radians and calculating points
  const angleOffset = -90; // Start from top

  for (let angle = startAngle; angle <= endAngle; angle += step) {
    const rad = (angle + angleOffset) * (Math.PI / 180);
    points.push({
      x: x + radius * Math.cos(rad),
      y: y + radius * Math.sin(rad)
    });
  }

  // Ensure we hit the exact end angle
  const endRad = (endAngle + angleOffset) * (Math.PI / 180);
  points.push({
    x: x + radius * Math.cos(endRad),
    y: y + radius * Math.sin(endRad)
  });

  // Draw lines between points
  for (let i = 0; i < points.length - 1; i++) {
    doc.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
}

/**
 * Generate PDF certificate using jsPDF
 */
export async function generateCertificatePDF(
  result: ForensicAnalysisResult,
  certificateId: string
): Promise<Buffer> {
  // Create new PDF document (A4 size)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Colors (Light Theme)
  const colors = {
    mint: [16, 185, 129] as [number, number, number], // Emerald 500
    mintLight: [209, 250, 229] as [number, number, number], // Emerald 100
    gold: [212, 175, 55] as [number, number, number],
    dark: [17, 24, 39] as [number, number, number], // Gray 900
    gray: [107, 114, 128] as [number, number, number], // Gray 500
    lightGray: [243, 244, 246] as [number, number, number], // Gray 100
    watermark: [240, 240, 240] as [number, number, number] // Very light gray
  };

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // --- HEADER LOGO ---
  let logoData: Buffer | null = null;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'Script Human Logo.png');
    if (fs.existsSync(logoPath)) {
      logoData = fs.readFileSync(logoPath);
    }
  } catch (e) {
    console.error("Error loading logo:", e);
  }

  // --- WATERMARK (Logo) ---
  if (logoData) {
    if ((doc as any).GState) {
      const gState = new (doc as any).GState({ opacity: 0.05 }); // Very faint (5% opacity)
      doc.setGState(gState);

      const wmWidth = 120; // Large watermark
      const wmHeight = 40; // Approximate aspect ratio
      const wmX = (pageWidth - wmWidth) / 2;
      const wmY = (pageHeight - wmHeight) / 2;

      doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight, undefined, 'FAST');

      // Reset opacity
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }
  } else {
    // Text fallback if logo missing
    doc.setTextColor(250, 250, 250);
    doc.setFontSize(50);
    doc.setFont('helvetica', 'bold');
    if (doc.saveGraphicsState) {
      doc.saveGraphicsState();
      const cx = pageWidth / 2;
      const cy = pageHeight / 2;
      doc.text("SCRIPTHUMAN", cx, cy, { align: 'center', angle: 45 });
      doc.restoreGraphicsState();
    }
  }


  // Decorative corner line (Top Right)
  doc.setDrawColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
  doc.setLineWidth(1);
  doc.line(pageWidth - margin, margin, pageWidth - margin - 20, margin); // Horz
  doc.line(pageWidth - margin, margin, pageWidth - margin, margin + 20); // Vert

  // Decorative corner line (Bottom Left)
  doc.line(margin, pageHeight - margin, margin + 20, pageHeight - margin); // Horz
  doc.line(margin, pageHeight - margin, margin, pageHeight - margin - 20); // Vert

  let yPos = margin + 10;

  // --- HEADER CONTENT ---
  if (logoData) {
    doc.addImage(logoData, 'PNG', margin, yPos - 5, 40, 12, undefined, 'FAST');
  } else {
    // Fallback
    doc.setFillColor(colors.mint[0], colors.mint[1], colors.mint[2]);
    doc.circle(margin + 5, yPos + 2, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text('Scripthuman', margin + 14, yPos + 3);
  }

  // Verified Badge Text (Next to logo)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.mint[0], colors.mint[1], colors.mint[2]);
  doc.text('Verified', margin + 42, yPos + 3);

  doc.setFontSize(7);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  doc.text('CERTIFICATE OF HUMAN ORIGIN', margin + 42, yPos + 7);

  // Meta Info (Right aligned)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  doc.text(`Issue Date: ${new Date(result.timestamp).toLocaleDateString()}`, pageWidth - margin, yPos + 2, { align: 'right' });

  yPos += 30;

  // --- TITLE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text('The Vibe Audit: Summary Report', pageWidth / 2, yPos, { align: 'center' });

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  doc.text('Analysis for: "The Human Element in Modern Design"', pageWidth / 2, yPos, { align: 'center' });

  yPos += 20;

  // --- MAIN CARD ---
  // Background Box
  const cardHeight = 80;
  const cardWidth = pageWidth - (margin * 2);
  doc.setFillColor(240, 253, 244); // Very light mint
  doc.roundedRect(margin, yPos, cardWidth, cardHeight, 5, 5, 'F');
  doc.setDrawColor(colors.mintLight[0], colors.mintLight[1], colors.mintLight[2]);
  doc.roundedRect(margin, yPos, cardWidth, cardHeight, 5, 5, 'S');

  // CIRCULAR SCORE (Left side of card)
  const circleX = margin + 40;
  const circleY = yPos + (cardHeight / 2);
  const radius = 25;

  // Gray background ring
  drawArc(doc, circleX, circleY, radius, 0, 360, 3, colors.lightGray);

  // Progress arc
  const scoreAngle = (result.overallTrustScore / 100) * 360;
  drawArc(doc, circleX, circleY, radius, 0, scoreAngle, 3, colors.mint);

  // Score Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text(`${result.overallTrustScore}`, circleX, circleY + 2, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  doc.text('/100', circleX + 12, circleY + 2);

  doc.setFontSize(6);
  doc.text('ORIGIN SCORE', circleX, circleY + 8, { align: 'center' });


  // AUTHENTICITY TEXT (Right side of card)
  const textX = margin + 85;
  const textY = yPos + 25;

  // Checkmark Badge
  doc.setFillColor(colors.mint[0], colors.mint[1], colors.mint[2]);
  doc.circle(textX, textY - 1, 3, 'F');
  // White checkmark
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6);
  doc.text('v', textX - 1, textY + 0.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text('Authenticity Confirmed', textX + 6, textY);

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  const quote = "This content exhibits a high degree of organic variance, emotional layering, and idiosyncratic linguistic patterns that are statistically improbable for current generative AI models.";
  const splitQuote = doc.splitTextToSize(quote, cardWidth - 95);
  doc.text(splitQuote, textX, textY + 8);

  yPos += cardHeight + 20;

  // --- LINGUISTIC BREAKDOWN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text('Linguistic Breakdown', margin, yPos);

  yPos += 15;

  // Bars Helper
  const drawBar = (label: string, score: number, y: number) => {
    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(label.toUpperCase(), margin, y);

    // Score Text
    doc.setTextColor(colors.mint[0], colors.mint[1], colors.mint[2]);
    doc.text(`${score}%`, pageWidth - margin, y, { align: 'right' });

    // Bar Background
    const barY = y + 3;
    const barHeight = 2;
    const barWidth = pageWidth - (margin * 2);
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.roundedRect(margin, barY, barWidth, barHeight, 1, 1, 'F');

    // Bar Fill
    const fillWidth = (score / 100) * barWidth;
    doc.setFillColor(colors.mint[0], colors.mint[1], colors.mint[2]);
    doc.roundedRect(margin, barY, fillWidth, barHeight, 1, 1, 'F');
  };

  // 1. Emotional Resonance
  drawBar('Emotional Resonance', result.layers.authenticity.score, yPos);
  yPos += 15;

  // 2. Syntactic Variety
  drawBar('Syntactic Variety', result.layers.originality.score, yPos);
  yPos += 15;

  // 3. Nuance Index
  drawBar('Nuance Index', result.layers.quality.score, yPos);
  // End of bars
  yPos += 20; // 20mm gap after last bar

  // --- CERTIFICATE ID & VERIFY ---
  // Just placing it naturally below the bars now
  const centerX = pageWidth / 2;

  // 1. Certificate ID (Centered)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text(`Certificate ID: ${certificateId}`, centerX, yPos, { align: 'center' });

  yPos += 6;

  // 2. Verification Instruction
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
  doc.text('You can verify this certificate by using Script Human Trust Hub certificate verification option.', centerX, yPos, { align: 'center' });

  // --- BOTTOM FOOTER ---
  const bottomY = pageHeight - margin - 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(200, 200, 200);
  doc.text('TAMPER-PROOF METADATA © 2026 SCRIPTHUMAN TECHNOLOGIES. ALL RIGHTS RESERVED.', centerX, bottomY - 8, { align: 'center' });

  // Disclaimer 1 (Original)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(210, 210, 210);
  const disclaimer1 = "DISCLAIMER: This analysis is based on probabilistic AI detection models. While highly accurate, it should be used as a supporting forensic tool rather than definitive proof of authorship. ScriptHuman assumes no liability for the use or interpretation of this report.";
  const disclaimerLines1 = doc.splitTextToSize(disclaimer1, pageWidth - (margin * 2));
  doc.text(disclaimerLines1, centerX, bottomY - 3, { align: 'center' });

  // Disclaimer 2 (New)
  const disclaimer2 = "Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases.";
  const disclaimerLines2 = doc.splitTextToSize(disclaimer2, pageWidth - (margin * 2));
  doc.text(disclaimerLines2, centerX, bottomY + 2, { align: 'center' });

  // Convert PDF to Buffer
  const pdfArrayBuffer = doc.output('arraybuffer');
  return Buffer.from(pdfArrayBuffer);
}

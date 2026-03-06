export interface ChatQnA {
    keywords: string[];
    answer: string;
    category: "general" | "pricing" | "features" | "support";
}

export const knowledgeBase: ChatQnA[] = [
    // --- WRITING ROOM ---
    {
        keywords: ["writing room", "humanize", "bypass", "detection", "rewrite", "sanitizer"],
        answer: "The **Writing Room** is our core tool for humanizing AI text. It uses an iterative process to rewrite content, removing 'Silicon Smog' patterns that trigger AI detectors. You can choose different moods (Professional, Casual, etc.) to match your desired tone.",
        category: "features"
    },
    {
        keywords: ["delay", "wait", "slow", "typing"],
        answer: "The 5-second delay you might experience is part of our deep analysis process. We simulate a human writing rhythm to ensure the output flows naturally.",
        category: "features"
    },
    {
        keywords: ["mood", "tone", "style"],
        answer: "You can select from 5 different moods in the Writing Room: **Professional, Casual, Friendly, Academic, and Storytelling**. This helps tailor the humanization to your specific audience.",
        category: "features"
    },

    // --- TRUST HUB ---
    {
        keywords: ["trust hub", "verify", "check", "score", "analyze"],
        answer: "The **Trust Hub** is our forensic analysis suite. It checks content for Authenticity, Quality, Originality, and Credibility. It provides a detailed trust score and specific recommendations to improve your content.",
        category: "features"
    },
    {
        keywords: ["certificate", "verified", "seal"],
        answer: "If your content scores above 75% in the Trust Hub, you can generate a **Verified Certificate**. This is a tamper-proof digital seal that proves your content is high-quality and human-verified.",
        category: "features"
    },

    // --- ENTERPRISE ---
    {
        keywords: ["enterprise", "business", "api", "bulk", "agency"],
        answer: "Our **Enterprise** solutions are designed for high-volume users and agencies. Features include the **Agency API** for bulk processing, **Brand Guardrails** to enforce vocabulary, and **Voice Clone** to train custom models on your brand's voice.",
        category: "features"
    },

    // --- PRICING ---
    {
        keywords: ["pricing", "cost", "free", "subscription", "plan"],
        answer: "We offer a **Free Tier** for basic use. Our **Pro Plan** ($19/mo) unlocks unlimited humanization and advanced moods. The **Enterprise Plan** offers custom API access and dedicated support.",
        category: "pricing"
    },

    // --- ETHICS / GENERAL ---
    {
        keywords: ["ethics", "safe", "privacy", "store", "data"],
        answer: "We take privacy seriously. **All processing happens client-side in your browser.** We do not store your text or use it to train our models. Our goal is to verify human authorship, not to enable cheating.",
        category: "general"
    },
    {
        keywords: ["contact", "support", "help", "email"],
        answer: "You can reach our support team at **contact@scripthuman.ai**. We're here to help with any issues or enterprise inquiries.",
        category: "support"
    },
    {
        keywords: ["hello", "hi", "hey", "start"],
        answer: "Hello! I'm **ScriptBot**. I can help you understand our tools like the Writing Room, Trust Hub, or answer questions about pricing and enterprise features. What can I do for you?",
        category: "general"
    }
];

export const fallbackAnswer = "I'm not sure I understand. I can help with questions about the **Writing Room**, **Trust Hub**, **Pricing**, or **Enterprise** features. You can also contact support at contact@scripthuman.ai.";

// Test Gemini content SDSL calculation
const geminiText = `The Fragmented Frontier: Global Geopolitics in 2026The geopolitical landscape of 2026 is no longer defined by the post-Cold War "Pax Americana" or even the clean lines of a new Cold War. Instead, the world has entered an era of "Geopolitical Brinkmanship" and "Economic Nationalism." As we move through the mid-2020s, the international order is characterized by a retreat from multilateralism, the rise of sovereign technology stacks, and a volatile mix of high-stakes diplomacy and hybrid conflict.`;

const sentences = geminiText.split(/[.!?]+/).filter(s => s.trim().length > 0);
const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);

console.log("\n=== GEMINI SAMPLE ANALYSIS ===");
console.log("Sentences:", sentences.length);
console.log("Sentence lengths:", sentenceLengths);

const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / sentenceLengths.length;
const sdsl = Math.sqrt(variance);

console.log("Mean sentence length:", mean.toFixed(2));
console.log("Variance:", variance.toFixed(2));
console.log("SDSL:", sdsl.toFixed(2));

// Expected penalty
if (sdsl < 3.0) console.log("→ PENALTY: +70 pts (CRITICAL)");
else if (sdsl < 4.0) console.log("→ PENALTY: +60 pts (VERY HIGH)");
else if (sdsl < 5.0) console.log("→ PENALTY: +50 pts (HIGH)");
else if (sdsl < 6.0) console.log("→ PENALTY: +35 pts (MODERATE)");
else console.log("→ No penalty");

// Check AI phrases
const aiPhrases = ["characterized by", "geopolit", "brinkmanship", "sovereign", "hybrid conflict"];
const lowerText = geminiText.toLowerCase();
const found = aiPhrases.filter(phrase => lowerText.includes(phrase));
console.log("\nAI phrases detected:", found.length);
console.log("Phrases:", found);

// Quick analysis of AI samples to find patterns
const claudeText = `The Shifting Landscape of Global Geopolitics
The contemporary geopolitical landscape is characterized by unprecedented complexity, marked by the decline of the post-Cold War unipolar moment and the emergence of a multipolar world order.`;

const sentences = claudeText.split(/[.!?]+/).filter(s => s.trim().length > 0);
const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);

console.log("Claude Sample Analysis:");
console.log("Sentences:", sentences.length);
console.log("Sentence lengths:", sentenceLengths);

const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / sentenceLengths.length;
const sdsl = Math.sqrt(variance);

console.log("Mean:", mean);
console.log("SDSL:", sdsl);

// Check for AI phrases
const aiPhrases = ["characterized by", "unprecedented", "marked by", "emergence of"];
const lowerText = claudeText.toLowerCase();
const found = aiPhrases.filter(phrase => lowerText.includes(phrase));
console.log("AI phrases found:", found);

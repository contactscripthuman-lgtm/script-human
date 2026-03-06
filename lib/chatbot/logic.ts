import { knowledgeBase, fallbackAnswer } from "./data";

export function findAnswer(query: string): string {
    const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, "");
    const normalizedQuery = normalize(query);

    let bestMatch = {
        answer: fallbackAnswer,
        score: 0
    };

    // 1. Exact Keyword Matching
    for (const item of knowledgeBase) {
        let matchCount = 0;
        for (const keyword of item.keywords) {
            if (normalizedQuery.includes(keyword.toLowerCase())) {
                matchCount++;
            }
        }

        // Simple scoring: more keywords matched = better score
        if (matchCount > bestMatch.score) {
            bestMatch = {
                answer: item.answer,
                score: matchCount
            };
        }
    }

    // Threshold ensures we don't return random answers for weak matches
    if (bestMatch.score > 0) {
        return bestMatch.answer;
    }

    return fallbackAnswer;
}

export interface AIIsm {
    id: string;
    word: string;
    reason: string;
    alternatives: string[];
    category: "Deep Silicon" | "Generic" | "Organic"; // Organic is basically not flagged, but keeps structure
}

export interface ToneProfile {
    id: string;
    name: string;
    description: string;
    promptModifier: string;
}

export interface AnalysisResult {
    score: number; // 0-100 (100 = Human, 0 = Robot)
    heatmap: {
        text: string;
        category: "Deep Silicon" | "Generic" | "Organic";
        reason?: string;
    }[];
    rhythm: {
        sentenceLengths: number[];
    };
}

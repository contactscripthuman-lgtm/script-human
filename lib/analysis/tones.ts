import { ToneProfile } from "../types";

export const TONE_PROFILES: ToneProfile[] = [
    {
        id: "skeptic",
        name: "The Skeptic",
        description: "Cuts through the hype. Direct, slightly cynical, authoritative.",
        promptModifier: "Rewrite this to sound like a skeptical industry veteran who hates buzzwords. proper capitalization, clear logic, no fluff.",
    },
    {
        id: "enthusiast",
        name: "The Enthusiast",
        description: "High energy, spiky, uses exclamation points sparingly but effectively.",
        promptModifier: "Rewrite this with genuine excitement. Use punchy short sentences. Vary the rhythm. Sound like a fan, not a bot.",
    },
    {
        id: "minimalist",
        name: "The Minimalist",
        description: "Hemingway mode. Shortest possible way to say it.",
        promptModifier: "Rewrite this using as few words as possible. Remove adjectives. Focus on verbs. Simple, stark, clean.",
    },
];

"use server";

import Anthropic from"@anthropic-ai/sdk";

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
//});

export type Mood ="professional" |"casual" |"friendly" |"academic" |"storytelling";

/*
const MOOD_PROMPTS: Record<Mood, string> = {
  professional:`
    Transform the text to sound professional yet approachable:
    - Use sophisticated vocabulary but remain clear
    - Maintain formal tone with minimal contractions
    - Add authoritative but friendly phrasing
    - Include industry-appropriate terminology
 `,
  casual:`
    Transform the text to sound casual and conversational:
    - Use everyday language and frequent contractions
    - Add colloquial expressions naturally
    - Keep it friendly and relaxed
    - Make it feel like a chat with a friend
 `,
  friendly:`
    Transform the text to sound warm and engaging:
    - Use approachable language with moderate formality
    - Include personal touches and relatable examples
    - Add encouraging and positive phrasing
    - Balance professionalism with warmth
 `,
  academic:`
    Transform the text to sound scholarly and precise:
    - Use technical vocabulary and formal structure
    - Avoid contractions completely
    - Include precise, analytical language
    - Maintain objective and authoritative tone
 `,
  storytelling:`
    Transform the text into engaging narrative form:
    - Use descriptive and vivid language
    - Add narrative flow and transitions
    - Include sensory details where appropriate
    - Make it compelling and engaging
 `,
};
*/

export async function humanizeTextAction(text: string, mood: Mood ="friendly") {
  // ===== MOCK MODE - FOR TESTING ONLY =====
  console.log("🎭 MOCK MODE: Generating mock humanized text");
  console.log("📝 Mood:", mood);
  console.log("📊 Input length:", text.length,"characters");

  // Simulate API delay (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock responses tailored to each mood
  const mockResponses: Record<Mood, string> = {
    professional:`Here's a refined version of your content. The core message remains intact, but I've adjusted the tone to sound more authoritative yet approachable. You'll notice I've used sophisticated vocabulary while maintaining clarity, and I've minimized contractions to preserve the formal tone. This approach ensures your content sounds polished and professional while still being accessible to your audience.`,

    casual:`Hey, so I took your text and made it sound way more chill. You know what I mean? Like, instead of all that stiff AI-talk, it's now got a friendly vibe. I threw in some contractions here and there - don't, can't, it's - that kind of stuff. Makes it feel like you're just chatting with someone instead of reading a robot's essay. Hope that works for you!`,

    friendly:`I've rewritten your content to make it feel warmer and more engaging! The message stays the same, but now it's got a personal touch that'll really connect with readers. Think of it as the difference between a formal letter and a note from a friend - same info, but way more approachable. I've added some encouraging phrases and relatable examples to make it pop.`,

    academic:`The aforementioned content has been reformulated to maintain scholarly precision while ensuring analytical rigor. The transformation preserves the fundamental assertions of the original text whilst employing technical vocabulary appropriate for academic discourse. This iteration eschews colloquialisms and maintains objective neutrality throughout, thus rendering it suitable for formal academic contexts.`,

    storytelling:`Picture this: your content, but now it reads like a story that pulls people in. I've woven in descriptive language and narrative flow, transforming what was once straightforward information into something that paints a picture in the reader's mind. The facts are all there, but now they're wrapped in vivid imagery and engaging transitions that make people actually want to keep reading.`
 };

  console.log("✅ Mock response generated");
  return {
    success: true,
    text: mockResponses[mood] || mockResponses.friendly
 };

  /* 
  ===== REAL API CODE - UNCOMMENT WHEN API KEY HAS CREDITS =====
  
  // Validate API key
  if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY not found in environment variables");
      return { success: false, error:"API key not configured"};
 }

  console.log("Starting humanization with mood:", mood);
  console.log("Text length:", text.length,"characters");

  const moodPrompt = MOOD_PROMPTS[mood];

  const systemPrompt =`You are an expert at making AI-generated text sound natural and human-written. Your goal is to rewrite the following text to bypass AI detectors while preserving the core message.

${moodPrompt}

CRITICAL HUMANIZATION TECHNIQUES:
1. Vary sentence length dramatically (mix 5-word and 25-word sentences)
2. Use natural contractions appropriately for the mood
3. Add conversational transitions (Now, Here's the thing, Let me explain, So)
4. Include slight imperfections humans make (starting sentences with And/But occasionally)
5. Add personal perspective markers when appropriate (I think, In my view, Clearly)
6. Use rhetorical questions sparingly
7. Vary paragraph lengths naturally
8. Replace AI-common words: utilize→use, commence→start, individuals→people
9. Add specific examples or analogies where helpful
10. Make it flow like natural human speech/writing

IMPORTANT: 
- Keep the same meaning and key points
- Do NOT add new information not in the original
- DO NOT explain what you're doing - just output the rewritten text
- Make it sound like a real human wrote it from scratch

Return ONLY the rewritten text. No introductory filler, no"Here is the rewritten text". Just the result.`;

  try {
      console.log("Calling Anthropic API...");
      const msg = await anthropic.messages.create({
          model:"claude-3-5-sonnet-20240620",
          max_tokens: 4000,
          temperature: 1.0,
          system: systemPrompt,
          messages: [{ role:"user", content: text}],
     });

      console.log("API call successful, response received");
      const content = msg.content[0];
      if (content.type === 'text') {
          console.log("Humanized text length:", content.text.length,"characters");
          return { success: true, text: content.text};
     }
      return { success: false, error:"Unexpected response format"};

 } catch (error: any) {
      console.error("Anthropic API Error:", error);
      return { 
          success: false, 
          error: error?.message ||"Failed to humanize text" 
     };
 }
  */
}

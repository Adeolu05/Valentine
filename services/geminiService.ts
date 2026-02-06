
import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (keywords: string[]) => {
  try {
    // Correctly initialize with a named parameter and direct process.env.API_KEY
    // Always create a new instance right before making an API call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, incredibly romantic, and poetic love letter including these concepts: ${keywords.join(', ')}. 
      The tone should be timeless, elegant, and deeply affectionate. 
      Keep it under 120 words. 
      Format with a beautiful salutation and closing.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
        topK: 64,
      }
    });
    
    // Accessing .text property directly as it is a getter (not a method) in the SDK
    return response.text;
  } catch (error) {
    console.error("Error generating love letter:", error);
    return "My dearest,\n\nEvery beat of my heart is a testament to the love we share. From the quiet mornings to the starlit nights, you are my sanctuary and my greatest adventure. I promise to hold your hand through every season, for now and for all the eternities to come.\n\nForever yours.";
  }
};

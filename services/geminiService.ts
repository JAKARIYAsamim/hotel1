
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the dedicated AI Concierge for 'Ship Inn Stanley'. 
Your tone is sophisticated, warm, professional, and reflects the rich heritage and rugged coastal beauty of Stanley, Tasmania.
Your goal is to assist guests with:
1. Room recommendations (Heritage Suites, Luxury Apartments).
2. Explaining local history and amenities.
3. Recommendations for exploring 'The Nut', local seafood, and coastal trails.

Keep responses concise (under 100 words).
If asked about booking, explain this is a demo and to contact the Ship Inn front desk.
Introduce yourself as the Ship Inn Concierge on the first message.
`;

export const getGeminiChatResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "I apologize, but I am currently offline. Please contact the Ship Inn front desk directly.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({ message: userMessage });
    return response.text || "I apologize, I didn't quite catch that.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again in a moment.";
  }
};

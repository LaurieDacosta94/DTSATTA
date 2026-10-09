import { GoogleGenAI } from "@google/genai";

// Initialize Gemini on server-side with required User-Agent header
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});


import { GoogleGenAI } from "@google/genai";

// Ensure process.env.API_KEY is available in the execution environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateLuckyPhrase = async (lotteryName: string): Promise<string> => {
  if (!apiKey) {
    return "Confira os números e boa sorte!";
  }
  
  try {
    const prompt = `Crie uma frase curta, otimista e divertida para um post de resultado da loteria "${lotteryName}". Seja criativo e evite clichês. Algo que inspire esperança e animação. Máximo de 15 palavras. Em português do Brasil.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
           temperature: 0.8,
           topP: 0.9,
           thinkingConfig: { thinkingBudget: 0 }
        }
    });

    const text = response.text.trim().replace(/"/g, ''); // Clean up quotes
    return text || "Será que hoje a sorte bateu na sua porta?";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Return a graceful fallback phrase
    return "Que a sorte esteja com você! Confira o resultado.";
  }
};

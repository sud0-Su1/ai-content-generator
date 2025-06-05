import { GoogleGenerativeAI } from "@google/generative-ai";

// Create the AI instance with the API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_ID!);

// Get the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const chatSession = model.startChat({
  generationConfig: {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  },
  history: [],
});

// Alternative export for direct use
export async function generateAIContent(prompt: string) {
  try {
    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw error;
  }
}
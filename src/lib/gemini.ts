import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

let currentModel = "gemini-1.5-pro-002";

export const setModel = (model: string) => {
  currentModel = model;
};

const getModel = () => {
  return genAI.getGenerativeModel({
    model: currentModel,
  });
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = getModel().startChat({
  generationConfig,
  history: [],
});

export const sendMessage = async (message: string) => {
  try {
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
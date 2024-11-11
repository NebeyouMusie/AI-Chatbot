import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

let currentModel = "gemini-1.5-pro-002";
let currentChatSession: any = null;

export const setModel = (model: string) => {
  currentModel = model;
  // Reset chat session when model changes
  currentChatSession = getModel().startChat({
    generationConfig,
    history: [],
  });
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

// Initialize chat session
currentChatSession = getModel().startChat({
  generationConfig,
  history: [],
});

export const sendMessage = async (message: string) => {
  try {
    const result = await currentChatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
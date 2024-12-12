import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as dotenv from "dotenv";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

import generateSummary from "./outputSchemas/summarySchema";
import generateFlashcards from "./outputSchemas/flashcardsSchema";

dotenv.config();

export const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

export const config = {
  summary: {
    prompt:
      "You are a professional teacher with a specialization in summarization. Make a summary of the provided notes. ",
    schema: generateSummary,
  },
  flashcards: {
    prompt:
      "You are a professional teacher with a specialization in flashcards. Make flashcards of the provided notes. ",
    schema: generateFlashcards,
  },
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
  safetySettings: safetySettings,
});

export const fileManager = new GoogleAIFileManager(apiKey);

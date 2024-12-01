import { GoogleGenerativeAI } from "@google/generative-ai";

import generateSummary from "./outputSchemas/generateSummary";
import generateFlashcards from "./outputSchemas/generateFlashcards";

import {
  AIOutputOptions,
  AIResponse,
  GenerateAIResponseProps,
} from "../types/ai.types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const generateAIResponse = async <T extends AIResponse>({
  input,
  outputOption,
}: GenerateAIResponseProps): Promise<T | null> => {
  try {
    if (outputOption === AIOutputOptions.SUMMARY) {
      model.generationConfig.responseSchema = generateSummary;

      const result = await model.generateContent(
        "You are a professional teacher with a specialization in summarization. Make a summary of the following notes: " +
          input,
      );

      const parsedSummary: T = JSON.parse(result.response.text());

      return parsedSummary;
    }

    if (outputOption === AIOutputOptions.FLASHCARDS) {
      model.generationConfig.responseSchema = generateFlashcards;

      const result = await model.generateContent(
        "You are a professional teacher with a specialization in flashcards. Make flashcards of the following notes: " +
          input,
      );

      const parsedFlashcards: T = JSON.parse(result.response.text());

      return parsedFlashcards;
    }

    return null;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return null;
  }
};

export default generateAIResponse;

import { GoogleGenerativeAI } from "@google/generative-ai";

import generateSummary from "./outputSchemas/generateSummary";
import generateFlashcards from "./outputSchemas/generateFlashcards";

export interface generateAIInput {
  input: File | string;
  outputType: "summary" | "flashcards";
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const generateAIResponse = async ({ input, outputType }: generateAIInput) => {
  if (outputType === "summary") {
    model.generationConfig.responseSchema = generateSummary;

    const result = await model.generateContent(
      "Make a summary of the following text: " + input,
    );
    console.log(result.response.text());
  }

  if (outputType === "flashcards") {
    model.generationConfig.responseSchema = generateFlashcards;

    const result = await model.generateContent(
      "Make flashcards of the following text: " + input,
    );
    console.log(result.response.text());
  }
};

export default generateAIResponse;

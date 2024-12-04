import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as dotenv from "dotenv";

import generateSummary from "../../utils/outputSchemas/generateSummary";
import generateFlashcards from "../../utils/outputSchemas/generateFlashcards";
import { GenerateFromTextProps } from "../../types/ai.types";

dotenv.config();

const config = {
  summary: {
    prompt:
      "You are a professional teacher with a specialization in summarization. Make a summary of the following notes: ",
    schema: generateSummary,
  },
  flashcards: {
    prompt:
      "You are a professional teacher with a specialization in flashcards. Make flashcards of the following notes: ",
    schema: generateFlashcards,
  },
};

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const generateFromText = async ({
  input,
  outputOption,
}: GenerateFromTextProps) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    model.generationConfig.responseSchema = config[outputOption].schema;

    const result = await model.generateContent(
      config[outputOption].prompt + input,
    );

    const parsedResult = JSON.parse(result.response.text());
    return parsedResult;
  } catch (error) {
    // console.error("Error generating AI response:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default generateFromText;

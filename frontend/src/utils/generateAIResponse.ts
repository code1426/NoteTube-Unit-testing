import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";

import generateSummary from "@/utils/outputSchemas/generateSummary";
import generateFlashcards from "@/utils/outputSchemas/generateFlashcards";

import {
  AIOutputOptions,
  AIResponse,
  GenerateAIResponseProps,
} from "../types/ai.types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
// const fileManager = new GoogleAIFileManager(import.meta.env.API_KEY);

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
    if (input instanceof File) {
      throw new Error("File input not supported yet");
      // const uploadResponse = await fileManager.uploadFile(
      //   input.webkitRelativePath,
      //   {
      //     mimeType: input.type,
      //     displayName: input.name,
      //   },
      // );
      // console.log(
      //   `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
      // );
      // const result = await model.generateContent([
      //   {
      //     fileData: {
      //       mimeType: uploadResponse.file.mimeType,
      //       fileUri: uploadResponse.file.uri,
      //     },
      //   },
      //   { text: "Can you summarize this document as a bulleted list?" },
      // ]);
      // console.log(result.response.text());
    }

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
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default generateAIResponse;

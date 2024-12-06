import { AIResponse } from "../../types/ai.types";

import generateAIResponse from "../../utils/gemini/generateAIResponse";

const generateFromText = async (input: string): Promise<AIResponse> => {
  try {
    const summaryResult = await generateAIResponse(input, "summary").then(
      (result) => JSON.parse(result),
    );

    const flashcardsResult = await generateAIResponse(input, "flashcards").then(
      (result) => JSON.parse(result),
    );

    return { summary: summaryResult, flashcards: flashcardsResult };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
};

export default generateFromText;

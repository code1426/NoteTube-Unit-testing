import { AIResponse } from "../../types/ai.types";

import deleteFile from "../../utils/deleteFile";
import uploadFile from "../../utils/gemini/uploadFile";
import generateAIResponse from "../../utils/gemini/generateAIResponse";

const generateFromFiles = async (
  files: Express.Multer.File[],
): Promise<AIResponse> => {
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const uploadResult = uploadFile(file); // upload the file to gemini
        deleteFile(file); // delete the file after uploading to gemini
        return uploadResult;
      }),
    );

    const summaryResult = await generateAIResponse(
      uploadedFiles,
      "summary",
    ).then((result) => JSON.parse(result));

    const flashcardsResult = await generateAIResponse(
      uploadedFiles,
      "flashcards",
    ).then((result) => JSON.parse(result));

    return {
      summary: summaryResult,
      flashcards: flashcardsResult,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
};

export default generateFromFiles;

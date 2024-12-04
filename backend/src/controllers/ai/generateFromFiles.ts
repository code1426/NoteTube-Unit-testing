import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as dotenv from "dotenv";

import { GenerateFromFilesProps } from "../../types/ai.types";

import generateSummary from "../../utils/outputSchemas/generateSummary";
import generateFlashcards from "../../utils/outputSchemas/generateFlashcards";
import deleteFile from "../../utils/deleteFile";

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
const fileManager = new GoogleAIFileManager(apiKey);

// upload file to gemini
const uploadFile = async (file: Express.Multer.File): Promise<Part | null> => {
  try {
    // console.log("file:", file, file.mimetype, file.originalname);

    const fileBlob = new Blob([file.buffer], { type: file.mimetype });
    const metadata = {
      file: { mimeType: file.mimetype, displayName: file.originalname },
    };
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    const formData = new FormData();

    formData.append("metadata", metadataBlob);

    formData.append("file", fileBlob, file.originalname);

    const uploadResponse = await fileManager.uploadFile(
      `${file.originalname}`,
      {
        mimeType: file.mimetype,
        displayName: file.originalname,
      },
    );

    if (!file) {
      throw new Error("File is missing in formData");
    }

    const fileUri = uploadResponse.file.uri;
    // console.log(`Uploaded file: ${file.originalname} (${fileUri})`);

    if (!fileUri) {
      throw new Error("File upload failed");
    }

    return { fileData: { fileUri: fileUri, mimeType: file.mimetype } };
  } catch (error) {
    // console.error("Error uploading file:", error);
    return null;
  }
};

const generateFromFiles = async ({
  files,
  outputOption,
}: GenerateFromFilesProps) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    model.generationConfig.responseSchema = config[outputOption].schema;

    const uploadedFiles = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const uploadResult = uploadFile(file); // upload the file to gemini
        deleteFile(file); // delete the file after uploading to gemini
        return uploadResult;
      }),
    );

    // genenenrate content based on input files and output option
    const result = await model.generateContent([
      ...uploadedFiles.filter((file) => file !== null),
      { text: config[outputOption].prompt },
    ]);

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

export default generateFromFiles;

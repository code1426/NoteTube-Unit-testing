import express, { Request, Response } from "express";

import {
  GenerateFromFilesProps,
  GenerateFromTextProps,
} from "../types/ai.types";

import generateFromFiles from "../controllers/ai/generateFromFiles";
import generateFromText from "../controllers/ai/generateFromText";

import multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// for uploading files to the server
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, process.env.MEMORY_STORAGE_FOLDER!); // save files in the memory storage folder in the server root
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // keep the original file name
  },
});

const upload = multer({ storage: storage });

router.post("/text", async (request: Request, response: Response) => {
  try {
    const { input, outputOption } = request.body as GenerateFromTextProps;

    // console.log("input: ", input);
    const result = await generateFromText({ input, outputOption });
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error generating AI response from text",
    });
  }
});

router.post(
  "/file",
  upload.any(),
  async (request: Request, response: Response) => {
    try {
      const files = request.files as Express.Multer.File[];
      if (!files) {
        throw new Error("File is missing in formData");
      }

      const { outputOption } = request.body;

      const result = await generateFromFiles({
        files,
        outputOption,
      });
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error generating AI response from file",
      });
    }
  },
);

export default router;

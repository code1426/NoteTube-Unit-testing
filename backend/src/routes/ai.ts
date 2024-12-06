import express, { Request, Response } from "express";

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
    const { text } = request.body as { text: string };

    // console.log("input: ", input);
    const result = await generateFromText(text);
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

      const result = await generateFromFiles(files);
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

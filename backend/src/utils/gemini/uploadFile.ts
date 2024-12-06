import { Part } from "@google/generative-ai/dist/server/server";
import { fileManager } from "./initializeGemini";

const uploadFile = async (file: Express.Multer.File): Promise<Part> => {
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

    const uploadResponse = await fileManager
      .uploadFile(`${process.env.MEMORY_STORAGE_FOLDER}${file.originalname}`, {
        mimeType: file.mimetype,
        displayName: file.originalname,
      })
      .catch((error) => {
        {
          throw new Error(
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          );
        }
      });

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
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error while uploading file",
    );
  }
};

export default uploadFile;

import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_COUNT,
  MAX_TEXT_INPUT_LENGTH,
  MIN_TEXT_INPUT_LENGTH,
} from "./constants";
import formatBytes from "./formatBytes";

export const TextInputSchema = z.object({
  input: z
    .string({ message: "You must enter some text" })
    .min(MIN_TEXT_INPUT_LENGTH, {
      message: `Input must be at least ${MIN_TEXT_INPUT_LENGTH} characters.`,
    })
    .max(MAX_TEXT_INPUT_LENGTH, {
      message: `Input must be less than ${MAX_TEXT_INPUT_LENGTH} characters`,
    }),
});

export const FileUploadSchema = z.object({
  files: z
    .instanceof(FileList, { message: "You must upload a file first" })
    .refine((files) => files.length > 0, "You must upload a file first")
    .refine(
      (files) => files.length <= MAX_FILE_COUNT,
      `Only a maximum of ${MAX_FILE_COUNT} files are allowed`,
    )
    .refine(
      (files) => {
        return [...files].every((file) => ALLOWED_FILE_TYPES[file.type]);
      },
      {
        message:
          "Invalid file type. Allowed types are JPG, PNG, PDF, DOC, DOCX, TXT",
      },
    )
    .refine(
      (files) => {
        return [...files].every((file) => file.size <= MAX_FILE_SIZE); // 5MB
      },
      {
        message: `Each file should not exceed ${formatBytes(MAX_FILE_SIZE, 0)} mb`,
      },
    ),
});

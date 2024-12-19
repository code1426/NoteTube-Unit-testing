export const VIBRANT_COLORS = [
  "#FF6B6B", // Soft Vibrant Red
  "#FFA94D", // Soft Vibrant Orange
  "#FFD93D", // Soft Vibrant Yellow
  "#8CE99A", // Soft Vibrant Green
  "#63E6E6", // Soft Vibrant Cyan
  "#74C0FC", // Soft Vibrant Blue
  "#B983FF", // Soft Vibrant Purple
  "#FF77E9", // Soft Vibrant Pink
];

export const ALLOWED_FILE_TYPES: { [key: string]: boolean } = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
  "application/pdf": true,
  "text/plain": true,
};

export const MIN_TEXT_INPUT_LENGTH = 50; // 50 characters
export const MAX_TEXT_INPUT_LENGTH = 4000; // 4000 characters

export const MAX_FILE_SIZE = 5 * 1048 ** 2; // 5MB
export const MAX_FILE_COUNT = 5;

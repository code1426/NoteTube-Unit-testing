export const PASTEL_COLORS = [
  "#FFADAD", // Pastel Red
  "#FFD6A5", // Pastel Orange
  "#FDFFB6", // Pastel Yellow
  "#CAFFBF", // Pastel Green
  "#9BF6FF", // Pastel Blue
  "#A0C4FF", // Pastel Purple
  "#FFC6FF", // Pastel Pink
];

export const ALLOWED_FILE_TYPES: { [key: string]: boolean } = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
  "application/pdf": true,
  "application/msword": true,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    true,
  "text/plain": true,
};

export const MIN_TEXT_INPUT_LENGTH = 50; // 50 characters
export const MAX_TEXT_INPUT_LENGTH = 4000; // 4000 characters

export const MAX_FILE_SIZE = 5 * 1048 ** 2; // 5MB
export const MAX_FILE_COUNT = 5;

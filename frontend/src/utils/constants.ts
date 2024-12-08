export const ALLOWED_FILE_TYPES: { [key: string]: boolean } = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
  "application/pdf": true,
  "application/msword": true,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    true,
  "plain/text": true,
};

export const MIN_TEXT_INPUT_LENGTH = 50; // 50 characters
export const MAX_TEXT_INPUT_LENGTH = 4000; // 4000 characters

export const MAX_FILE_SIZE = 5 * 1048 ** 2; // 5MB
export const MAX_FILE_COUNT = 5;

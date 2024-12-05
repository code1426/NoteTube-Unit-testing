export type AIOutputOption = "summary" | "flashcards";

export interface GenerateFromTextProps {
  input: string;
  outputOption: AIOutputOption;
}

export interface GenerateFromFilesProps {
  files: Express.Multer.File[];
  outputOption: AIOutputOption;
}

export interface GenerateSummaryResponse {
  title: string;
  content: string;
}

export interface GeneratedFlashcard {
  front: string;
  back: string;
}

export interface GenerateFlashcardsResponse {
  flashcards: Array<GeneratedFlashcard>;
}

export type AIResponse =
  | null
  | GenerateSummaryResponse
  | GenerateFlashcardsResponse;

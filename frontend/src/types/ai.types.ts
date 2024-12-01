export enum AIOutputOptions {
  SUMMARY = "summary",
  FLASHCARDS = "flashcards",
}

export interface GenerateAIResponseProps {
  input: File | string;
  outputOption: AIOutputOptions.SUMMARY | AIOutputOptions.FLASHCARDS;
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

export type AIOutputOption = "summary" | "flashcards";

export interface GenerateAIResponseProps {
  input: FileList | string;
}

export interface AIResponse {
  summary: GenerateSummaryResponse;
  flashcards: GenerateFlashcardsResponse;
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
  items: Array<GeneratedFlashcard>;
}

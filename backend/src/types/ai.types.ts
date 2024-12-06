import { Part } from "@google/generative-ai";

export type AIInputType = Part[] | string;

export type AIOutputOption = "summary" | "flashcards";

export interface AIInput {
  input: AIInputType;
  outputOption: AIOutputOption;
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
  flashcards: Array<GeneratedFlashcard>;
}

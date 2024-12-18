import React, { useState } from "react";
import { Flashcard } from "@/types/flashcard.types";
import { FlashcardsContext } from "./Contexts";

const FlashcardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>();
  return (
    <FlashcardsContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardsContext.Provider>
  );
};

export default FlashcardsProvider;

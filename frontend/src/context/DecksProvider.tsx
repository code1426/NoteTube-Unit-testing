import React, { useState } from "react";
import type { DeckEntity } from "@/types/deck.types";
import { DecksContext } from "./Contexts";

const DecksProvider = ({ children }: { children: React.ReactNode }) => {
  const [decks, setDecks] = useState<DeckEntity[]>();
  return (
    <DecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </DecksContext.Provider>
  );
};

export default DecksProvider;

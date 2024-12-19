import { createContext } from "react";
import type { User } from "@/types/user.types";
import type { DeckEntity } from "@/types/deck.types";
import { NoteWithVideos } from "@/types/note.types";
import type { Flashcard } from "@/types/flashcard.types";

interface UserContextProps {
  user?: User;
  setUser: (value: User) => void;
}

interface AuthContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export interface DecksContextProps {
  decks: DeckEntity[] | undefined;
  setDecks: (value: DeckEntity[]) => void;
}

interface NotesContextProps {
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  notes: NoteWithVideos[] | undefined;
  setNotes: (value: NoteWithVideos[]) => void;
}

interface FlashcardsContextProps {
  flashcards: Flashcard[] | undefined;
  setFlashcards: (value: Flashcard[]) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: { id: "", username: "", email: "" },
  setUser: () => {},
});

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const DecksContext = createContext<DecksContextProps>({
  decks: [],
  setDecks: () => {},
});

export const NotesContext = createContext<NotesContextProps>({
  isUploading: false,
  setIsUploading: () => {},
  notes: [],
  setNotes: () => {},
});

export const FlashcardsContext = createContext<FlashcardsContextProps>({
  flashcards: [],
  setFlashcards: () => {},
});

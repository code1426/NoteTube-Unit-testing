import { createContext } from "react";
import type { User } from "@/types/user.types";
import type { DeckEntity } from "@/types/deck.types";
import { NoteWithVideos } from "@/types/note.types";
import type { Flashcard } from "@/types/flashcard.types";
import { Theme } from "@/types/theme.types";

interface UserContextState {
  user?: User;
  setUser: (value: User) => void;
}

interface AuthContextState {
  isAuthenticated?: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface DecksContextState {
  decks: DeckEntity[] | undefined;
  setDecks: (value: DeckEntity[]) => void;
}

interface NotesContextState {
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  notes: NoteWithVideos[] | undefined;
  setNotes: (value: NoteWithVideos[]) => void;
}

interface FlashcardsContextState {
  flashcards: Flashcard[] | undefined;
  setFlashcards: (value: Flashcard[]) => void;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const UserContext = createContext<UserContextState>({
  user: { id: "", username: "", email: "" },
  setUser: () => {},
});

export const AuthContext = createContext<AuthContextState>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const DecksContext = createContext<DecksContextState>({
  decks: [],
  setDecks: () => {},
});

export const NotesContext = createContext<NotesContextState>({
  isUploading: false,
  setIsUploading: () => {},
  notes: [],
  setNotes: () => {},
});

export const FlashcardsContext = createContext<FlashcardsContextState>({
  flashcards: [],
  setFlashcards: () => {},
});

export const ThemeContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => {},
});

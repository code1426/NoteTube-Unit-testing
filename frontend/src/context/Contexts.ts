import { createContext } from "react";
import type { User } from "@/types/user.types";
import type { DeckEntity } from "@/types/deck.types";

interface UserContextProps {
  user?: User;
  setUser: (value: User) => void;
}

interface AuthContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface DecksContextProps {
  decks: DeckEntity[] | undefined;
  setDecks: (value: DeckEntity[]) => void;
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

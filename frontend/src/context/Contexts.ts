import { createContext } from "react";
import type { User } from "@/types/user.types";

interface UserContextProps {
  user?: User;
  setUser: (value: User) => void;
}

interface AuthContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: { id: "", username: "", email: "" },
  setUser: () => {},
});

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

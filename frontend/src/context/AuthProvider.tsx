import React, { createContext, useState } from "react";

interface ContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const Auth = createContext<ContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;

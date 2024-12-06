import React, { useState } from "react";
import type { User } from "@/types/user.types";
import { UserContext } from "./Contexts";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import { useState, useEffect } from "react";
import type { User } from "../types/user.types";

interface ErrorDetails {
  message: string;
}

const UseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const API_URL = "http://localhost:3000"; // to be replaced with the real API URL (e.g. process.env.**)
        const response = await fetch(`${API_URL}/home`, {
          method: "GET",
          headers: { token: localStorage.token },
        });

        if (!response.ok) {
          const errorDetails: ErrorDetails = await response.json();
          setError(errorDetails.message);
          return;
        } else {
          const userData: User = await response.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, setUser, loading, error };
};

export default UseUser;

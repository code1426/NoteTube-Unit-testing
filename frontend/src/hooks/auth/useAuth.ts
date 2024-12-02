import { useState } from "react";
import { RegisterData, LoginData } from "../../types/user.types";

interface ErrorDetails {
  field: string;
  message: string;
}

const useAuth = (type: "register" | "login") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorDetails | null>(null);

  const submitData = async (data: RegisterData | LoginData) => {
    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/auth/${type}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorDetails: ErrorDetails = await response.json();
      setLoading(false);
      setError(errorDetails);
      throw new Error(errorDetails.message || "An unknown error occurred");
    } else {
      setLoading(false);
    }

    const token = await response.json();

    if (token) {
      localStorage.setItem("token", token);
    }
    setLoading(false);
  };

  return { submitData, loading, error, setError };
};

export default useAuth;

import { useState } from "react";
import { FormData } from "../types/user.types";

interface ErrorDetails {
  field:string;
  message: string;
}

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorDetails | null>(null);

  const submitData = async (formData: FormData) => {
    
      setLoading(true);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        setLoading(false);
        setError(errorDetails)
        throw new Error(errorDetails.message || "An unknown error occurred");
      }

      // If the response is OK, get the token from the response
      const token = await response.json();

      if (token) {
        localStorage.setItem("token", token);
        setLoading(false);
        console.log("Registration successful");
        // setIsAuthenticated(true);
      } else {
        setLoading(false);
        console.log("Registration failed, no token received");
      }
  };

  return { submitData, loading, error, setError };
};

export default useRegisterUser;

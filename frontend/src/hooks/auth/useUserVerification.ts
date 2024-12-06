import { useState, useEffect, useContext } from "react";
import { Auth } from "@/context/AuthProvider";

const useUserVerification = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  useEffect(() => {
    const checkAuthenticated = async () => {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/auth/verify`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        },
      );

      if (!result.ok) {
        setError("Failed to verify authentication");
        return;
      } else {
        const isAuthorized: boolean = await result.json();
        setIsAuthenticated(isAuthorized);
      }
    };

    checkAuthenticated().then(() => {
      setLoading(false);
    });
  }, [setIsAuthenticated]);

  return {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    error,
  };
};

export default useUserVerification;

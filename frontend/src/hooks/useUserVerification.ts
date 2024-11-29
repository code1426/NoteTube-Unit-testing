import { useState, useEffect } from "react";

const useUserVerification = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
      setLoading(false);
    });
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    error,
  };
};

export default useUserVerification;

import { useState, useEffect } from "react";

// will be used to check wether the user is already logged in to redirect them to the home page.

const useUserAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const result = await fetch("http://localhost:3000/auth/verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        });

        const isAuthorized = await result.json();
        if (isAuthorized) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: unknown) {
        console.error(error);
        setError(error);
      }
    };

    checkAuthenticated();
    setIsLoading(false);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    error,
  };
};

export default useUserAuth;

import { useState, useEffect } from "react";

const useUserAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const result = await fetch("http://localhost:3000/auth/verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        });

        const isAuthorized = await result.json();

        isAuthorized ? setIsAuthenticated(true) : setIsAuthenticated(false);
        
      } catch (error) {
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

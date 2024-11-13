import { useState } from "react";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const submitData = async (formData: {
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const token = await response.json();

      if (token) {
        localStorage.setItem("token", token);
        setLoading(false);
        console.log("from register page: success");
        // setIsAuthenticated(true);
      } else {
        setLoading(false);
        console.log("from register page: failed");
        // setIsAuthenticated(true);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { submitData, loading, error };
};

export default useRegisterUser;

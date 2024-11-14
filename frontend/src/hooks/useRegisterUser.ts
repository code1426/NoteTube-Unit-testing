import { useState } from "react";
import { FormData } from "../types/user.types";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // if (response.status === 401) {
      //   response
      // }

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
    } catch (error) {
      console.log("ERROR IN USER REGISTRATION: ",error);
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { submitData, loading, error };
};

export default useRegisterUser;

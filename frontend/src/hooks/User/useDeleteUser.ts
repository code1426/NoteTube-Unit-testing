import { useState } from "react";
import { User } from "@/types/user.types";

interface UpdateUserResult {
  success: boolean;
  user?: User;
  error?: string | null;
}

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userData: User): Promise<UpdateUserResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/profile/?id=${userData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          "Request to change user failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const user: User = await response.json();
        return { success: true, user };
      }
    } catch (error) {
      return { success: false, error: "Failed to delete user" };
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};

export default useDeleteUser;

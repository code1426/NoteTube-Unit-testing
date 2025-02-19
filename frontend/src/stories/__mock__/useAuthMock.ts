interface ErrorDetails {
  field: string;
  message: string;
}
import { LoginData, RegisterData } from "@/types/user.types";

const useAuth = (_type: "register" | "login") => ({
  // For "register", we simulate a successful registration.
  submitData: async (_data: RegisterData | LoginData) =>
    Promise.resolve({ message: "Registration successful!", field: "" }),
  loading: false,
  error: { message: "Registration successful!", field: "" },
  setError: (_error: ErrorDetails | null): void => {},
});

export default useAuth;

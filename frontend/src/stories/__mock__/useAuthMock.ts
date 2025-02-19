// src/mocks/useAuth.ts

const useAuth = (_type: "register" | "login") => ({
  // For "register", we simulate a successful registration.
  submitData: async () =>
    Promise.resolve({ message: "Registration successful!" }),
  loading: false,
  error: null,
  setError: () => {},
});

export default useAuth;

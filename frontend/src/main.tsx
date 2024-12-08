import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "@/context/AuthProvider";
import UserProvider from "./context/UserProvider";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </UserProvider>,
);

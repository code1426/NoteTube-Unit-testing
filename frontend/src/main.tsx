import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "@/context/AuthProvider";
import UserProvider from "@/context/UserProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <AuthProvider>
      <Sonner />
      <Toaster />
      <App />
    </AuthProvider>
  </UserProvider>,
);

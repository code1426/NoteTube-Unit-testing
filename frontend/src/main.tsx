import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "@/context/AuthProvider";
import UserProvider from "./context/UserProvider";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </UserProvider>,
);

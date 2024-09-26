import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import AppWrapper from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </StrictMode>
);

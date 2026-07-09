import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./routes/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProviderWrapper } from "./contexts/auth.context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProviderWrapper>
    <RouterProvider router={router} />
  </AuthProviderWrapper>,
  // <StrictMode>
  // </StrictMode>,
);

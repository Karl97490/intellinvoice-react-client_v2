import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProviderWrapper } from "./contexts/auth.context.jsx";
import { InvoiceStatsProviderWrapper } from "./contexts/invoiceStats.context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProviderWrapper>
    <InvoiceStatsProviderWrapper>
      <RouterProvider router={router} />
    </InvoiceStatsProviderWrapper>
  </AuthProviderWrapper>,
  // <StrictMode>
  // </StrictMode>,
);

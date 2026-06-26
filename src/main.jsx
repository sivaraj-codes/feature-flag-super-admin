import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "./shared/components/ErrorBoundary.jsx";
import { AuthProvider } from "./shared/context/AuthContext.jsx";
import App from "./App.jsx";

import "./styles/reset.css";
import "./styles/index.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
      <ToastContainer position="top-right" theme="dark" autoClose={2000} />
    </QueryClientProvider>
  </BrowserRouter>,
);

import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@vapor-ui/core";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/pretendard";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK !== "false") {
    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
});

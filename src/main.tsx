import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@vapor-ui/core";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/pretendard";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>,
  );
});

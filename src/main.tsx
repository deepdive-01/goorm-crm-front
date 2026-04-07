import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@vapor-ui/core";
import "@fontsource/pretendard";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);

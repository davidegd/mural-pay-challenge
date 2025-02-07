import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { AppContextProvider } from "./hooks/useAppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <HeroUIProvider>
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </AppContextProvider>
  </StrictMode>
);

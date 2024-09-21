import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MidiContextProvider from "@/contexts/midiContext.jsx";
import SettingsContextProvider from "@/contexts/settingsContext";
import App from "@/app.jsx";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsContextProvider>
      <MidiContextProvider>
        <App />
      </MidiContextProvider>
    </SettingsContextProvider>
  </StrictMode>
);

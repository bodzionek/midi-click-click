import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MidiContextProvider from "@/contexts/midiContext.jsx";
import App from "@/app.jsx";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MidiContextProvider>
      <App />
    </MidiContextProvider>
  </StrictMode>
);

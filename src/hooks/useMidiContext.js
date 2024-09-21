import * as React from "react";

import { MidiContext } from "../contexts/midiContext";

const useMidiContext = () => {
  const context = React.useContext(MidiContext);

  if (!context) {
    throw new Error("useMidiContext must be used within a MidiContextProvider");
  }

  return context;
};

export default useMidiContext;

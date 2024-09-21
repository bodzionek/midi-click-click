import * as React from "react";

import { MidiController } from "@/utils/midi";

export const MidiContext = React.createContext();

const MidiContextProvider = (props) => {
  const [midiController, setMidiController] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);

  const onKeyPress = React.useCallback((e, i) => {
    e.stopPropagation();
    console.log("Press:", i);
  }, []);
  const onKeyRelease = React.useCallback((e, i) => {
    e.stopPropagation();
    console.log("Release:", i);
  }, []);

  React.useEffect(
    () => setMidiController(new MidiController(setInputs, setOutputs)),
    []
  );

  const value = React.useMemo(
    () => ({
      midiController,
      inputs,
      outputs,
      onKeyPress,
      onKeyRelease,
    }),
    [inputs, midiController, onKeyPress, onKeyRelease, outputs]
  );

  return <MidiContext.Provider value={value} {...props} />;
};

export default MidiContextProvider;

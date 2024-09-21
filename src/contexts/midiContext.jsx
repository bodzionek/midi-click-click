import * as React from "react";

import { MidiController } from "@/utils/midi";
import { validateIfValuesInRange } from "@/utils";

export const MidiContext = React.createContext();

const MidiContextProvider = (props) => {
  const [midiController, setMidiController] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);
  const [selectedInput, setSelectedInput] = React.useState("virtual");
  const [keysRange, setKeysRange] = React.useState({ first: 36, last: 96 });
  const [pressedKeys, setPressedKeys] = React.useState([]);

  const handleKeysRangeChange = React.useCallback((first, last) => {
    if (!validateIfValuesInRange(first, last, 21, 108)) {
      return;
    }
    setKeysRange({ first, last });
  }, []);

  const onVirtualKeyPress = React.useCallback((i) => setPressedKeys([i]), []);
  const onVirtualKeyRelease = React.useCallback(() => setPressedKeys([]), []);

  const onKeyPress = React.useCallback((i) => {
    setPressedKeys((prev) => [...prev, i]);
  }, []);

  const onKeyRelease = React.useCallback((i) => {
    setPressedKeys((prev) => prev.filter((k) => k !== i));
  }, []);

  const onSelectInput = React.useCallback((id) => {
    setSelectedInput(id);
    setPressedKeys([]);
  }, []);

  React.useEffect(
    () =>
      setMidiController(
        new MidiController(setInputs, setOutputs, onKeyPress, onKeyRelease)
      ),
    [onKeyPress, onKeyRelease]
  );

  React.useEffect(() => {
    if (inputs.length) {
      setSelectedInput(inputs[0].id);
      setPressedKeys([]);
    }
  }, [inputs]);

  React.useEffect(() => {
    if (!inputs.length) {
      setSelectedInput("virtual");
    }
  }, [inputs.length]);

  React.useEffect(() => {
    if (midiController && selectedInput) {
      midiController.getInputMessages(selectedInput);
    }
  }, [midiController, selectedInput]);

  const value = React.useMemo(
    () => ({
      midiController,
      inputs,
      outputs,
      onKeyPress,
      onKeyRelease,
      onVirtualKeyPress,
      onVirtualKeyRelease,
      selectedInput,
      onSelectInput,
      keysRange,
      pressedKeys,
      onKeysRangeChange: handleKeysRangeChange,
    }),
    [
      handleKeysRangeChange,
      inputs,
      keysRange,
      midiController,
      onKeyPress,
      onKeyRelease,
      onSelectInput,
      onVirtualKeyPress,
      onVirtualKeyRelease,
      outputs,
      pressedKeys,
      selectedInput,
    ]
  );

  return <MidiContext.Provider value={value} {...props} />;
};

export default MidiContextProvider;

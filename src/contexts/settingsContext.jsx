import * as React from "react";

export const SettingsContext = React.createContext();

const SettingsContextProvider = (props) => {
  const [showOctaves, setShowOctaves] = React.useState(false);
  const [showNotesName, setShowNotesName] = React.useState(false);
  const [highlightOnPlay, setHighlightOnPlay] = React.useState(true);

  const value = React.useMemo(
    () => ({
      showOctaves,
      onOctaveDisplayChange: setShowOctaves,
      showNotesName,
      onShowNotesNameChange: setShowNotesName,
      highlightOnPlay,
      onHighlightOnPlayChange: setHighlightOnPlay,
    }),
    [highlightOnPlay, showNotesName, showOctaves]
  );

  return <SettingsContext.Provider value={value} {...props} />;
};

export default SettingsContextProvider;

import * as React from "react";

import { SettingsContext } from "@/contexts/settingsContext";

const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }

  return context;
};

export default useSettingsContext;

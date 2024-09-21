import * as React from "react";

import Octave from "@/components/octave.component";
import useMidiContext from "@/hooks/useMidiContext";
import { validateIfValuesInRange, getKeyboardConfig } from "@/utils";
import { KEYBOARD_ERROR } from "@/consts/errors";

const Keyboard = () => {
  const { keysRange } = useMidiContext();

  if (!validateIfValuesInRange(keysRange.first, keysRange.last, 21, 108)) {
    throw new Error(KEYBOARD_ERROR);
  }

  const config = React.useMemo(
    () => getKeyboardConfig(keysRange.first, keysRange.last),
    [keysRange]
  );

  return (
    <div className="flex items-center justify-center min-w-fit">
      <div className="flex items-start select-none justify-center shadow-[0_0_11px_-3px_rgba(0,0,0,0.2)]">
        {config.map(({ number, start, end }) => (
          <Octave key={number} number={number} start={start} end={end} />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;

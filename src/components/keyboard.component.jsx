import * as React from "react";
import PropTypes from "prop-types";

import Octave from "@/components/octave.component";
import { validateIfValuesInRange, getKeyboardConfig } from "@/utilities";
import { KEYBOARD_ERROR } from "@/consts/errors";

const Keyboard = ({ first = 21, last = 108 }) => {
  if (!validateIfValuesInRange(first, last, 21, 108)) {
    throw new Error(KEYBOARD_ERROR);
  }

  const config = React.useMemo(
    () => getKeyboardConfig(first, last),
    [first, last]
  );

  return (
    <div className="flex items-center justify-center min-w-fit">
      {config.map(({ number, start, end }) => (
        <Octave key={number} number={number} start={start} end={end} />
      ))}
    </div>
  );
};

Keyboard.propTypes = {
  first: PropTypes.number,
  last: PropTypes.number,
};

export default Keyboard;

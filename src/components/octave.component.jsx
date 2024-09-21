import PropTypes from "prop-types";

import WhiteKey from "@/components/white-key.component";
import {
  getFirstNoteNumber,
  getNotesConfig,
  validateIfValuesInRange,
} from "@/utils";
import useSettingsContext from "@/hooks/useSettingsContext";
import { OCTAVE_ERROR } from "@/consts/errors";

const Octave = ({ start = 0, end = 11, number = 1 }) => {
  const { showOctaves } = useSettingsContext();

  if (!validateIfValuesInRange(start, end, 0, 11)) {
    throw new Error(OCTAVE_ERROR);
  }

  const isFull = start === 0 && end === 11;
  const firstNoteNumber = getFirstNoteNumber(number);
  const notesSlice = getNotesConfig(start, end);

  return (
    <div className="group flex flex-col flex-0 relative border-t-4 border-t-slate-900">
      {showOctaves ? (
        <>
          <div className="absolute -top-6 left-0 right-0 text-xs h-5 w-full text-slate-300 border-l border-r border-dashed border-transparent px-2 transition-colors group-hover:text-sky-500 group-hover:font-medium group-hover:border-sky-500">
            <span>
              {isFull ? `Octave: ` : "#"}
              {number}
            </span>
          </div>
          <div className="absolute -bottom-[10px] left-0 right-0 h-[2px] bg-transparent transition-colors rounded-md group-hover:bg-sky-500"></div>
        </>
      ) : null}
      <div className="flex h-[180px] items-start justify-start relative">
        {notesSlice.map(({ kIndex, name, subKey }) => {
          return (
            <WhiteKey
              key={name}
              name={name}
              subKey={subKey}
              renderSub={kIndex + 1 < end}
              noteIndex={firstNoteNumber + kIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

Octave.propTypes = {
  number: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
};

export default Octave;

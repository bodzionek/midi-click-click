import PropTypes from "prop-types";

import useMidiContext from "@/hooks/useMidiContext";
import { classMerge } from "@/utilities";

const BlackKey = ({ noteIndex, names, className, ...props }) => {
  const { onKeyPress, onKeyRelease } = useMidiContext();

  return (
    <div
      onMouseDown={(e) => onKeyPress(e, noteIndex)}
      onMouseUp={(e) => onKeyRelease(e, noteIndex)}
      {...props}
      className={classMerge(
        "group/black cursor-pointer absolute top-0 rounded-b-sm bg-gradient-to-b from-black from-[85%] via-slate-500 to-[88%] to-black w-[23px] h-[130px] z-10 shadow-sm flex items-end justify-center",
        className
      )}
    >
      <div className="flex flex-col mb-5">
        {names.map((n) => (
          <span
            className="text-white text-xs transition-opacity opacity-60 group-hover/black:opacity-100"
            key={n}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

BlackKey.propTypes = {
  noteIndex: PropTypes.number.isRequired,
  names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  className: PropTypes.string,
};

export default BlackKey;

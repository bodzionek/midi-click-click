import PropTypes from "prop-types";

import useMidiContext from "@/hooks/useMidiContext";
import useSettingsContext from "@/hooks/useSettingsContext";
import { cn } from "@/lib/utils";

const BlackKey = ({ noteIndex, names, className, ...props }) => {
  const { onVirtualKeyPress, onVirtualKeyRelease, pressedKeys } =
    useMidiContext();
  const { showNotesName, highlightOnPlay } = useSettingsContext();
  const isDown = pressedKeys.includes(noteIndex);

  const handleKeyStatusChange = (e, cb) => {
    e.stopPropagation();
    cb(noteIndex);
  };

  return (
    <div
      onMouseDown={(e) => handleKeyStatusChange(e, onVirtualKeyPress)}
      onMouseUp={(e) => handleKeyStatusChange(e, onVirtualKeyRelease)}
      {...props}
      className={cn(
        "group/black border-l-2 border-r-2 border-b-2 border-transparent cursor-pointer absolute top-0 rounded-b-sm bg-gradient-to-b from-black from-[85%] via-slate-500 to-black to-[88%] w-[25px] h-[130px] z-20 shadow-sm flex items-end justify-center",
        isDown ? "from-[88%] to-[91%]" : "from-[85%] to-[88%]",
        isDown && highlightOnPlay ? " border-orange-400" : "border-transparent",
        className
      )}
    >
      {showNotesName ? (
        <div
          className={cn(
            "flex flex-col transition-opacity opacity-60 group-hover/black:opacity-100",
            isDown ? "mb-4 opacity-100 text-orange-400" : "mb-5 text-white"
          )}
        >
          {names.map((n) => (
            <span className="text-xs" key={n}>
              {n}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

BlackKey.propTypes = {
  noteIndex: PropTypes.number.isRequired,
  names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  className: PropTypes.string,
};

export default BlackKey;

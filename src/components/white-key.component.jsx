import PropTypes from "prop-types";

import BlackKey from "@/components/black-key.component";
import useMidiContext from "@/hooks/useMidiContext";
import useSettingsContext from "@/hooks/useSettingsContext";
import { cn } from "@/lib/utils";

const WhiteKey = ({ noteIndex, name, subKey, renderSub, ...props }) => {
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
        "group/white cursor-pointer w-[40px] border rounded-b-[4px] bg-gradient-to-b from-white from-[88%] via-slate-100 to-slate-200 transition-all relative shadow-sm",
        isDown ? "h-[203px] via-slate-200/80 to-slate-300/80" : "h-[200px]",
        isDown && highlightOnPlay
          ? "border-violet-600 border-t-gray-800"
          : "border-gray-800 border-l-gray-400 border-r-gray-400"
      )}
    >
      <div
        className={cn(
          "absolute top-0 bottom-0 z-10 w-full rounded-b-[4px] border-2 border-t-0 border-transparent",
          isDown && highlightOnPlay ? "border-violet-600" : "border-transparent"
        )}
      ></div>
      {subKey && renderSub ? (
        <BlackKey
          noteIndex={noteIndex + 1}
          names={subKey}
          className="left-[27px]"
        />
      ) : null}
      <div
        className={cn(
          "absolute w-full top-[88%] border-t border-t-slate-300 flex items-center justify-center",
          isDown ? "top-[89%]" : "top-[88%]"
        )}
      >
        {showNotesName ? (
          <span
            className={cn(
              "text-xs mt-1 font-bold transition-all text-slate-400 group-hover/white:text-sky-500",
              isDown ? "text-violet-600 group-hover/white:text-violet-600" : ""
            )}
          >
            {name}
          </span>
        ) : null}
      </div>
    </div>
  );
};

WhiteKey.propTypes = {
  name: PropTypes.string.isRequired,
  renderSub: PropTypes.bool,
  subKey: PropTypes.arrayOf(PropTypes.string),
  noteIndex: PropTypes.number.isRequired,
};

export default WhiteKey;

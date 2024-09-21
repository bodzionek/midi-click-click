import PropTypes from "prop-types";

import BlackKey from "@/components/black-key.component";
import useMidiContext from "@/hooks/useMidiContext";

const WhiteKey = ({ noteIndex, name, subKey, renderSub, ...props }) => {
  const { onKeyPress, onKeyRelease } = useMidiContext();

  return (
    <div
      onMouseDown={(e) => onKeyPress(e, noteIndex)}
      onMouseUp={(e) => onKeyRelease(e, noteIndex)}
      {...props}
      className="group/white cursor-pointer w-[40px] -ml-[1px] h-[200px] border border-black rounded-b-[4px] bg-gradient-to-b from-white from-[88%] via-slate-100 to-slate-200 transition-all relative"
    >
      {subKey && renderSub ? (
        <BlackKey
          noteIndex={noteIndex + 1}
          names={subKey}
          className="left-[27px]"
        />
      ) : null}
      <div className="absolute w-full top-[88%] border-t border-t-slate-300 flex items-center justify-center">
        <span className="text-xs mt-1 font-bold transition-opacity opacity-40 group-hover/white:opacity-100">
          {name}
        </span>
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

import { KeyboardMusic } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useSettingsContext from "@/hooks/useSettingsContext";

const DisplaySettings = () => {
  const {
    showOctaves,
    onOctaveDisplayChange,
    showNotesName,
    onShowNotesNameChange,
    highlightOnPlay,
    onHighlightOnPlayChange,
  } = useSettingsContext();
  return (
    <div className="px-36 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <KeyboardMusic className="w-4 h-4 text-slate-400" />
        <Label>Keyboard display</Label>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showOctaves}
            onCheckedChange={onOctaveDisplayChange}
            id="octaves"
          />
          <label
            htmlFor="octaves"
            className="select-none h-4 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Octave numbers
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showNotesName}
            onCheckedChange={onShowNotesNameChange}
            id="notes"
          />
          <label
            htmlFor="notes"
            className="select-none h-4 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Note names
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={highlightOnPlay}
            onCheckedChange={onHighlightOnPlayChange}
            id="highlight"
          />
          <label
            htmlFor="highlight"
            className="select-none h-4 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Highlight on play
          </label>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;

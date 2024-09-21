import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import InputsSelect from "@/components/inputs-select.component";
import DisplaySettings from "@/components/display-settings.component";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="fixed top-0 left-0 right-0 shadow-md bg-slate-100 flex flex-col">
      <div className="px-36 mt-4">
        <InputsSelect />
      </div>
      <div
        className={cn(
          "transition-all overflow-hidden",
          expanded ? "max-h-28" : "max-h-0"
        )}
      >
        <Separator className="my-4" />
        <DisplaySettings />
      </div>
      <div
        className="group mt-1 w-full cursor-pointer text-xs flex items-center justify-center pb-1 bt-[2px]"
        onClick={handleExpandToggle}
      >
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-all text-slate-400 group-hover:text-slate-800",
            expanded ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
    </div>
  );
};

export default Navbar;

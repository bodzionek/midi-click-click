import { Settings } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useMidiContext from "@/hooks/useMidiContext";

const InputsSelect = () => {
  const { inputs, selectedInput, onSelectInput } = useMidiContext();

  return (
    <div className="flex flex-col space-y-2">
      <Label>Input device</Label>
      <div className="flex items-center space-x-1">
        <Select
          value={selectedInput}
          onValueChange={onSelectInput}
          disabled={!inputs?.length}
        >
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="virtual">Virtual keyboard</SelectItem>
              {inputs.map(({ id, device }) => (
                <SelectItem key={id} value={id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InputsSelect;

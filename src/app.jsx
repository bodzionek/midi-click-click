import { ErrorBoundary } from "react-error-boundary";

import Keyboard from "@/components/keyboard.component";
import useMidiContext from "@/hooks/useMidiContext";
import ErrorFallback from "@/components/error-fallback.component";

const App = () => {
  const { inputs, outputs } = useMidiContext();

  return (
    <>
      <div>
        {inputs.map(({ id, device }) => (
          <div key={id}>Input: {device.name}</div>
        ))}
      </div>
      <div>
        {outputs.map(({ id, device }) => (
          <div key={id}>Output: {device.name}</div>
        ))}
      </div>

      <div className="mt-96">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Keyboard first={21} last={108} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;

import { ErrorBoundary } from "react-error-boundary";

import Keyboard from "@/components/keyboard.component";
import ErrorFallback from "@/components/error-fallback.component";
import Navbar from "@/components/navbar.component";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mt-96">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Keyboard />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;

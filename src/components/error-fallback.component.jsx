import PropTypes from "prop-types";

const ErrorFallback = ({ error }) => {
  return (
    <div className="flex w-full py-4 items-center justify-center bg-red-600 text-white">
      {error.message}
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorFallback;

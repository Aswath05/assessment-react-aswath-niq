import { CircularProgress } from "@mui/material";
import ReactDOM from "react-dom";

const Loader = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100/60">
          <CircularProgress />
        </div>,
        document.body
      )}
    </>
  );
};

export default Loader;

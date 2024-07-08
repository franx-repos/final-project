import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = () => {
  return <ToastContainer />;
};

export const notify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className:
      "bg-gray-50 dark:bg-gray-700 text-teal-600 dark:text-teal-200 font-bold border-2 border-teal-400",
  });
};

export default Toastify;

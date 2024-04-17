import { useContext } from "react";
import { Slide, ToastOptions, toast } from "react-toastify";
import { MessageContext } from "../providers/MessageProvider";


const toastOptions: ToastOptions = {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Slide,
                       
                    }

export const useMessage = () => {
  const { setMessage } = useContext(MessageContext)!;

  const showMessage = (message: string, type: 'error' | 'success' | 'info' | 'warning' = 'error') => {
    setMessage(message);
    switch (type) {
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'success':
        toast.success(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
    }
  };

  return { showMessage };
    
};


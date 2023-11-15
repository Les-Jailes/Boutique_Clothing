"use client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showToast = (message, type = "default") => {
    const options = {
      position: "bottom-right",
      autoClose: 5500, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warn(message, options);
        break;
      default:
        toast(message, options);
    }
  }
import { toast } from "react-toastify";

const useToast = () => {
    const toastConfig = {
        autoClose: 2000,
    };

    const successToast = (message = "", options = {}) => toast.success(message, { ...toastConfig, ...options });
    const errorToast = (message = "", options = {}) => toast.error(message, { ...toastConfig, ...options });

    return {
        successToast,
        errorToast,
    };
};

export default useToast;

import { toast } from "react-toastify";

//Toastify generator
const toastCreator = (message, status) => {
  toast[status](message, {
    position: "bottom-center",
    autoClose: 3000,
    toastId: "unique",
    theme: "dark",
  });
};

export default toastCreator;

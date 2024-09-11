import { toast } from "react-toastify";

export const toastCustm = (check, suc_msg, err_msg) => {
  if (check === true || check === "true") {
    toast.success(suc_msg);
  } else {
    toast.error(err_msg);
  }
};

import { toast } from "react-toastify";
export const toastSuccess = (msg) => {
	toast.success(msg, {
		position: "bottom-right",
		autoClose: 1000,
		hideProgressBar: false,
	});
};
export const toastFailure = (msg) => {
	toast.error(msg, {
		position: "bottom-right",
		autoClose: 1000,
		hideProgressBar: false,
	});
};

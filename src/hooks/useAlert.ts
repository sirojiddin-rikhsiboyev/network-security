import Swal from "sweetalert2/dist/sweetalert2.js";
import type { SweetAlertOptions } from "sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";

export interface DialogOptions extends SweetAlertOptions {
  title?: string | HTMLElement | any;
  text?: string | any;
  confirmButtonText?: string | any;
  cancelButtonText?: string | any;
}

const alertOptions: SweetAlertOptions = {
  customClass: {
    cancelButton: "btn btn-md btn-gray-flat w-full",
    confirmButton: "btn btn-md btn-primary-flat w-full",
  },
};

const alert = Swal.mixin(alertOptions);
const toast = alert?.mixin({
  toast: true,
  backdrop: false,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const confirmDialog = (options: DialogOptions) => {
  return alert?.fire({
    icon: "question",
    showCancelButton: true,
    ...options,
  });
};

const successDialog = (options: DialogOptions) => {
  return alert?.fire({
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    ...options,
  });
};

const infoDialog = (options: DialogOptions) => {
  return alert?.fire({
    icon: "info",
    showConfirmButton: false,
    timer: 1500,
    ...options,
  });
};

const warningDialog = (options: DialogOptions) => {
  return alert?.fire({
    icon: "warning",
    showConfirmButton: false,
    timer: 1500,
    ...options,
  });
};

const errorDialog = (options: DialogOptions) => {
  return alert?.fire({
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
    ...options,
  });
};

const successToast = (message: string | any, options?: SweetAlertOptions) => {
  return toast?.fire({
    title: message,
    icon: "success",
    ...options,
  });
};

const errorToast = (message: string | any, options?: SweetAlertOptions) => {
  return toast?.fire({
    title: message,
    icon: "error",
    ...options,
  });
};

const showToast = (options: SweetAlertOptions) => {
  return toast?.fire(options);
};

export const useAlert = () => ({
  confirmDialog,
  successDialog,
  infoDialog,
  warningDialog,
  errorDialog,
  successToast,
  errorToast,
  showToast,
});

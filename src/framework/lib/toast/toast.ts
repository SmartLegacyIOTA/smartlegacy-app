import { toast } from "sonner-native";

/**
 * Professional wrapper for Sonner Toasts
 * Can be used anywhere (screens, hooks, services)
 */

type ToastOptions = {
  description?: string;
  duration?: number;
  id?: string | number;
};

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    description: options?.description,
    duration: options?.duration || 4000,
    id: options?.id,
  });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    description: options?.description,
    duration: options?.duration || 6000,
    id: options?.id,
  });
};

export const toastInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    description: options?.description,
    duration: options?.duration || 4000,
    id: options?.id,
  });
};

export const toastPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: (data: T) => string;
    error: (err: any) => string;
  },
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

export const toastDismiss = (id?: string | number) => {
  toast.dismiss(id);
};

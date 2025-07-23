import { toast, ToastOptions, TypeOptions } from 'react-toastify';

const flashMessage = (content: string, type: TypeOptions = 'info', options?: ToastOptions) => {
  toast(content, { type, ...options });
};

export default flashMessage;

import { Toast } from "~/types/nuxtApp";

export default defineNuxtPlugin(() => {

  const timer = ref<NodeJS.Timeout>();

  const toast = ref<Toast>({
    isOpen: false,
    type: 'info',
    message: '',
  });

  const openToast = (message: string, params: {
    isDanger?: boolean,
    timeOut?: number,
  } = {}) => {
    const { isDanger = false, timeOut = 3000 } = params;
    if (timer.value) clearTimeout(timer.value);
    toast.value = {
      isOpen: true,
      type: isDanger ? 'danger' : 'info',
      message,
    }
    if (timeOut > 0) timer.value = setTimeout(() => closeToast(), timeOut);
  }

  const closeToast = () => {
    toast.value.isOpen = false;
  }

  return {
    provide: {
      toast,
      openToast,
      closeToast,
    }
  }
});
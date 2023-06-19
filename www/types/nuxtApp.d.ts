export type nuxtApp = {
  $toast: Toast,
  $closeToast: any
};

export type Toast = {
  isOpen: boolean,
  type: 'info' | 'danger',
  message: string,
}
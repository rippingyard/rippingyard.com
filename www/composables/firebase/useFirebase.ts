export const useFirebase = () => {
  const { $fb: fb } = useNuxtApp();
  return { fb };
};

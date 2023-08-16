import { FirebaseApp } from "firebase/app";

export const useFirebase = (): { fb: FirebaseApp } => {
  const { $fb } = useNuxtApp();
  const fb = $fb as FirebaseApp;
  return { fb };
};

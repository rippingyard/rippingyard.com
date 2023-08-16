import { DocumentData, DocumentReference } from "firebase/firestore";
import { User } from "~/schemas/user";

export const useMe = () => {

  const { $me, $myRef } = useNuxtApp();

  return {
    me: $me as globalThis.Ref<User | undefined>,
    myRef: $myRef as globalThis.Ref<DocumentReference<DocumentData> | undefined>,
  }

};
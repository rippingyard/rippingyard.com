export const useMe = () => {

  const { $me: me, $myRef: myRef } = useNuxtApp();

  return {
    me,
    myRef,
  }

};
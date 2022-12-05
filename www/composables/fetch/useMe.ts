export const useMe = () => {

  const { $me: me } = useNuxtApp();

  return {
    me
  }

};
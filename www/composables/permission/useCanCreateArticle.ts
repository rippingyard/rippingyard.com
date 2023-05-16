import { useMe } from "../fetch/useMe";

export const useCanCreateArticle = () => {
  const canCreateArticle = ref(false);
  const { me } = useMe();

  // watch(me, () => {
  //   console.log('me.value', me.value);
  //   canCreateArticle.value = !!(me.value && !me.value.isBanned && !me.value.isDeleted && ['resident', 'mayor', 'lord'].includes(me.value.role));
  // });

  console.log('me', me?.value?.uid);

  if (me && me.value) {
    canCreateArticle.value = !!(me.value && !me.value?.isBanned && !me.value?.isDeleted && ['resident', 'mayor', 'lord'].includes(me.value?.role));
  }


  return {
    canCreateArticle,
  };
}
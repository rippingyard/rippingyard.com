import { useMe } from "../fetch/useMe";

export const useCanCreateArticle = () => {
  const canCreateArticle = ref(false);
  const { me } = useMe();

  watch(me, () => {
    canCreateArticle.value = !!(me.value && !me.value.isBanned && !me.value.isDeleted && ['resident', 'mayor', 'lord'].includes(me.value.role));
  });

  return {
    canCreateArticle,
  };
}
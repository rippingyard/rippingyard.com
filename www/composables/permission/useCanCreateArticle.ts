import { useMe } from "../fetch/useMe";

export const useCanCreateArticle = () => {
  const canCreateArticle = ref(false);
  const { me } = useMe();

  watchEffect(() => {
    if (!me || !me.value) return;
    if (me.value.isBanned || me.value.isDeleted) return;
    canCreateArticle.value = ['resident', 'mayor', 'lord'].includes(me.value.role);
  });

  return {
    canCreateArticle,
  };
}
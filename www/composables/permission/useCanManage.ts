import { useMe } from "../fetch/useMe";

export const useCanManage = () => {
  const canManage = ref(false);
  const { me } = useMe();

  watch(me, () => {
    canManage.value = !!(me.value && !me.value.isBanned && !me.value.isDeleted && ['mayor', 'lord'].includes(me.value.role));
  });

  return {
    canManage,
  };
}
import { useMe } from "../fetch/useMe";

export const useCanCreateNote = () => {
  const canCreateNote = ref(false);
  const { me } = useMe();

  watch(me, () => {
    canCreateNote.value = !!(me.value && !me.value.isBanned && !me.value.isDeleted && ['resident', 'mayor', 'lord'].includes(me.value.role));
  });

  return {
    canCreateNote,
  };
}
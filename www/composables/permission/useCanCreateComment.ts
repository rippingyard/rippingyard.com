import { useMe } from "../fetch/useMe";

export const useCanCreateComment = () => {
  const canCreateComment = ref(false);
  const { me } = useMe();

  watch(me, () => {
    canCreateComment.value = !!(me.value && !me.value.isBanned && !me.value.isDeleted);
  });

  return {
    canCreateComment,
  };
}
import { useNavState } from '~/composables/state/useNavState';

export default defineNuxtRouteMiddleware((to, from) => {
  const { close } = useNavState();
  close();
});
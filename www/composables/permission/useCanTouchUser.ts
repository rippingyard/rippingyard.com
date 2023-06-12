import { User } from "~~/schemas/user";

const isPermitted = (user?: User) => {
  console.log('user', user);
  if (!user) return false;
  return true;
}

export const useCanTouchUser = (user?: User) => {
  const canTouchUser = ref(false);
  canTouchUser.value = isPermitted(user);

  return {
    canTouchUser,
  };
}
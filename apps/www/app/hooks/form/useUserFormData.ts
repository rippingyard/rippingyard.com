export const useUserFormData = async (request: Request) => {
  const formData = await request.formData();

  const userName = formData.get('userName') as string;
  const displayName = formData.get('displayName') as string;
  const profile = (formData.get('profile') as string) || '';
  const avatar = (formData.get('avatar') as string) || '';

  return {
    displayName,
    userName,
    profile,
    avatar,
  };
};

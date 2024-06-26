﻿import { PostStatus, PostType } from '~/schemas/post';

export const usePostFormData = async (request: Request) => {
  const formData = await request.formData();

  const contentBody = formData.get('contentBody') as string;
  const title = formData.get('title') as string;
  const type = formData.get('type') as PostType;
  const status = formData.get('status') as PostStatus;
  const isPublic = (formData.get('isPublic') as string) === '1';

  return {
    contentBody,
    title,
    type,
    status,
    isPublic,
  };
};

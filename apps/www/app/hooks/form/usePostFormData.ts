import { PostStatus, PostType, SuggestedTag } from '~/schemas/post';

export const usePostFormData = async (request: Request) => {
  const formData = await request.formData();

  const contentBody = formData.get('contentBody') as string;
  const title = formData.get('title') as string;
  const type = formData.get('type') as PostType;
  const status = formData.get('status') as PostStatus;
  const isPublic = (formData.get('isPublic') as string) === '1';
  const tags = (formData.getAll('tag') as string[]) || [];

  const suggestedTagStrings =
    (formData.getAll('suggestedTag') as string[]) || [];
  const suggestedTags = suggestedTagStrings.map((t) => {
    const parsed = JSON.parse(t) as SuggestedTag;
    return {
      value: parsed.value,
      relevance: parsed.relevance,
    };
  });

  return {
    contentBody,
    title,
    type,
    status,
    tags,
    isPublic,
    suggestedTags,
  };
};

import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { useRootContext } from '~/root';
import { mockedEntities } from '~/routes/api/suggestion';

import { Post } from '@rippingyard/schemas';

import { SuggestedEntity } from '../postEditor/settingModal';
import { TagSelector } from '../postEditor/settingModal/tagSelector';

type Props = {
  post: Post;
  handleUpdateTags?: (selectedTags: string[]) => void;
};

export const Suggestion: FC<Props> = ({
  post,
  handleUpdateTags = () => undefined,
}) => {
  const { id, tags = [], suggestedTags: initialSuggestedTags } = post;

  const { myTags } = useRootContext();

  const [selectedTags, setSelectedTags] = useState<string[]>(tags);
  const [isLoading, setIsLoading] = useState(false);

  const [suggestedTags, setSuggestedTags] = useState<SuggestedEntity[]>(
    initialSuggestedTags?.map((t) => {
      return {
        ...t,
        isChecked: tags.includes(t.value),
      };
    })
  );

  useEffect(() => {
    if (!id || initialSuggestedTags || suggestedTags || isLoading) return;

    (async () => {
      setIsLoading(true);

      const result = await axios.get<{
        suggestedTags: string[];
      }>(`/api/suggestion/${id}`);
      const { suggestedTags: tags = [] } = result.data;
      setSuggestedTags(
        tags.map((t) => {
          return {
            value: t,
            relevance: 1,
            isChecked: tags.includes(t),
          };
        })
      );

      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (tags === selectedTags) return;
    handleUpdateTags(selectedTags);
  }, [selectedTags, tags]);

  return (
    <TagSelector
      tags={[...tags, ...mockedEntities, ...myTags]}
      selectedTags={selectedTags}
      suggestedTags={suggestedTags}
      setSelectedTags={setSelectedTags}
      isLoading={isLoading}
    />
  );
};

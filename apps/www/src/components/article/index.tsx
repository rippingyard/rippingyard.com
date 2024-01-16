import { FC } from "react";

import { useContent } from "~/hooks/normalize/useContent";
import { articleStyle } from "~/utils/style";

type Props = {
  text: string;
};

export const Article: FC<Props> = ({ text = "" }) => {
  const html = useContent(text);
  return <div css={articleStyle} dangerouslySetInnerHTML={{ __html: html }} />;
};

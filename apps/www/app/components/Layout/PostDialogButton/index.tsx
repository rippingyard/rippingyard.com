import { FC } from 'react';

import { IconPen } from '~/assets/icons/Pen';
import { Button } from '~/components/Button';

import { containerStyle } from './style.css';

type Props = {
  isAuthenticated: boolean;
  onClick: () => void;
};

export const PostDialogButton: FC<Props> = ({
  isAuthenticated = false,
  onClick,
}) => {
  if (!isAuthenticated) return;

  return (
    <div className={containerStyle}>
      <Button isBlur isNoPadding size="xx-large" onClick={onClick}>
        <IconPen />
      </Button>
    </div>
  );
};

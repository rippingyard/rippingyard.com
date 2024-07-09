import { FC, useCallback, useState } from 'react';

import { IconClose } from '~/assets/icons/Close';
import { IconUpload } from '~/assets/icons/Upload';
import { Avatar } from '~/components/Avatar';
import { ImageUploader } from '~/components/ImageUploader';

import {
  avatarContainerStyle,
  emptyStyle,
  modalStyle,
  removeButtonStyle,
} from './style.css';

type Props = {
  avatar?: string;
  uploadpath: string;
  onUpdate: (url: string) => void;
};

export const AvatarEditor: FC<Props> = ({ avatar, uploadpath, onUpdate }) => {
  const [showUploader, setShowUploader] = useState(false);

  const onRemoveAvatar = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onUpdate('');
    },
    [onUpdate]
  );

  const onShowUploader = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setShowUploader(true);
    },
    []
  );

  const onUpdatedAvatar = useCallback(
    ({ url }: { url: string }) => {
      onUpdate(url);
    },
    [onUpdate]
  );

  if (!avatar)
    return (
      <>
        <button
          className={emptyStyle}
          onClick={(event) => onShowUploader(event)}
        >
          <IconUpload />
        </button>
        {showUploader && (
          <div className={modalStyle}>
            <ImageUploader
              uploadpath={uploadpath}
              onUploaded={onUpdatedAvatar}
              onClose={() => setShowUploader(false)}
            />
          </div>
        )}
      </>
    );

  return (
    <div className={avatarContainerStyle}>
      <button
        className={removeButtonStyle}
        onClick={(event) => onRemoveAvatar(event)}
      >
        <IconClose />
      </button>
      <Avatar url={avatar} />
    </div>
  );
};

import { useDropZone, useFileDialog } from '@reactuses/core';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IconClose } from '~/assets/icons/Close';
import { IconUpload } from '~/assets/icons/Upload';
import { ResizedImage, resizeImage } from '~/utils/image';

import {
  closeIconStyle,
  dropContainerStyle,
  dropInnerStyle,
  uploadCaptionStyle,
  uploadIconStyle,
} from './style.css';

type Props = {
  onUpdate: (file: ResizedImage) => void;
  onClose: () => void;
};

export const DropZone: FC<Props> = ({ onUpdate, onClose }) => {
  const [isResizing, setIsResizing] = useState(false);

  const dzRef = useRef<HTMLDivElement>(null);

  const [files, openFileDialog] = useFileDialog({
    multiple: false,
  });

  const onDrop = useCallback(
    async (files: File[] | null) => {
      if (!files) return;
      try {
        setIsResizing(true);
        const originalFile = files[0];

        const resizedImage = await resizeImage(originalFile);

        if (!resizedImage) return;

        onUpdate(resizedImage);
      } catch (e) {
        console.error(e);
      }
      setIsResizing(false);
    },
    [onUpdate]
  );

  const isOverDropZone = useDropZone(dzRef, onDrop);

  const dropCaption = useMemo(() => {
    if (isOverDropZone) return '画像ファイルをアップロードできます';
    if (isResizing) return '画像をリサイズしています';
    return '画像ファイルをドロップしてください';
  }, [isOverDropZone, isResizing]);

  useEffect(() => {
    if (!files) return;
    onDrop([files[0]]);
  }, [files, onDrop]);

  return (
    <div className={dropContainerStyle}>
      <div
        ref={dzRef}
        className={dropInnerStyle}
        onClick={() => openFileDialog()}
      >
        <div>
          <p className={uploadIconStyle}>
            <IconUpload />
          </p>
          <p className={uploadCaptionStyle}>{dropCaption}</p>
        </div>
      </div>
      <button onClick={onClose} className={closeIconStyle}>
        <IconClose />
      </button>
    </div>
  );
};

import { FC } from 'react';

import { IconClose } from '~/assets/icons/Close';
import { IconUpload } from '~/assets/icons/Upload';
import { Button } from '~/components/Button';
import { ResizedImage } from '~/utils/image';

import {
  consoleStyle,
  previewCloseStyle,
  previewContainerStyle,
  previewDataListStyle,
  previewDataStyle,
  previewImageStyle,
} from './style.css';

type Props = {
  file: ResizedImage | undefined;
  isUploading: boolean;
  onUpload: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemoveImage: () => void;
};

export const Preview: FC<Props> = ({
  file,
  isUploading = false,
  onRemoveImage,
  onUpload,
}) => {
  console.log('file', file);
  if (!file || !file?.url) return;

  return (
    <div className={previewContainerStyle}>
      <div className={previewImageStyle}>
        <img src={file?.url} />
        <div className={previewCloseStyle} onClick={onRemoveImage}>
          <IconClose />
        </div>
      </div>
      <div className={previewDataStyle}>
        <dl className={previewDataListStyle}>
          <dt>ファイルサイズ：</dt>
          <dd>{file?.file.size}</dd>
          <dt>ファイルタイプ：</dt>
          <dd>{file?.file.type}</dd>
        </dl>
        <div className={consoleStyle}>
          <Button
            color="success"
            isLoading={isUploading}
            isSquare={true}
            onClick={onUpload}
          >
            <IconUpload />
            アップロード
          </Button>
        </div>
      </div>
    </div>
  );
};

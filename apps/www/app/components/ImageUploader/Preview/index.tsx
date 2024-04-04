import { FC } from 'react';

import { IconClose } from '~/assets/icons/Close';
import { IconUpload } from '~/assets/icons/Upload';
import { Button } from '~/components/Button';
import { ResizedImage } from '~/utils/image';

import {
  consoleStyle,
  previewCloseStyle,
  previewContainerStyle,
  previewDataStyle,
  previewImageStyle,
} from './style.css';

type Props = {
  file: ResizedImage | undefined;
  isUploading: boolean;
  onUpload: () => void;
  onRemoveImage: () => void;
};

export const Preview: FC<Props> = ({
  file,
  isUploading = false,
  onRemoveImage,
  onUpload,
}) => {
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
        {/* <dl className="filedata">
    <dt>ファイルサイズ：</dt>
    <dd>{{ file?.file.size }}</dd>
    <dt>ファイルタイプ：</dt>
    <dd>{{ file?.file.type }}</dd>
    <dt>ファイル名：</dt>
    <dd>{{ file?.file.name }}</dd>
  </dl> */}
      </div>
    </div>
  );
};

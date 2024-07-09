import axios from 'axios';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';

import { getExt } from '~/utils/file';
import { ResizedImage } from '~/utils/image';

import { DropZone } from './DropZone';
import { Preview } from './Preview';
import { containerStyle, innerStyle } from './style.css';

type Props = {
  uploadpath: string;
  onUploaded: (params: { url: string }) => void;
  onClose: () => void;
};

export const ImageUploader: FC<Props> = ({
  uploadpath,
  onUploaded,
  onClose,
}) => {
  const endpoint = '/upload';

  const [file, setFile] = useState<ResizedImage>();
  const [isUploading, setIsUploading] = useState(false);

  const filename = useMemo(() => {
    if (!file) return;
    const ext = getExt(file.file);
    if (!ext) return;
    const now = dayjs();
    return `${uploadpath}${now.unix()}.${ext}`;
  }, [file, uploadpath]);

  const onUploadImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!filename || !file) return;
    event.preventDefault();
    try {
      setIsUploading(true);

      const body = new FormData();
      body.append('filename', filename);
      body.append('file', file?.file);

      const { data } = await axios<
        { filename: string; file: File },
        {
          data: {
            url: string;
          };
        }
      >({
        url: endpoint,
        data: body,
        method: 'POST',
      });

      const { url } = data;

      onUploaded({
        url,
      });

      setFile(undefined);
    } catch (e) {
      console.error(e);
    }
    onClose();
    setIsUploading(false);
  };

  const onUpdateFile = (file: ResizedImage) => {
    setFile(file);
  };

  const removeImage = () => {
    setFile(undefined);
  };

  return (
    <div className={containerStyle}>
      <div className={innerStyle}>
        <Preview
          file={file}
          onUpload={onUploadImage}
          onRemoveImage={removeImage}
          isUploading={isUploading}
        />
        {!file?.url && <DropZone onUpdate={onUpdateFile} onClose={onClose} />}
      </div>
    </div>
  );
};

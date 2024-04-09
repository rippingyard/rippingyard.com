import { Editor } from '@tiptap/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';

import { getExt } from '~/utils/file';
import { ResizedImage } from '~/utils/image';

import { DropZone } from './DropZone';
import { Preview } from './Preview';
import { containerStyle, innerStyle } from './style.css';

type Props = {
  editor: Editor;
  uploadpath: string;
  onClose: () => void;
};

const endpoint = '/api/upload';

export const ImageUploader: FC<Props> = ({ editor, uploadpath, onClose }) => {
  const [file, setFile] = useState<ResizedImage>();
  const [isUploading, setIsUploading] = useState(false);

  const filename = useMemo(() => {
    if (!file) return;
    const ext = getExt(file.file);
    if (!ext) return;
    const now = dayjs();
    return `${uploadpath}${now.unix()}.${ext}`;
  }, [file, uploadpath]);

  const onUpdateFile = (file: ResizedImage) => {
    setFile(file);
  };

  const onUploadImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!editor || !filename || !file) return;
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

      if (url) editor.chain().focus().setImage({ src: data.url }).run();

      setFile(undefined);
    } catch (e) {
      console.error(e);
    }
    onClose();
    setIsUploading(false);
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

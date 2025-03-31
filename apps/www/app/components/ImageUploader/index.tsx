import { FC, useState } from 'react';

import { useUploadImage } from '~/hooks/save/useUploadImage';
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
  const [file, setFile] = useState<ResizedImage>();
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImage } = useUploadImage({ uploadpath });

  const onUploadImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!file) return;
    event.preventDefault();
    try {
      setIsUploading(true);

      const { url } = await uploadImage({ file });

      onUploaded({ url });

      setFile(undefined);
    } catch (e) {
      console.error(e);
    }
    onClose();
    setIsUploading(false);
  };

  const onUpdateFile = (resizedImage: ResizedImage) => {
    setFile(resizedImage);
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

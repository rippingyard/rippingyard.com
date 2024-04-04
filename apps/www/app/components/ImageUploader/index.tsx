// import { Editor } from '@tiptap/react';
// import dayjs from 'dayjs';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FC, useState } from 'react';

// import { useStorage } from '~/hooks/firebase/useStorage';
// import { getExt } from '~/utils/file';
import { ResizedImage } from '~/utils/image';

import { DropZone } from './DropZone';
import { Preview } from './Preview';
import { containerStyle, innerStyle } from './style.css';

// import { getStorage, uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
// import { useFirebase } from '~~/composables/firebase/useFirebase';

type Props = {
  // editor: Editor;
  // show: boolean;
  onClose: () => void;
  onUpload: () => void;
  isUploading: boolean;
  // onChange?: (file: string) => void;
  // defaultImage?: string;
};

export const ImageUploader: FC<Props> = ({
  isUploading = false,
  onUpload,
  onClose,
}) => {
  // const props = withDefaults(
  //   defineProps<Props>(),
  //   {
  //     onChange: () => {},
  //     defaultImage: '',
  //   }
  // );

  // const { fb } = useFirebase();
  // const { storage } = useStorage();
  const [file, setFile] = useState<ResizedImage>();
  // const [isUploading, setIsUploading] = useState(false);

  // const uploadImage = async () => {
  //   if (!editor || !file) return;
  //   console.log('file', file);

  //   const ext = getExt(file.file);
  //   if (!ext) return;

  //   try {
  //     setIsUploading(true);
  //     const now = dayjs();

  //     const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`;
  //     console.log('filename', filename);

  //     const uploadHandler = ref(storage, filename);

  //     await uploadBytes(uploadHandler, file.file);
  //     const url = await getDownloadURL(uploadHandler);

  //     editor.chain().focus().setImage({ src: url }).run();
  //     setFile(undefined);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   onClose();
  //   setIsUploading(false);
  // };

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
          onRemoveImage={removeImage}
          isUploading={isUploading}
          onUpload={onUpload}
        />
        {!file?.url && <DropZone onUpdate={onUpdateFile} onClose={onClose} />}
      </div>
    </div>
  );
};

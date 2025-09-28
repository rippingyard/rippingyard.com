import axios from 'axios';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { getExt } from '~/utils/file';
import { ResizedImage } from '~/utils/image';

export const useUploadImage = ({
  uploadpath,
  endpoint = '/upload',
}: {
  uploadpath: string;
  endpoint?: string;
}) => {
  const { t } = useTranslation();
  const uploadImage = async ({ file }: { file: ResizedImage }) => {
    if (!file) throw new Error();

    const now = dayjs();

    const ext = getExt(file.file);
    if (!ext) throw new Error(t('error.invalidFile'));

    const filename = `${uploadpath}${now.unix()}.${ext}`;

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

    return data;
  };

  return { uploadImage };
};

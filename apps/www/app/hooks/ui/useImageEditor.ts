import { Image } from '@tiptap/extension-image';
import { Plugin } from 'prosemirror-state';

import { resizeImage } from '~/utils/image';

import { useUploadImage } from '../save/useUploadImage';

type Props = {
  uploadpath: string;
  onLoading?: () => void;
  onLoaded?: () => void;
};

const getImages = (files: FileList) =>
  !files ? [] : Array.from(files).filter((file) => /image/i.test(file.type));

export const useImageEditor = ({
  uploadpath,
  onLoading = () => undefined,
  onLoaded = () => undefined,
}: Props) => {
  const { uploadImage } = useUploadImage({ uploadpath });
  return Image.extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              paste(view, event) {
                try {
                  const hasFiles =
                    event.clipboardData &&
                    event.clipboardData.files &&
                    event.clipboardData.files.length;

                  if (!hasFiles) return;

                  const images = getImages(event.clipboardData.files);

                  if (images.length === 0) return;

                  event.preventDefault();

                  const { schema } = view.state;

                  images.forEach((image) => {
                    const reader = new FileReader();

                    reader.onload = async () => {
                      onLoading();

                      const resizedImage = await resizeImage(image);
                      const uploadedImage = await uploadImage({
                        file: resizedImage,
                      });

                      const node = schema.nodes.image.create({
                        src: uploadedImage.url,
                      });
                      const transaction =
                        view.state.tr.replaceSelectionWith(node);
                      view.dispatch(transaction);

                      onLoaded(); // ファイル一個にしか対応していないことに注意
                    };

                    reader.readAsDataURL(image);
                  });
                } catch (e) {
                  console.error(e);
                }
              },
            },
          },
        }),
      ];
    },
  });
};

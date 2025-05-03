import { Image } from '@tiptap/extension-image';
import { Plugin } from 'prosemirror-state';

import { resizeImage } from '~/utils/image';

import { useUploadImage } from '../save/useUploadImage';

export const useImageEditor = ({ uploadpath }: { uploadpath: string }) => {
  const { uploadImage } = useUploadImage({ uploadpath });

  return Image.extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              paste(view, event) {
                console.log('event', event);
                console.log('view', view);

                try {
                  const hasFiles =
                    event.clipboardData &&
                    event.clipboardData.files &&
                    event.clipboardData.files.length;

                  if (!hasFiles) return;

                  const images = Array.from(event.clipboardData.files).filter(
                    (file) => /image/i.test(file.type)
                  );

                  if (images.length === 0) return;

                  event.preventDefault();

                  const { schema } = view.state;

                  images.forEach((image) => {
                    console.log('image', image);
                    const reader = new FileReader();

                    reader.onload = async () => {
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

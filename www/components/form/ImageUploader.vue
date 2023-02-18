<template>
  <BlockModal v-if="show" :on-close="props.onClose">
    <div class="uploader">
      <div class="inner">
        <div v-show="image" class="preview columns">
          <div class="image column c60">
            <img :src="image" />
            <div class="close">
              <AtomButton class="button" @click="removeImage">
                <IconCloseCircle />
              </AtomButton>
            </div>
          </div>
          <div class="data column c40">
            <div class="console">
              <AtomButton class="button expanded centered" @click="uploadImage()">
                <IconUpload />
                アップロード
              </AtomButton>
            </div>
            <div>
              <p>ファイルサイズ：{{ file?.size }}</p>
              <p>ファイルタイプ：{{ file?.type }}</p>
              <p>ファイル名：{{ file?.name }}</p>
            </div>
          </div>
        </div>
        <div v-show="!image" class="drop" :class="{ 'is-over': isOverDropZone }">
          <div ref="dzRef" class="zone">
            <div class="inner" @click="() => openFileDialog()">
              <p class="uploadicon">
                <IconUpload />
              </p>
              <p v-if="!isOverDropZone" class="caption">
                画像ファイルをドロップしてください
              </p>
              <p v-else class="caption">
                画像ファイルをアップロードできます
              </p>
            </div>
          </div>
          <IconClose @click="props.onClose" class="trigger-close" />
        </div>
        <!-- <FormImageUploader :on-change="updateImage" /> -->
      </div>
    </div>
  </BlockModal>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { Editor } from '@tiptap/vue-3';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { resizeImage } from '~~/utils/image';
import { getExt } from '~/utils/file';

const dzRef = ref<HTMLDivElement>();

const { files, open: openFileDialog } = useFileDialog();

type Props = {
  editor: Editor;
  show: boolean;
  onClose: () => void;
  onChange?: (file: string) => void;
  defaultImage?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    onChange: () => {},
    defaultImage: '',
  }
);
console.log(props);

const image = ref('');
const file = ref<File>();

const onDrop = async (files: File[] | null) => {
  if (!files) return;

  const originalFile = files[0];
  file.value = originalFile;
  console.log('originalFile', file.value);

  const resizedImage = await resizeImage(originalFile, {
    width: 1800,
    height: 1800,
  });

  console.log('resizedImage', resizedImage);

  if (!resizedImage) return;

  image.value = resizedImage;

  // return typeof props.onChange === 'function'
  //   ? props.onChange(image as string)
  //   : null;
}

const uploadImage = async () => {
  if (!props.editor) return;
  console.log('image.value', image.value);
  if (image.value) {
    const ext = getExt(image.value);
    console.log('ext', ext);
    if (!ext) return;

    const now = dayjs()

    const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`
    const result = await (this as any).$fire.storage
      .ref()
      .child(filename)
      .put(image.value)
    const url = await result.ref.getDownloadURL();

    props.editor.chain().focus().setImage({ src: url }).run();

    props.onClose();
  }
};

const { isOverDropZone } = useDropZone(dzRef, onDrop);

// const options = ref({
//   url: '.',
//   autoQueue: false,
//   autoProcessQueue: false,
//   uploadMultiple: false,
//   maxFiles: 1,
//   acceptedFiles: 'image/*',
//   addRemoveLinks: true,
//   thumbnailWidth: 800,
//   thumbnailHeight: 800,
//   thumbnailMethod: 'contain',
//   resizeWidth: 200,
//   resizeHeight: 200,
//   resizeQuality: 1,
//   resizeMethod: 'contain',
//   // createImageThumbnails: false,
//   dictDefaultMessage: '画像をアップロードしてください',
//   // dictFallbackMessage: '',
//   // dictFallbackText: '',
//   // dictFileTooBig: '',
//   dictInvalidFileType: '画像以外のアップロードは許可されていません',
//   // dictResponseError: '',
//   // dictCancelUpload: '',
//   // dictUploadCanceled: '',
//   // dictCancelUploadConfirmation: '',
//   dictRemoveFile: '画像を削除する',
//   // dictRemoveFile: '<fa-icon icon="bold" />',
//   // dictRemoveFileConfirmation: '',
//   dictMaxFilesExceeded:
//     '{{maxFiles}}つ以上の画像はアップロード出来ません',
// })

// const Dropzone = require('nuxt-dropzone')

// export default Vue.extend({
//   components: {
//     Dropzone,
//   },
//   data() {
//     return {
//       dz: null,
//       image: '',
//       options: {

//       },
//     }
//   },
//   watch: {
//     defaultImage(val: string) {
//       this.image = val
//     },
//   },
//   mounted(): void {
//     const dz: any = this.$refs.dz
//     this.image = this.defaultImage
//     if (dz.dropzone) {
//       dz.dropzone.on(
//         'addedfile',

//       )
//     }
//   },
const removeImage = () => {
  image.value = '';
};
</script>
<style lang="scss" scoped>
.uploader {
  padding: 15px;
  height: 100%;

  >.inner {
    padding: 10px;
    height: 100%;
    border: 1px solid $gray-black;
  }

  .drop {
    height: inherit;
    width: 100%;
    color: $gray-black;

    &.is-over {
      background: $yellow;
      color: $black;
    }

    .zone {
      width: 100%;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;

      >.inner {
        position: relative;

        >.uploadicon {
          width: 80px;
          margin: auto;
          margin-bottom: 20px;

          >.icon {
            width: 80px;
            height: 80px;
            display: block;
          }
        }

        >.caption {
          min-width: 240px;
          font-size: 0.9rem;
          text-align: center;
        }
      }
    }

    .trigger-close {
      position: absolute;
      top: 35px;
      left: 35px;
      cursor: pointer;

      &:hover {
        color: $yellow;
      }
    }
  }

  .preview {
    width: 100%;
    height: 100%;
    display: flex;

    >.image {
      // width: 100%;
      height: 100%;
      position: relative;
      background-color: $gray-black;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }

      >.close {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        background-color: $white-transparent-60;
        display: none;
      }

      &:hover {
        >.close {
          display: flex;
          width: 100%;
          height: 100%;
        }
      }
    }

    >.data {
      padding-left: 10px;
      position: relative;
      overflow: hidden;

      >.console {
        position: absolute;
        bottom: 0;
        width: calc(100% - 10px);
      }
    }
  }
}
</style>

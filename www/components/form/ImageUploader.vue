<template>
  <BlockModal v-if="show" :on-close="props.onClose">
    <div class="inner">
      <div class="uploader">
        <div v-if="image" class="console">
          <AtomButton class="button expanded" @click="uploadImage()">
            アップロード
          </AtomButton>
        </div>
        <div v-show="image" class="dropzone">
          <div class="dz-preview">
            <div class="dz-image">
              <img :src="image" />
              <AtomButton class="button" @click="removeImage">
                <IconCloseCircle />
              </AtomButton>
            </div>
          </div>
        </div>
        <div v-show="!image">
          <!-- <Dropzone id="dz" ref="dz" :options="options" :destroy-dropzone="true" /> -->
          <div ref="dropZoneRef">
            ここにファイルを<br />Drop files here
            <p v-if="isOverDropZone">
              isOverDropZone
            </p>
            <p v-else>NO!</p>
          </div>
        </div>
        <!-- <FormImageUploader :on-change="updateImage" /> -->
      </div>
    </div>
  </BlockModal>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { Editor } from '@tiptap/vue-3';
import { useDropZone } from '@vueuse/core';
import { resizeImage } from '~~/utils/image';
import { getExt } from '~/utils/file';

const dropZoneRef = ref<HTMLDivElement>();

type Props = {
  editor: Editor;
  show: boolean;
  onClose: () => void;
  onChange: (file: string) => void;
  defaultImage: string;
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

const onDrop = async (files: File[] | null) => {
  if (!files) return;

  const originalFile = files[0];
  console.log('originalFile', originalFile);

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
  if (image.value) {
    const ext = getExt(image.value);
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

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

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

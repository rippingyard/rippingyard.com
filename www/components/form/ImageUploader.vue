<template>
  <div>
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
        <p v-if="isOverDropZone">isOverDropZone</p>
        <p v-else>NO!</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  console.log('File', files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

// import { resizeImage } from '~/plugins/image'

type Props = {
  onChange: (file: File) => void;
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
//         async (originalFile: any): Promise<any> => {
//           if (
//             !originalFile ||
//             // !originalFile.accepted ||
//             originalFile.status === 'error'
//           ) {
//             return null
//           }
//           // console.log('Original File Accepted!')

//           const image = await resizeImage(originalFile, {
//             width: 1800,
//             height: 1800,
//           })

//           return typeof this.onChange === 'function'
//             ? this.onChange(image)
//             : null
//         }
//       )
//     }
//   },
const removeImage = () => {
  image.value = '';
};
</script>

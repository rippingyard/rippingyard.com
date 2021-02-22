<template>
  <div>
    <div v-show="image" class="dropzone">
      <div class="dz-preview">
        <div class="dz-image">
          <img :src="image" />
          <button class="button" @click="removeImage">画像を削除する</button>
        </div>
      </div>
    </div>
    <div v-show="!image">
      <Dropzone
        id="dz"
        ref="dz"
        :options="options"
        :destroy-dropzone="true"
      ></Dropzone>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { resizeImage } from '~/plugins/image'

const Dropzone = require('nuxt-dropzone')

export default (Vue as any).extend({
  components: {
    Dropzone,
  },
  props: {
    onChange: {
      type: Function,
      default: () => {},
    },
    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dz: null,
      options: {
        url: '.',
        autoQueue: false,
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        thumbnailWidth: 800,
        thumbnailHeight: 800,
        thumbnailMethod: 'contain',
        resizeWidth: 200,
        resizeHeight: 200,
        resizeQuality: 1,
        resizeMethod: 'contain',
        // createImageThumbnails: false,
        dictDefaultMessage: '画像をアップロードしてください',
        // dictFallbackMessage: '',
        // dictFallbackText: '',
        // dictFileTooBig: '',
        dictInvalidFileType: '画像以外のアップロードは許可されていません',
        // dictResponseError: '',
        // dictCancelUpload: '',
        // dictUploadCanceled: '',
        // dictCancelUploadConfirmation: '',
        dictRemoveFile: '画像を削除する',
        // dictRemoveFileConfirmation: '',
        dictMaxFilesExceeded:
          '{{maxFiles}}つ以上の画像はアップロード出来ません',
      },
    }
  },
  mounted() {
    if (this.$refs.dz.dropzone) {
      this.$refs.dz.dropzone.on('addedfile', async (originalFile: any) => {
        if (
          !originalFile ||
          // !originalFile.accepted ||
          originalFile.status === 'error'
        ) {
          return null
        }
        console.log('Original File Accepted!')

        const image = await resizeImage(originalFile, {
          width: 1200,
          height: 1200,
        })

        return this.onChange(image)
      })
    }
  },
  methods: {
    removeImage() {
      (this as any).image = ''
    },
  },
})
</script>

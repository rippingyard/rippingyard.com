<template>
  <div class="uploader">
    <div class="inner">
      <div v-if="defaultImage" class="preview">
        <div class="image">
          <img :src="defaultImage" />
          <div class="close">
            <AtomButton class="button" :no-border="true" @click="removeDefaultImage">
              <IconClose />
            </AtomButton>
          </div>
        </div>
      </div>
      <div v-show="!defaultImage && file?.url" class="preview">
        <div class="image">
          <img :src="file?.url" />
          <div class="close" @click="removeImage">
            <AtomButton class="button" :no-border="true">
              <IconClose />
            </AtomButton>
          </div>
        </div>
        <div class="data" v-if="!isAutoUpload">
          <div class="console">
            <AtomButton class="button expanded centered" :is-loading="isUploading" @click="uploadImage()">
              <IconUpload />
              アップロード
            </AtomButton>
          </div>
        </div>
      </div>
      <div v-show="!defaultImage && !file?.url" class="drop" :class="{ 'is-over': isOverDropZone }">
        <div ref="dzRef" class="zone">
          <div class="inner" @click="() => openFileDialog()">
            <p class="uploadicon">
              <IconUpload />
            </p>
            <p class="caption">{{ dropCaption }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { getStorage, uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { ResizedImage, resizeImage } from '~~/utils/image';
import { getExt } from '~/utils/file';
import { useFirebase } from '~~/composables/firebase/useFirebase';
import { FirebaseApp } from 'firebase/app';

type Props = {
  onChange?: (file: string) => void;
  defaultImage?: string;
  isAutoUpload?: boolean;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    onChange: () => {},
    defaultImage: '',
    isAutoUpload: false,
  }
);

const { fb } = useFirebase();
const storage = getStorage(fb as FirebaseApp);
const dzRef = ref<HTMLDivElement>();
const file = ref<ResizedImage>();
const defaultImage = ref(props.defaultImage);
const isResizing = ref(false);
const isUploading = ref(false);
const isAutoUpload = computed(() => props.isAutoUpload);

const { files, open: openFileDialog } = useFileDialog({
  multiple: false,
});

const dropCaption = computed(() => {
  if (isOverDropZone.value) return '画像ファイルをアップロードできます';
  if (isResizing.value) return '画像をリサイズしています';
  return '画像ファイルをドロップしてください';
});

const onDrop = async (files: File[] | null) => {
  if (!files) return;

  try {
    isResizing.value = true;
    const originalFile = files[0];

    const resizedImage = await resizeImage(originalFile, {
      width: 1800,
      height: 1800,
    });

    if (!resizedImage) return;

    file.value = resizedImage;
  } catch (e) {
    console.error(e);
  }

  isResizing.value = false;

  if (isAutoUpload) await uploadImage();
}

const { isOverDropZone } = useDropZone(dzRef, onDrop);

const uploadImage = async () => {
  if (!file.value) return;

  const ext = getExt(file.value.file);
  if (!ext) return;

  try {
    isUploading.value = true;
    const now = dayjs();

    const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`;
    const uploadHandler = storageRef(storage, filename);

    await uploadBytes(uploadHandler, file.value.file);
    const url = await getDownloadURL(uploadHandler);

    file.value = undefined;
    props.onChange(url);
  } catch (e) {
    console.error(e);
  }

  isUploading.value = false;
};

watch(files, () => {
  if (!files.value) return;
  onDrop([files.value[0]]);
});

const removeImage = () => {
  file.value = undefined;
};

const removeDefaultImage = () => {
  defaultImage.value = '';
}

</script>
<style lang="scss" scoped>
.uploader {
  // padding: 15px;
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
          cursor: pointer;

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
    // display: flex;

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
        margin: 0;
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

      >.filedata {
        >dt {
          font-size: 0.7rem;
        }

        >dd {
          margin-bottom: 5px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

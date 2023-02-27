<template>
  <BlockModal v-if="show" :on-close="props.onClose">
    <div class="uploader">
      <div class="inner">
        <div v-show="file?.url" class="preview columns">
          <div class="image column c60">
            <img :src="file?.url" />
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
              <p>ファイルサイズ：{{ file?.file.size }}</p>
              <p>ファイルタイプ：{{ file?.file.type }}</p>
              <p>ファイル名：{{ file?.file.name }}</p>
            </div>
          </div>
        </div>
        <div v-show="!file?.url" class="drop" :class="{ 'is-over': isOverDropZone }">
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
import { getStorage, uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { Editor } from '@tiptap/vue-3';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { ResizedImage, resizeImage } from '~~/utils/image';
import { getExt } from '~/utils/file';
import { useFirebase } from '~~/composables/firebase/useFirebase';

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

const { fb } = useFirebase();
const storage = getStorage(fb);
const dzRef = ref<HTMLDivElement>();
const file = ref<ResizedImage>();

const { files, open: openFileDialog } = useFileDialog();

const onDrop = async (files: File[] | null) => {
  if (!files) return;

  const originalFile = files[0];

  const resizedImage = await resizeImage(originalFile, {
    width: 1800,
    height: 1800,
  });

  if (!resizedImage) return;

  file.value = resizedImage;
}

const { isOverDropZone } = useDropZone(dzRef, onDrop);

const uploadImage = async () => {
  if (!props.editor || !file.value) return;
  console.log('file.value', file.value);

  const ext = getExt(file.value.file);
  if (!ext) return;

  const now = dayjs();

  const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`
  const uploadHandler = storageRef(storage, filename)

  await uploadBytes(uploadHandler, file.value.file);
  const url = await getDownloadURL(uploadHandler);

  props.editor.chain().focus().setImage({ src: url }).run();

  props.onClose();
};

const removeImage = () => {
  file.value = undefined;
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

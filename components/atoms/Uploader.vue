<template>
  <section class="uploader">
    <b-field>
      <div v-if="previewImage">
        <div>
          <span @click="removeImage">x</span>
          <img :src="previewImage" />
        </div>
      </div>
      <b-upload v-model="image"
        drag-drop
        @input="upload">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-large">
              </b-icon>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <!-- <div class="tags">
      <span v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary" >
        {{file.name}}
        <button class="delete is-small"
          type="button"
          @click="deleteDropFile(index)">
        </button>
      </span>
    </div> -->
  </section>
</template>

<script>

import uploader from '~/plugins/uploader'

export default {
  data() {
    return {
      image: {},
      previewImage: ''
    }
  },
  methods: {
    upload() {
      const reader = new FileReader()
      reader.readAsDataURL(this.image)
      reader.addEventListener(
        'load',
        () => {
          this.previewImage = reader.result
        },
        false
      )
      uploader(this.image)
    },
    removeImage() {
      this.image = {}
      this.previewImage = null
    },
  }
}
</script>

<style lang="scss" scoped>

.uploader {
  padding-bottom: 150px;
}

</style>
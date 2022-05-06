<template>
  <span v-if="!!image" class="image" :style="bgImage" />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    image: {
      type: String,
      default: '',
    },
  },
  computed: {
    bgImage() {
      return `background-image:url(${this.image})`
    },
  },
})
</script>
<style lang="scss" scoped>
.image {
  width: 110px;
  height: 110px;
  border-radius: 999999px;
  display: block;
  margin: auto;
  border: 1px solid $gray-black;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  @include until-desktop {
    flex-direction: row;
    padding: $gap / 2 0 0;
    width: 100%;
    height: 90px;
    border-radius: 0;
    border: none;
    margin: 0;
  }
}
</style>

<template>
  <div class="wysiwyg is-article" v-html="content"></div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    content: {
      default: '',
      type: String,
    },
  },
})
</script>

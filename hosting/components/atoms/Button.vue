<template>
  <span>
    <button
      v-if="isLoading"
      disabled
      class="button expanded centered is-oneline no-border"
    >
      <IconLoading size="medium" color="black" />
    </button>
    <button v-else class="button expanded centered" @click="onClick">
      <slot />
    </button>
  </span>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
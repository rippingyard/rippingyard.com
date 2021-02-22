<template>
  <section class="modal">
    <div v-if="isOpen" class="container">
      <div class="block container">
        <p>いま、</p>
        <p>ここで、</p>
        <p>何かしました</p>
      </div>
    </div>
    <button class="button" @click="toggle()">投稿</button>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>
<style lang="scss" scoped>
.modal {
  z-index: 999999;
  position: static;
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $green;
    font-size: 4rem;
    font-weight: 800;
  }
  .button {
    position: relative;
    display: none;
  }
}
</style>

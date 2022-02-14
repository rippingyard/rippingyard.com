<template>
  <main>
    <Header />
    <div class="block">
      <div class="heading">
        <h1 class="title">{{ message }}</h1>
      </div>
      <div class="wysiwyg">
        <p>エラーが発生しました。</p>
        <p><NuxtLink class="button" to="/">トップに戻る</NuxtLink></p>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || 'エラーが発生しました'
    },
  },
  head() {
    return {
      title: this.message,
    }
  },
})
</script>

<style lang="scss">
.heading {
  margin-bottom: $gap;
  h1 {
    font-size: 3rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }
}
</style>

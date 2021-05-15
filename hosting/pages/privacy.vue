<template>
  <article class="block container">
    <Header :post="entity" />
    <div class="heading">
      <h1>{{ title }}</h1>
      <LastUpdate date="2021年5月14日" />
    </div>
    <PrivacyPolicy />
  </article>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'プライバシーポリシー',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: 'ripping yardのプライバシーポリシーです。',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'ripping yardのプライバシーポリシーです。',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'ripping yardのプライバシーポリシーです。',
        },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap * 1.5;
  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }
}
</style>

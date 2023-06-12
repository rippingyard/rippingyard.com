<template>
  <BlockMain>
    <!-- <Header /> -->
    <BlockHeading>
      <AtomTitle>{{ title }}</AtomTitle>
      <BlockLastUpdate date="2021年5月14日" />
    </BlockHeading>
    <StaticPrivacyPolicy />
  </BlockMain>
</template>
<script lang="ts" setup>
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

const title = ref('プライバシーポリシー');

useHtmlHeader({
  title: () => title.value,
});
// import Vue from 'vue'
// export default Vue.extend({
//   props: {
//     title: {
//       type: String,
//       default: 'プライバシーポリシー',
//     }
//   },
//   head() {
//     return {
//       title: this.title,
//       meta: [
//         {
//           hid: 'og:title',
//           property: 'og:title',
//           content: this.title,
//         },
//         {
//           hid: 'twitter:title',
//           name: 'twitter:title',
//           content: this.title,
//         },
//         {
//           hid: 'description',
//           name: 'description',
//           content: 'ripping yardのプライバシーポリシーです。',
//         },
//         {
//           hid: 'og:description',
//           property: 'og:description',
//           content: 'ripping yardのプライバシーポリシーです。',
//         },
//         {
//           hid: 'twitter:description',
//           name: 'twitter:description',
//           content: 'ripping yardのプライバシーポリシーです。',
//         },
//       ],
//     }
//   },
// })
</script>
<style lang="scss" scoped>
// .heading {
//   margin-bottom: $gap * 1.5;

//   h1 {
//     font-size: 2.2rem;
//     line-height: 1.4;
//     font-weight: 800;
//     padding-top: 3rem;
//   }
// }
</style>

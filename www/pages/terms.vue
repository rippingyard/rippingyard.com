﻿<template>
  <BlockMain>
    <BlockHeading>
      <h1>{{ title }}</h1>
      <BlockLastUpdate date="2021年5月14日" />
    </BlockHeading>
    <StaticTerms />
  </BlockMain>
</template>
<script lang="ts" setup>
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

const title = ref('利用規約');

useHtmlHeader({
  title: () => title.value,
});

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
//           content: 'ripping yardの利用規約です。',
//         },
//         {
//           hid: 'og:description',
//           property: 'og:description',
//           content: 'ripping yardの利用規約です。',
//         },
//         {
//           hid: 'twitter:description',
//           name: 'twitter:description',
//           content: 'ripping yardの利用規約です。',
//         },
//       ],
//     }
//   },
// })
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

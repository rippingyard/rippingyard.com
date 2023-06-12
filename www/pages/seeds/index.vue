<template>
  <section class="frame">
    <BlockHeading>
      <AtomTitle>SEEDS<small>古い記事</small></AtomTitle>
    </BlockHeading>
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ul>
        <li v-for="seed in seeds" :key="seed.id">
          <nuxt-link :to="permalink(seed)">
            <h2>{{ seed.title }}</h2>
            <p class="summary">{{ summary(seed) }}</p>
          </nuxt-link>
        </li>
      </ul>
    </BlockLoading>
  </section>
</template>
<script lang="ts" setup>
import { useSeeds } from '~~/composables/fetch/useSeeds';
import { getSummary } from '~/utils/typography';
import { Seed } from '~~/schemas/seed';

const { data: seeds, isLoading, isError, error } = useSeeds();

//   computed: {
//     mainContent() {
//       return filterContent(this.getTitle + this.post.content)
//     },
//     getName() {
//       switch (this.post.user) {
//         case 37:
//           return 'labofromjmq'

//         case 24:
//           return 'compuedit'

//         case 4:
//           return 'joynesan'

//         case 3:
//           return 'komugi'

//         case 2:
//           return 'mcatm'

//         default:
//           return 'ripping yard'
//       }
//     },
//   },

const permalink = (seed: Seed) => `/seeds/${seed.slug}`;
const summary = (seed: Seed) => getSummary(seed.body, 320);

//   },
//   head: () => {
//     return {
//       title: 'Seeds',
//     }
//   },
// }
</script>
<style lang="scss" scoped>
ul {
  >li {
    // border-top: 1px dashed $black;

    >a {
      padding: $gap 0;
      line-height: 1.3;
      display: block;
      overflow: hidden;

      >h2 {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 18px;
      }

      >.summary {
        font-size: 0.9rem;
        line-height: 1.6;
      }
    }

    @include until($desktop) {
      padding: 0 $gap * 0.5;
    }
  }
}
</style>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <nuxt-link :to="post.permalink">
        <h3 class="title">{{ getTitle(post.content) }}</h3>
        <p class="date">{{ post.publishedAt }}</p>
        <p class="summary">{{ getSummary(post.content) }}</p>
      </nuxt-link>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  getTitle,
  // getSocialTitle,
  getSummary,
  // removeTitle,
  // getThumbnail,
  // decodeEntities,
} from '~/plugins/typography'
export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getTitle(content: string): string {
      return getTitle(content)
    },
    getSummary(content: string): string {
      return getSummary(content)
    },
  }
})
</script>
<style lang="scss" scoped>
ul {
  li {
    border-bottom: 1px solid $gray-black;
    > a,
    > span {
      display: block;
      padding: $gap - 5px 0 $gap 0;
      .title {
        font-size: 1.9rem;
        // margin-bottom: 12px;
        font-weight: 800;
        line-height: 1.4;
        // padding-right: $gap;

        @include mobile {
          line-height: 1.3;
          padding-right: 0;
        }
      }
      .date {
        font-size: 0.9rem;
        color: $gray-black;
      }
      .summary {
        padding-top: 6px;
        font-size: 0.9rem;
      }
      &:hover {
        background-color: rgba($color: $yellow, $alpha: 0.1) ;
        .title,
        .date,
        .summary {
          color: $yellow;
        }
      }
    }
  }
}
</style>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <div class="body">
        <h3 class="title"><nuxt-link :to="post.permalink">{{ getTitle(post.content) }}</nuxt-link></h3>
        <p class="date">{{ post.publishedAt }}</p>
        <p class="summary">{{ getSummary(post.content) }}</p>
      </div>
      <div class="user">
        <UserTip :user="post.owner" />
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  getTitle,
  getSummary,
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
    display: flex;
    border-bottom: 1px solid $gray-black;

    @include mobile {
      flex-direction: column;
    }

    .body {
      display: block;
      width: calc(100% - 180px);
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
      @include mobile {
        width: 100%;
        padding-bottom: $gap - 5px;
      }
    }
    .user {
      width: 180px;
      padding: 20px 0;
      @include mobile {
        width: 100%;
        padding-top: 0;
      }
    }
  }
}
</style>

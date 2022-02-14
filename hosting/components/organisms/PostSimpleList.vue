<template>
  <ul
    class="list"
    :class="{ 'has-margin': hasMargin, 'is-small': isSmall, 'is-dark': isDark }"
  >
    <li v-for="post in posts" :key="post.id" class="item">
      <div class="body">
        <h3 class="title">
          <nuxt-link :to="post.permalink">
            {{ getTitle(post.content) }}
          </nuxt-link>
        </h3>
        <p class="date">{{ post.publishedAt }}</p>
        <p class="summary">{{ getSummary(post.content) }}</p>
        <div v-if="post.entities.length > 0" class="entities">
          <EntitySimpleList :entities="post.entities" />
        </div>
      </div>
      <div class="user">
        <UserTip :user="post.owner" :is-dark="isDark" />
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { permalink as entityLink } from '~/services/entity'
import { getTitle, getSummary } from '~/plugins/typography'
export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    hasMargin: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getTitle(content: string): string {
      return getTitle(content)
    },
    getSummary(content: string): string {
      return getSummary(content)
    },
    getEntityLink(entity: string): string {
      return entityLink(entity)
    },
  },
})
</script>
<style lang="scss" scoped>
.list {
  > li {
    display: flex;
    border-bottom: 1px solid $gray-black;

    @include mobile {
      flex-direction: column;
      border-bottom: none;
    }

    .body {
      display: block;
      width: calc(100% - 180px);
      padding: $gap - 5px 0 $gap 0;

      @include mobile {
        width: 100%;
        padding: $gap / 2 $gap / 2 0;
      }

      .title {
        font-size: 1.9rem;
        font-weight: 800;
        line-height: 1.4;

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
    }
    .user {
      width: 180px;
      padding: 20px 0;
      @include mobile {
        width: 100%;
        padding: 0 $gap / 2 $gap / 2;
      }
    }
    .entities {
      padding-top: 10px;
    }
  }
  &.has-margin {
    > li {
      padding-left: $gap;
      padding-right: $gap;
    }
    &.is-small {
      > li {
        padding: 0 $gap / 2;
      }
    }
  }
  &.is-small {
    > li {
      .body {
        padding: $gap / 2 0;
      }
      .title {
        font-size: 1.4rem;
      }
      .summary {
        font-size: 0.8rem;
      }
      .date {
        font-size: 0.8rem;
      }
    }
  }
  &.is-dark {
    > li {
      border-bottom: 1px solid $black;
      .date {
        color: $black;
      }
    }
  }
}
</style>

<template>
  <ul
    class="list"
    :class="{ 'has-margin': hasMargin, 'is-small': isSmall, 'is-dark': isDark }"
  >
    <li v-for="post in posts" :key="post.id" class="item">
      <div class="extra pconly">
        <template v-if="hasThumbnail(post)">
          <nuxt-link :to="post.permalink">
            <IconImage :image="thumbnail(post)" />
          </nuxt-link>
        </template>
        <UserTip v-else :user="post.owner" :is-dark="isDark" />
      </div>
      <div class="body">
        <h3 class="title">
          <nuxt-link :to="post.permalink">
            {{ getTitle(post) }}
          </nuxt-link>
        </h3>
        <p class="date">{{ post.publishedAt }}</p>
        <nuxt-link
          v-if="hasThumbnail(post)"
          :to="post.permalink"
          class="image sponly"
        >
          <IconImage :image="thumbnail(post)" />
        </nuxt-link>
        <p class="summary">{{ getSummary(post.content) }}</p>
        <div v-if="post.entities && post.entities.length > 0" class="entities">
          <EntitySimpleList :entities="post.entities" />
        </div>
        <div class="author sponly">
          <UserTip :user="post.owner" :is-dark="isDark" />
        </div>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { permalink as entityLink } from '~/services/entity'
import { getTitle, getSummary } from '~/plugins/typography'
import { Post } from '~/types/post'
import { getThumbnail, hasThumbnail } from '~/services/post'

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
    getTitle(post: Post): string {
      return getTitle(post)
    },
    getSummary(content: string): string {
      return getSummary(content)
    },
    getEntityLink(entity: string): string {
      return entityLink(entity)
    },
    hasThumbnail(post: Post): boolean {
      return hasThumbnail(post)
    },
    thumbnail(post: Post): string {
      return getThumbnail(post)
    },
  },
})
</script>
<style lang="scss" scoped>
.list {
  > li {
    display: flex;
    border-bottom: 1px solid $gray-black;

    .body {
      display: block;
      width: calc(100% - 180px);
      padding: $gap - 5px 0 $gap 0;

      .title {
        font-size: 1.9rem;
        font-weight: 800;
        line-height: 1.4;
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
    .extra {
      width: 180px;
      padding: $gap - 5px 0;
    }
    .entities {
      padding-top: 10px;
    }

    @include until-desktop {
      padding: 0 $gap / 2;
      margin-bottom: $gap;
      flex-direction: column-reverse;
      border-bottom: none;

      .body {
        padding: $gap/2 0 0;
        width: 100%;
        .title {
          font-size: 1.4rem;
          line-height: 1.3;
          padding-right: 0;
        }
        .date {
          font-size: 0.9rem;
          color: $gray-black;
          margin-bottom: 10px;
        }
        .image {
          margin-bottom: 12px;
        }
      }
      .extra {
        width: 100%;
        padding: $gap/2 0;
      }
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
      @include until-desktop {
        padding: 0 $gap / 2;
        .body {
          padding: $gap/2 0 0;
          width: 100%;
          .title {
            font-size: 1.4rem;
            line-height: 1.3;
            padding-right: 0;
          }
        }
        .user {
          width: 100%;
          padding: 0 0 $gap / 2;
        }
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

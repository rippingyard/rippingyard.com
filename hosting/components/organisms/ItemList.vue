<template>
  <ul
    class="list"
    :class="{ 'has-margin': hasMargin, 'is-small': isSmall, 'is-dark': isDark }"
  >
    <li v-for="item in items" :key="item.id" class="item">
      <div class="body">
        <h3 class="title">
          <nuxt-link :to="permalink(item)">
            {{ getTitle(item) }}
          </nuxt-link>
        </h3>
        <p class="date">{{ item.createdAt }}</p>
        <!-- <p class="summary">{{ getSummary(post.content) }}</p> -->
        <!-- <div v-if="post.entities && post.entities.length > 0" class="entities">
          <EntitySimpleList :entities="post.entities" />
        </div> -->
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { permalink as entityLink } from '~/services/entity'
import { getSummary, getI18nName } from '~/plugins/typography'
import { Item } from '~/types/item'
import { permalink } from '~/services/item'

export default Vue.extend({
  props: {
    items: {
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
    getTitle(item: Item): string {
      if (!item.name) return ''
      return getI18nName(item.name)
    },
    getSummary(content: string): string {
      return getSummary(content)
    },
    getEntityLink(entity: string): string {
      return entityLink(entity)
    },
    permalink(item: Item) {
      return permalink(item.id)
    },
  },
})
</script>
<style lang="scss" scoped>
.list {
  > li {
    display: flex;
    border-bottom: 1px solid $gray-black;

    @include until-desktop {
      flex-direction: column;
      border-bottom: none;
    }

    .body {
      display: block;
      // width: calc(100% - 180px);
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
    .user {
      width: 180px;
      padding: 20px 0;
    }
    .entities {
      padding-top: 10px;
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

<template>
  <div class="card">
    <!-- <nuxt-link
        v-if="user.avatar"
        :to="permalink"
        class="avatar"
        :style="avatar"
      /> -->
    <h2 class="name">
      <a v-if="isBookmark" :href="item.url" target="_blank">{{ name() }}</a>
      <nuxt-link v-else :to="permalink">{{ name() }}</nuxt-link>
    </h2>
    <p class="type">
      <span>{{ item.type }}</span>
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getI18nName } from '~/plugins/typography'
import { Item } from '~/types/item'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: (): Partial<Item> => {
        return {
          name: {
            ja: '',
          },
        }
      },
    },
  },
  computed: {
    permalink(): string {
      return `/item/${(this.item as Partial<Item>).id}`
    },
    isBookmark(): boolean {
      return this.item.type === 'bookmark' && this.item.url
    },
    thumbnailImage(): string {
      return `background-image:url(${
        (this.item as Partial<Item>).thumbnailImage
      })`
    },
  },
  methods: {
    name(): string {
      return getI18nName(this.item.name)
    },
    enName(): string {
      return getI18nName(this.item.name, 'en')
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid $gray;
  // background: $black;
  padding: $gap / 2;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 999999px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 2px solid $yellow;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 800;
    // padding: $gap / 2;
    // border-bottom: 1px dashed $yellow;
  }

  .type {
    > span {
      font-size: 0.8rem;
      font-weight: 800;
      padding: 3px;
      background-color: $black;
      color: $white;
    }
  }

  // .profile {
  //   padding: ($gap/2) ($gap/2) 6px;
  //   /deep/ p {
  //     margin-bottom: 10px;
  //     font-size: 0.9rem;
  //   }
  // }

  @include mobile {
    padding: 4px;
    border: 2px solid $yellow;

    .name {
      padding: $gap / 2;
    }
    // .profile {
    //   padding: ($gap / 2) ($gap / 2) 0;
    //   /deep/ p {
    //     margin-bottom: $gap / 2;
    //   }
    // }
  }
}
</style>

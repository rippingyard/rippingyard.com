<template>
  <div class="card" :class="{ 'no-border': editable }">
    <EmbedCard v-if="isBookmark" :content="item.metadata" />
    <div v-else class="inner">
      <ul v-if="editable" class="types">
        <li
          v-for="type of itemTypes"
          :key="type.key"
          :class="{
            selected: type.key === item.type,
            unset: type.key === 'unknown',
          }"
          @click="setType(type.key)"
        >
          {{ type.label }}
        </li>
      </ul>
      <ul v-else class="types">
        <li class="selected">
          {{ typeLabel }}
        </li>
      </ul>
      <h2 class="name">
        {{ name() }}
      </h2>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getI18nName } from '~/plugins/typography'
import { Item } from '~/types/item'
import { itemTypes } from '~/services/item'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: (): Partial<Item> => {
        return {
          name: {
            ja: '',
          },
          type: 'unknown',
        }
      },
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    itemTypes(): {
      key: string
      label: string
    }[] {
      return itemTypes
    },
    typeLabel(): string {
      const type = this.itemTypes.find(t => t.key === this.item?.type)
      return type ? type.label : '未設定'
    },
    permalink(): string {
      return `/item/${(this.item as Partial<Item>).id}`
    },
    isBookmark(): boolean {
      return this.item?.type === 'bookmark' && this.item?.path
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
    setType(type: string): void {
      this.item.type = type
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid $gray-black;
  // background: $black;
  // padding: $gap / 2;

  &.no-border {
    border: none;
  }

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

  .inner {
    .name {
      font-size: 1.2rem;
      font-weight: 800;
      padding: $gap / 3;
      // border-bottom: 1px dashed $yellow;
    }

    .types {
      > li {
        display: inline-block;
        background-color: transparent;
        color: $black;
        font-size: 0.8rem;
        padding: 3px 8px;
        border-bottom: 1px solid $black;
        border-right: 1px solid $black;
        cursor: pointer;
        &.label {
          cursor: default;
        }
        &:hover {
          background-color: $gray;
        }
        &.selected {
          background-color: $black;
          color: $yellow;
          &.unset {
            color: $gray-black;
          }
        }
      }
    }
  }

  @include mobile {
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

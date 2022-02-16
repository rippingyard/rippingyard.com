<template>
  <div class="card" :class="{ 'no-border': editable }">
    <EmbedCard
      v-if="isBookmark"
      :content="item.metadata"
      :entities="item.entities || []"
    />
    <div v-else class="inner">
      <ul v-if="editable && !item.id" class="types is-selectable">
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
        <li
          v-for="category of filteredEntities"
          :key="`category-${category.id}`"
          class="category"
        >
          {{ category.label }}
        </li>
      </ul>
      <h2 class="name">{{ name }}</h2>
    </div>
    <ul v-if="editable && !item.id" class="categories is-selectable">
      <li
        v-for="category of categories"
        :key="`category-${category.id}`"
        :class="{
          selected: item.entities.includes(category.id),
        }"
        @click="toggleCategory(category.id)"
      >
        {{ category.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getI18nName } from '~/plugins/typography'
import { Item } from '~/types/item'
import { Category } from '~/types/category'
import { itemTypes } from '~/services/item'
import { categories } from '~/services/category'

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
          entities: [],
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
      return itemTypes.filter(t => t.key !== 'bookmark')
    },
    categories(): Category[] {
      return categories
    },
    filteredEntities(): Category[] {
      return categories.filter(c =>
        this.item.entities.find((e: string) => e === c.id)
      )
    },
    typeLabel(): string {
      const type = this.itemTypes.find(t => t.key === this.item?.type)
      return type ? type.label : '未設定'
    },
    name(): string {
      return getI18nName(this.item.name)
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
    enName(): string {
      return getI18nName(this.item.name, 'en')
    },
    setType(type: string): void {
      this.item.type = type
    },
    toggleCategory(id: string): void {
      if (this.item.entities.includes(id)) {
        this.item.entities = this.item.entities.filter((e: string) => e !== id)
      } else {
        this.item.entities.push(id)
      }
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

  // .avatar {
  //   width: 80px;
  //   height: 80px;
  //   border-radius: 999999px;
  //   position: absolute;
  //   top: 10px;
  //   right: 10px;
  //   border: 2px solid $yellow;
  //   background-position: 50% 50%;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  // }

  .inner {
    .name {
      font-size: 1.2rem;
      font-weight: 800;
      padding: $gap / 4 $gap / 3 $gap / 3;
      // border-bottom: 1px dashed $yellow;
    }

    .types {
      > li {
        display: inline-block;
        background-color: $black;
        color: $white;
        font-size: 0.8rem;
        line-height: 1.9;
        padding: 3px 8px;
        border-bottom: 1px solid $black;
        border-right: 1px solid $black;
        &.category {
          border: none;
          background: transparent;
          color: $black;
          text-transform: uppercase;
          padding-right: 0;
        }
      }
      &.is-selectable {
        > li {
          background-color: transparent;
          color: $black;
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
  }

  .categories {
    padding: 0 $gap / 3;
    > li {
      display: inline-block;
      background-color: transparent;
      font-size: 0.8rem;
      color: $black;
      line-height: 1.9;
      padding: 0 8px 3px 0;
    }
    &.is-selectable {
      padding: 0;
      > li {
        opacity: 0.6;
        padding: 3px 8px;
        border-top: 1px solid $black;
        border-right: 1px solid $black;
        cursor: pointer;
        &.label {
          cursor: default;
        }
        &:hover {
          opacity: 1;
        }
        &.selected {
          background-color: $black;
          color: $yellow;
          opacity: 1;
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

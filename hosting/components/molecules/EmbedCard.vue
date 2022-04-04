<template>
  <section v-if="content">
    <a v-if="content.url" :href="content.url" class="embed" target="_blank">
      <p v-if="content.image" class="img">
        <img :src="content.image" />
      </p>
      <div class="content">
        <p class="sitename">{{ content.site }}</p>
        <h1 class="title">{{ content.title }}</h1>
        <p class="url">{{ content.url }}</p>
        <p
          class="description"
          v-html="nl2br(getSummary(content.description))"
        />
        <ul v-if="entities.length > 0" class="types">
          <li
            v-for="category of filteredEntities"
            :key="`category-${category.id}`"
          >
            {{ category.label }}
          </li>
        </ul>
      </div>
    </a>
    <div v-if="content.error">エラーが発生しました：{{ content.error }}</div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { nl2br, getSummary } from '~/plugins/typography'
import { categories } from '~/services/category'
import { Category } from '~/types/category'

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    entities: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredEntities(): Category[] {
      return categories.filter(c =>
        (this as any).entities.find((e: string) => e === c.id)
      )
    },
  },
  methods: {
    getSummary(str: string): string {
      return getSummary(str)
    },
    nl2br(str: string): string {
      return nl2br(str)
    },
  },
})
</script>
<style lang="scss" scoped>
.embed {
  display: flex;
  // border: 1px solid $black;
  padding: 12px;
  overflow: hidden;
  .content {
    flex-grow: 1;
  }
  .sitename {
    font-size: 0.8rem;
  }
  .title {
    font-size: 1rem;
    font-weight: 800;
    overflow-wrap: anywhere;
  }
  .url {
    font-size: 0.8rem;
    line-height: 1;
    max-height: 1em;
    color: $gray-black;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 8px 0;
  }
  .img {
    flex-shrink: 0;
    width: 140px;
    padding-right: 15px;
    // height: 60px;
    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .description {
    font-size: 0.8rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  .types {
    > li {
      display: inline-block;
      background: transparent;
      color: $black;
      font-size: 0.8rem;
      line-height: 1.9;
      padding: 3px 8px 3px 0;
    }
  }
}
</style>
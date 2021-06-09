<template>
  <ul>
    <li v-for="entity in entities" :key="entity"><nuxt-link :to="permalink(entity)"><fa-icon icon="tag" />{{ decodeEntity(entity) }}</nuxt-link></li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { encodeEntity, decodeEntity } from '~/services/entity'
export default Vue.extend({
  props: {
    entities: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    permalink(entity: string): string {
      return `/entity/${encodeEntity(entity)}`
    },
    decodeEntity(entity: string): string {
      return decodeEntity(entity)
    },
    encodeEntity(entity: string): string {
      return encodeEntity(entity)
    }
  }
})
</script>
<style lang="scss" scoped>
ul {
  li {
    display: inline-block;
    margin-right: 10px;
    line-height: 1;
    a {
      display: block;
      padding: 8px 10px;
      border: 1px solid $gray-black;
      border-radius: 18px;
      &:hover {
        border-color: $black;
        background: $yellow;
      }
    }
    .fa-tag {
      margin-right: 5px;
      font-size: 0.8rem;
    }
  }
}
</style>

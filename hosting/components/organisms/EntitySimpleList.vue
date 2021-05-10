<template>
  <ul>
    <li v-for="entity in entities" :key="entity"><nuxt-link :to="permalink(entity)">{{ decodeEntity(entity) }}</nuxt-link></li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { decodeEntity } from '~/services/entity'
export default Vue.extend({
  props: {
    entities: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    permalink(entity: string): string {
      return `/entity/${entity}`
    },
    decodeEntity(entity: string): string {
      return decodeEntity(entity)
    }
  }
})
</script>

<template>
  <ul :class="{ 'is-simple': isSimple, 'is-dark': isDark }">
    <li v-for="entity in entities" :key="entity">
      <nuxt-link :to="permalink(entity)" :target="window">
        <fa-icon icon="tag" />{{ decodeEntity(entity) }}
      </nuxt-link>
    </li>
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
    isSimple: {
      type: Boolean,
      default: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    window() {
      return this.isExternal ? '_blank' : '_self'
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
    },
  },
})
</script>
<style lang="scss" scoped>
ul {
  li {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
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
    @include until-desktop {
      a {
        border: none;
        padding: 0;
        color: $gray-black;
      }
    }
  }

  &.is-simple {
    li {
      font-size: 0.8rem;
      margin-right: 8px;
      a {
        padding: 0;
        border: none;
        color: $blue;
        &:hover {
          background: none;
          text-decoration: underline;
        }
      }
      .fa-tag {
        margin-right: 2px;
        font-size: 0.8rem;
      }
    }
  }

  &.is-dark {
    li {
      a {
        border: 1px solid $black;
      }
    }
  }
}
</style>

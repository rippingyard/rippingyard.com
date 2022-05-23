<template>
  <ul v-if="links.length > 0" class="links">
    <li v-for="(link, index) of links" :key="`header-link-${index}`">
      <nuxt-link :to="link.to">
        {{ link.label }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
<style lang="scss" scoped>
.links {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin-top: 1px;
  border-top: 1px solid $black;
  border-bottom: 2px solid $black;
  > li {
    position: relative;
    padding: 0 32px 0 0;
    // font-weight: 800;
    font-size: 0.8rem;
    > a {
      display: block;
      padding: 8px 0;
      &:hover {
        color: $orange;
      }
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      transform: rotate(45deg);
      width: 1px;
      height: 16px;
      background-color: $black;
      top: 10px;
      right: 16px;
    }
    &:last-child {
      &::before {
        display: none;
      }
    }
  }
}

@include until($desktop) {
  .links {
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>

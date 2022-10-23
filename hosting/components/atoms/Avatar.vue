<template>
  <nuxt-link
    v-if="avatar"
    :to="to"
    class="avatar"
    :class="[size, domtype]"
    :style="avatar"
  />
  <div v-else class="initial">
    <nuxt-link :to="permalink">{{ initial }}</nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/user'
export default Vue.extend({
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    to: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
    },
    domtype: {
      type: String,
      default: 'block',
    },
  },
  computed: {
    avatar() {
      return `background-image:url(${(this.user as Partial<User>)?.avatar})`
    },
  },
})
</script>
<style lang="scss" scoped>
.avatar {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 999999px;
  // border: 2px solid $yellow;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  &.small {
    width: 40px;
    height: 40px;
  }

  &.xs {
    width: 24px;
    height: 24px;
  }

  &.inline-block {
    display: inline-block;
  }
}

.initial {
  width: 60px;
  height: 60px;
  border-radius: 999999px;
  display: flex;
  margin: auto;
  border: 2px solid $black;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  > a {
    font-size: 1.4rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  &:hover {
    color: $blue;
    border-color: $blue;
  }
}
</style>
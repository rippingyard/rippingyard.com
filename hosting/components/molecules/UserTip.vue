<template>
  <div class="card" :class="{ 'is-dark': isDark }">
    <nuxt-link
      v-if="user.avatar"
      :to="permalink"
      class="avatar"
      :style="avatar"
    />
    <h2 class="name">
      <nuxt-link :to="permalink">{{ user.displayName }}</nuxt-link>
      <nuxt-link :to="permalink" class="account">
        @{{ user.userName }}
      </nuxt-link>
    </h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/user'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userName: '',
          displayName: '',
          profile: '',
          avatar: '',
        }
      },
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    permalink() {
      return `/people/${(this.user as Partial<User>).userName}`
    },
    avatar() {
      return `background-image:url(${(this.user as Partial<User>).avatar})`
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  // padding: 8px;
  color: $black;
  position: relative;

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 999999px;
    display: block;
    margin: auto;
    border: 1px solid $gray-black;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    font-size: 1rem;
    font-weight: 800;
    text-align: center;
    > a {
      display: block;
      &.account {
        color: $gray-black;
        font-size: 0.9rem;
      }
    }
  }

  @include mobile {
    flex-direction: row;
    padding: $gap / 2 0 0;
    .name {
      padding: $gap / 2;
      width: calc(100% - 50px);
      text-align: left;
      padding-top: 0;
    }
  }

  &.is-dark {
    .avatar {
      border: 1px solid $black;
    }
    .name {
      > a {
        &.account {
          color: $black;
        }
      }
    }
  }
}
</style>

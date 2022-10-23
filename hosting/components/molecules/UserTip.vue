<template>
  <div class="card" :class="{ 'is-dark': isDark }">
    <Avatar :to="permalink" :user="user" size="small" />
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
    initial() {
      return this.user.displayName.charAt(0)
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
    margin-top: 5px;
    > a {
      display: block;
      &.account {
        color: $gray-black;
        font-size: 0.9rem;
        line-height: 1;
      }
    }
  }

  @include until-desktop {
    flex-direction: row;
    padding: $gap / 2 0 0;
    .avatar {
      width: 30px;
      height: 30px;
      margin: 4px 0 0 0;
    }
    .name {
      padding: 0 0 0 10px;
      width: calc(100% - 50px);
      text-align: left;
      line-height: 1.2;
    }
    .initial {
      width: 30px;
      height: 30px;
      margin: 4px 0 0 0;
      > a {
        font-size: 0.9rem;
      }
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

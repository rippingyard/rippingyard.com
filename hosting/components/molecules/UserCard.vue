<template>
  <div class="card">
    <div class="card-inner">
      <nuxt-link
        v-if="user.avator"
        :to="permalink"
        class="avator"
        :style="avator"
      />
      <h2 class="name">
        <nuxt-link :to="permalink">{{ user.displayName }}</nuxt-link>
      </h2>
      <div class="profile" v-html="user.profile"></div>
    </div>
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
          avator: '',
        }
      },
    },
  },
  computed: {
    permalink() {
      return `/people/${(this.user as Partial<User>).userName}`
    },
    avator() {
      return `background-image:url(${(this.user as Partial<User>).avator})`
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  border: 3px solid $yellow;
  background: $black;
  padding: 8px;
  color: $yellow;

  .card-inner {
    border: 2px solid $yellow;
    position: relative;
  }

  .avator {
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

  .name {
    font-size: 1.1rem;
    font-weight: 800;
    padding: $gap / 2;
    border-bottom: 1px dashed $yellow;
  }

  .profile {
    padding: ($gap/2) ($gap/2) 6px;
    /deep/ p {
      margin-bottom: 10px;
      font-size: 0.9rem;
    }
  }

  @include mobile {
    padding: 4px;
    border: 2px solid $yellow;

    .name {
      padding: $gap / 2;
    }
    .profile {
      padding: ($gap / 2) ($gap / 2) 0;
      /deep/ p {
        margin-bottom: $gap / 2;
      }
    }
  }
}
</style>

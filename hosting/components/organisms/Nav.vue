<template>
  <nav class="nav" :class="{ open: isOpen }">
    <NavTrigger :click="toggleNav" />
    <div class="body" @click="closeNav">
      <ul class="links">
        <li><nuxt-link to="/">TOP</nuxt-link></li>
        <client-only><li v-if="isAutenticated"><nuxt-link to="/home/">HOME</nuxt-link></li></client-only>
        <client-only><li v-if="isAutenticated"><span @click="logout">LOGOUT</span></li></client-only>
        <client-only><li v-if="!isAutenticated">
          <nuxt-link to="/login/">LOGIN</nuxt-link>
        </li></client-only>
      </ul>
    </div>
    <div class="overlay" @click="closeNav"></div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
export default Vue.extend({
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isAutenticated(): boolean {
      return this.$isAuthenticated(this.$store)
    },
  },
  methods: {
    ...mapActions({
      signout: 'auth/logout',
    }),
    toggleNav() {
      this.isOpen = !this.isOpen
    },
    closeNav() {
      this.isOpen = false
    },
    logout() {
      this.signout()
      this.snack('ログアウトしました')
      this.$router.push('/')
    },
  },
})
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  background-color: $black;
  width: calc(100% - 55px);
  height: 100%;
  top: 0;
  right: calc(-100% + 60px);
  z-index: 99999;
  transition: all 200ms 0s ease-out;
  &.open {
    right: 0;
  }

  .body {
    padding: 50px 75px;
    position: relative;
    z-index: 100;
  }

  .overlay {
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    top: 0;
    left: -55px;
    z-index: 99;
    opacity: 0;
    background-color: $black;
  }

  @include mobile {
    right: calc(-100% + 55px);
    .body {
      padding: $gap / 2;
    }
  }
}

.links {
  li {
    font-size: 5rem;
    font-weight: 800;
    color: $white;
    line-height: 1;
    margin-bottom: 12px;
    a,
    span {
      &:hover {
        cursor: pointer;
        color: $orange;
      }
      &.is-current {
        color: $yellow;
      }
    }
  }
  @include mobile {
    li {
      font-size: 2.2rem;
    }
  }
}
</style>

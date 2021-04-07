<template>
  <button v-if="true === false" class="button" @click="follow(user.id)">
    フォローする
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { User } from '~/types/user'

export default Vue.extend({
  data(): {
    user: Partial<User>
  } {
    return {
      user: {},
    }
  },
  methods: {
    ...mapActions({
      follow: 'user/follow',
    }),
  },
})
</script>

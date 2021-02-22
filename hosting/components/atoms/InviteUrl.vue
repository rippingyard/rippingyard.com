<template>
  <div>
    <h2>招待URL</h2>
    <div class="url">{{ inviteUrl }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { getDomain, createToken } from '~/plugins/util'
import { User } from '~/types/user'
export default Vue.extend({
  data(): {
    me: Partial<User>
    url: string
    code: string
  } {
    return {
      me: {},
      url: '',
      code: '',
    }
  },
  computed: {
    inviteUrl() {
      this.buildUrl()
      return (this as any).url
    },
  },
  beforeMount() {
    this.me = this.$store.state.auth.me
  },
  methods: {
    ...mapActions({
      saveUser: 'user/save',
      setMe: 'auth/setMe',
    }),
    async buildUrl() {
      try {
        if (!this.me.code) {
          this.code = createToken(14)
          const user = Object.assign(this.me, {
            code: this.code,
          })
          await this.saveUser({
            user,
          })
          this.setMe(user)
        } else {
          this.code = this.me.code
        }
        this.url = `${getDomain()}/invite/${this.code}`
      } catch (e) {
        this.url = ''
      }
    },
  },
})
</script>

<template>
  <div>
    <button
      v-if="!isAuthenticatedByTwitter"
      class="button twitter"
      @click="linkTwitter"
    >
      <fa-icon :icon="['fab', 'twitter']" class="icon" />Twitterと連携
    </button>
    <button v-else class="button twitter" @click="unlinkTwitter">
      <fa-icon :icon="['fab', 'twitter']" class="icon" />Twitterの連携解除
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { isAuthenticatedByProvider } from '~/services/user'
export default Vue.extend({
  data() {
    return {
      isAuthenticatedByTwitter: false,
      unsubscribe: () => {},
    }
  },
  mounted() {
    this.unsubscribe = (this as any).$fire.auth.onAuthStateChanged(
      (user: any) => {
        if (user) {
          this.isAuthenticatedByTwitter = isAuthenticatedByProvider(
            user,
            'twitter.com'
          )
        }
      }
    )
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    ...mapActions({
      getUser: 'user/getOne',
      getMySecrets: 'secret/getMine',
      saveSecret: 'secret/save',
      deleteSecret: 'secret/delete',
    }),
    async linkTwitter(): Promise<void> {
      const _this = this as any

      try {
        const provider = new _this.$fireModule.auth.TwitterAuthProvider()

        const user = await this.getUser(this.$store.state.auth.me.uid)
        if (!user) throw new Error('user not found')

        const currentUser = _this.$fire.auth.currentUser

        currentUser.linkWithPopup(provider).then(async (result: any) => {
          const credential = result.credential

          await this.saveSecret({
            vendor: 'twitter',
            payload: {
              accessToken: credential.accessToken,
              accessSecret: credential.secret,
            },
          })

          this.isAuthenticatedByTwitter = true
        })
      } catch (e) {
        console.error(e)
      }
    },
    async unlinkTwitter(): Promise<void> {
      const _this = this as any

      try {
        await _this.$fire.auth.currentUser.unlink('twitter.com')

        const user = await this.getUser(this.$store.state.auth.me.uid)
        if (!user) throw new Error('user not found')

        const secrets = await this.getMySecrets('twitter')

        console.log('unlink twitter', secrets)

        if (secrets.length === 0) return

        for (const secret of secrets) {
          await this.deleteSecret(secret.id)
        }

        this.isAuthenticatedByTwitter = false
      } catch (e) {
        console.error(e)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.button {
  .icon {
    margin-right: 5px;
  }
}
</style>

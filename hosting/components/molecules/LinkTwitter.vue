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
      saveUser: 'user/save',
    }),
    async linkTwitter(): Promise<void> {
      const _this = this as any

      try {
        const provider = new _this.$fireModule.auth.TwitterAuthProvider()

        const user = await this.getUser(this.$store.state.auth.me.id)

        const currentUser = _this.$fire.auth.currentUser

        currentUser
          .linkWithPopup(provider)
          .then(async (result: any) => {
            const credential = result.credential
            const accessToken = credential.accessToken
            const accessSecret = credential.secret
            // ...
            console.log('credential', accessToken, accessSecret)

            await this.saveUser({
              user: {
                ...user,
                providers: {
                  twitter: {
                    accessToken,
                    accessSecret,
                  },
                },
              },
            })

            this.isAuthenticatedByTwitter = true
          })
          .catch((e: any) => {
            console.error(e)
          })
      } catch (e) {
        console.error(e)
      }
    },
    unlinkTwitter(): void {
      const _this = this as any
      _this.$fire.auth.currentUser
        .unlink('twitter.com')
        .then(() => {
          console.log('unlink twitter')
          this.isAuthenticatedByTwitter = false
        })
        .catch((e: any) => {
          console.error(e)
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.button {
  // text-align: center;
  // padding: 10px 0;
  // border: 0;
  // color: $white;
  // font-weight: 800;
  // font-size: 0.9rem;
  .icon {
    margin-right: 5px;
  }
}
</style>

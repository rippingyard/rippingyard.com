<template>
  <div>
    <button class="button twitter" @click="linkTwitter">
      <fa-icon :icon="['fab', 'twitter']" class="icon" />Twitterと連携
    </button>
    <button class="button twitter" @click="unlinkTwitter">
      <fa-icon :icon="['fab', 'twitter']" class="icon" />Twitterの連携解除
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    linkTwitter(): void {
      const _this = this as any
      const provider = new _this.$fireModule.auth.TwitterAuthProvider()
      console.log('linkTwitter', provider)

      _this.$fire.auth.currentUser
        .linkWithPopup(provider)
        .then((result: any) => {
          console.log('result', result)
          // Accounts successfully linked.
          const credential = result.credential
          // var user = result.user;
          const accessToken = credential.accessToken
          const accessSecret = credential.secret
          // ...
          console.log('credential', accessToken, accessSecret)
        })
        .catch((e: any) => {
          console.error(e)
        })
    },
    unlinkTwitter(): void {
      const _this = this as any
      _this.$fire.auth.currentUser
        .unlink('twitter.com')
        .then(() => {
          console.log('unlink twitter')
        })
        .catch((e: any) => {
          console.error(e)
        })
    },
  },
})
</script>

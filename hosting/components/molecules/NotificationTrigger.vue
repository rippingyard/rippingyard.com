<template>
  <div>
    <button class="button" @click="turnOn">
      <fa-icon :icon="['fab', 'twitter']" class="icon" />通知をオン
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
export default Vue.extend({
  methods: {
    ...mapActions({
      saveSecret: 'secret/save',
    }),
    async turnOn(): Promise<void> {
      if (!process.client) return
      try {
        // 通知の受信許可をリクエストする
        console.log('process.env.FCM_VAPID_KEY', process.env.FCM_VAPID_KEY)

        const permission = await Notification.requestPermission()
        console.log('permission', permission)

        if (permission === 'granted') {
          // 現在の登録トークンの取得
          const token = await (this as any).$fire.messaging.getToken()
          console.log('token', token)

          if (token) {
            await this.saveSecret({
              vendor: 'fcm',
              payload: {
                token,
              },
            })
          }
        }
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

<template>
  <div>
    <form class="form" @submit.prevent="reset">
      <section class="instruction">
        <p>新しいパスワードを入力してください</p>
      </section>
      <div class="field">
        <label>パスワード</label>
        <input
          v-model="password"
          type="password"
          placeholder="新しいパスワードを入力"
          class="input"
        />
      </div>
      <div class="field">
        <label>確認</label>
        <input
          v-model="passwordConfirm"
          type="password"
          placeholder="確認のため、もう一度パスワードを入力してください"
          class="input"
        />
      </div>
      <div class="buttons">
        <button class="button">パスワードを再設定する</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { schemaResetPassword } from '~/plugins/validators/auth'

type DataType = {
  oobCode?: string
  password: string
  passwordConfirm: string
}

export default Vue.extend({
  data(): DataType {
    return {
      oobCode: undefined,
      password: '',
      passwordConfirm: '',
    }
  },
  mounted(): void {
    const { oobCode } = this.$route.query as {
      oobCode: string
    }
    this.oobCode = oobCode
  },
  methods: {
    async reset(): Promise<void> {
      if (this.password !== this.passwordConfirm) {
        return (this as any).snackAlert('パスワードが一致しません')
      }

      const { error } = schemaResetPassword.validate({
        password: this.password,
      })
      if (error) {
        return (this as any).snackAlert(error.details[0].message)
      }

      try {
        const auth = (this as any).$fire.auth
        await auth.verifyPasswordResetCode(this.oobCode)
        await auth.confirmPasswordReset(this.oobCode, this.password)
        this.$router.push('/')
      } catch (e: any) {
        console.error(e)
        return (this as any).snackAlert(e.message)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.instruction {
  margin-bottom: 40px;
}
</style>

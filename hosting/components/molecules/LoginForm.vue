<template>
  <form
    class="form"
    @submit.prevent="
      login({
        email,
        password,
      })
    "
  >
    <div class="field">
      <label>メールアドレス</label>
      <input
        v-model="email"
        type="email"
        placeholder="メールアドレスを入力"
        class="input"
      />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input
        v-model="password"
        type="password"
        placeholder="パスワードを入力"
        class="input"
      />
    </div>
    <div class="buttons">
      <button class="button">ログイン</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoginParams } from '~/types/user'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login({email, password}: LoginParams): void {
      console.log('login', email, password)
      const res = await this.$store.dispatch('auth/login', {email, password})
      console.log('res', res)

      if (res.code) {
        switch (res.code) {
          case 'auth/user-not-found':
            this.snackAlert(`ユーザーが登録されていません`)
            break

          case 'auth/wrong-password':
            this.snackAlert(`パスワードが正しくありません`)
            break
          
          default:
            this.snackAlert(`ログインに失敗しました`)
            break
        }
        
      }

    }
  },
})
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
}
</style>

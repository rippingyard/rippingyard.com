<template>
  <main class="block container">
    <Header />
    <h1 class="title">パスワードをリセットする</h1>
    <form class="form" @submit.prevent="reset(email)">
      <div class="field">
        <label>メールアドレス</label>
        <input
          v-model="email"
          type="email"
          placeholder="登録メールアドレスを入力"
          class="input"
        />
      </div>
      <div class="buttons">
        <button class="button">パスワードを再設定する</button>
      </div>
    </form>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { getDomain } from '~/plugins/util'
import { schemaResetPassword } from '~/plugins/validators/auth'

type DataType = {
  email: string
}

export default Vue.extend({
  data(): DataType {
    return {
      email: '',
    }
  },
  methods: {
    reset(email: string): void {
      const { error } = schemaResetPassword.validate({ email })
      if (error) {
        console.log('Error', error.details)
        return (this as any).snackAlert('メールアドレスを入力してください')
      }
      const auth = (this as any).$fire.auth
      auth
        .sendPasswordResetEmail(this.email, {
          url: `${getDomain()}/auth`,
          handleCodeInApp: true,
        })
        .then(() => {
          console.log('E-Mail', this.email)
        })
    },
  },
  head(): any {
    return {
      title: 'Password Reset',
    }
  },
})
</script>
<style lang="scss" scoped>
.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}
.footer {
  font-size: 0.9rem;
  color: $black;
  padding-top: $gap;
  a {
    color: $blue;
    text-decoration: underline;
  }
}
</style>

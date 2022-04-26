<template>
  <main class="block container">
    <Header />
    <h1 class="title">パスワードをリセットする</h1>
    <section class="instruction">
      <p>
        パスワード再設定用のURLを、ご指定のメールアドレスに送信します。<br />
        ご利用中のメールアドレスを入力して、送信ボタンを押してください。<br />
        パスワードを再設定できるページのURLが記載されたメールが、入力されたメールアドレス宛に送信されます。
      </p>
    </section>
    <form class="form" @submit.prevent="reset(email)">
      <div class="field">
        <label>メールアドレス</label>
        <input
          v-model="email"
          type="email"
          placeholder="登録メールアドレスを入力する"
          class="input"
        />
      </div>
      <div class="buttons">
        <button class="button">パスワード再設定メールを送信</button>
      </div>
    </form>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
// import { getDomain } from '~/plugins/util'
import { schemaRequireResetPassword } from '~/plugins/validators/auth'

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
    async reset(email: string): Promise<void> {
      const { error } = schemaRequireResetPassword.validate({ email })
      if (error) {
        console.log('Error', error.details)
        return (this as any).snackAlert('メールアドレスを入力してください')
      }

      try {
        const auth = (this as any).$fire.auth
        await auth.sendPasswordResetEmail(this.email)
        this.snack(`${this.email}宛にメールを送信しました`)
        this.$router.push('/')
      } catch (e: any) {
        return (this as any).snackAlert(e.message)
      }
    },
  },
  head(): any {
    return {
      title: 'Reset Password',
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
.instruction {
  margin-bottom: 45px;
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

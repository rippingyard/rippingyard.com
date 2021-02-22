<template>
  <form
    class="form"
    @submit.prevent="
      login({
        email: email,
        password: password,
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
import { mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
  },
})
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
}
</style>

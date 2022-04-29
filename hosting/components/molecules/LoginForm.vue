<template>
  <form
    class="form"
    :class="[{ widget: isWidget }, theme]"
    @submit.prevent="
      login({
        email,
        password,
      })
    "
  >
    <div class="field" :class="[{ widget: isWidget }, theme]">
      <label>メールアドレス</label>
      <input
        v-model="email"
        type="email"
        placeholder="メールアドレスを入力"
        class="input"
      />
      <p v-if="errors.email" class="error" @click="removeError('email')">
        {{ errors.email }}
      </p>
    </div>
    <div class="field" :class="[{ widget: isWidget }, theme]">
      <label>パスワード</label>
      <input
        v-model="password"
        type="password"
        placeholder="パスワードを入力"
        class="input"
      />
      <p v-if="errors.password" class="error" @click="removeError('password')">
        {{ errors.password }}
      </p>
    </div>
    <div class="buttons">
      <button class="button" :class="[reverse]">ログイン</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { isEmpty } from 'lodash'
import { LoginParams } from '~/types/user'
import validate from '~/plugins/validator'
import { schemaLogin } from '~/plugins/validators/auth'
export default Vue.extend({
  props: {
    isWidget: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    }
  },
  computed: {
    reverse() {
      return this.theme === 'dark' ? 'light' : 'dark'
    },
  },
  methods: {
    removeError(key: string): void {
      this.$set(this.errors, key, '')
    },
    async login({ email, password }: LoginParams): Promise<void> {
      // console.log('login', email, password)

      const params = {
        email,
        password,
      }

      const { errors } = validate(schemaLogin, params)
      if (!isEmpty(errors)) {
        this.errors = errors
        return (this as any).snackAlert('入力項目に不備があります')
      }

      const res = await this.$store.dispatch('auth/login', { email, password })

      if (res.code) {
        switch (res.code) {
          case 'auth/user-not-found':
            ;(this as any).snackAlert(`ユーザーが登録されていません`)
            break

          case 'auth/wrong-password':
            ;(this as any).snackAlert(`パスワードが正しくありません`)
            break

          default:
            ;(this as any).snackAlert(`ログインに失敗しました`)
            break
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  &.dark {
    color: $white;
  }
}
</style>

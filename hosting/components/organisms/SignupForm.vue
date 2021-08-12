<template>
  <form @submit.prevent="signup">
    <div class="field">
      <label>アカウント名</label>
      <input
        v-model="userName"
        placeholder="半角英数で入力"
        class="input"
      />
      <p v-if="errors.userName" class="error" @click="removeError('userName')">{{ errors.userName }}</p>
    </div>
    <div class="field">
      <label>メールアドレス</label>
      <input
        v-model="email"
        type="email"
        placeholder="メールアドレスを入力"
        class="input"
      />
      <p v-if="errors.email" class="error" @click="removeError('email')">{{ errors.email }}</p>
    </div>
    <div class="field">
      <label>パスワード</label>
      <input
        v-model="password"
        type="password"
        placeholder="パスワードを入力"
        class="input"
      />
      <p v-if="errors.password" class="error" @click="removeError('password')">{{ errors.password }}</p>
    </div>
    <div class="buttons">
      <button class="button">新規登録</button>
    </div>
  </form>
</template>

<script>
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import validate from '~/plugins/validator'
import { schemaCreateUser } from '~/plugins/validators/user'
export default {
  props: {
    invitedBy: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      displayName: '',
      userName: '',
      email: '',
      password: '',
      errors: {},
    }
  },
  methods: {
    removeError(key) {
      this.$set(this.errors, key, '')
    },
    async signup() {
      const params = {
        email: this.email,
        password: this.password,
        userName: this.userName,
      }

      const { value, errors } = validate(schemaCreateUser, params)
      if (!isEmpty(errors)) {
        this.errors = errors
        return this.snackAlert('入力項目に不備があります')
      }

      const existance = await this.$fire.firestore
        .collection('users')
        .where('userName', '==', value.userName)
        .get()

      if (!existance.empty) {
        return this.snackAlert('既に存在するユーザーです')
      }

      const result = await this.$fire.auth.createUserWithEmailAndPassword(
        value.email,
        value.password
      )
      
      let parent = null
      if (this.invitedBy) {
        parent = this.$fire.firestore.doc(`users/${this.invitedBy}`)
      }

      await this.$fire.firestore.collection('users').doc(result.user.uid).set({
        uid: result.user.uid,
        displayName: value.userName,
        userName: value.userName,
        role: 'resident',
        invitedBy: parent,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
        isBanned: false,
        isDeleted: false,
      })

      this.snack('ユーザー登録が完了しました！')
      this.$router.push('/home')
      //   })
      //   .catch(function (e) {
      //     console.log(e.code, e.message)
      //     $buefy.notification.open({
      //       duration: 5000,
      //       message: e.message,
      //       position: 'is-bottom-right',
      //       type: 'is-danger',
      //     })
      //   })
    },
  },
}
</script>

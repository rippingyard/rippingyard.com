<template>
  <form class="form" :class="[{ widget: isWidget }, theme]" @submit.prevent="login(email, password)">
    <BlocksForm label="メールアドレス">
      <FormsEmail v-model="email" placeholder="メールアドレスを入力" />
      <p>{{ email }}</p>
      <!-- <p v-if="errors.email" class="error" @click="removeError('email')">
        {{ errors.email }}
      </p> -->
    </BlocksForm>
    <BlocksForm label="パスワード">
      <FormsPassword v-model="password" placeholder="パスワードを入力" />
      {{ password }}
      <!-- <p v-if="errors.password" class="error" @click="removeError('password')">
        {{ errors.password }}
      </p> -->
    </BlocksForm>
    <BlocksForm>
      <AtomsButton>ログイン</AtomsButton>
    </BlocksForm>
    <!-- <div class="buttons">
      <button class="button" :class="[reverse]">ログイン</button>
    </div> -->
  </form>
</template>
<script lang="ts" setup>
import { useLogin } from '~/composables/firebase/useLogin';

const { isWidget, theme } = defineProps<{
  isWidget?: boolean;
  theme?: string;
}>();

const email = ref('');
const password = ref('');

const login = async (email: string, password: string) => {
  const result = await useLogin(email, password);
  console.log('result', result);
};

</script>
<script lang="ts">
// import Vue from 'vue'
// import { isEmpty } from 'lodash'
// import { LoginParams } from '~/types/user'
// import validate from '~/plugins/validator'
// import { schemaLogin } from '~/plugins/validators/auth'
// export default Vue.extend({
//   props: {
//     isWidget: {
//       type: Boolean,
//       default: false,
//     },
//     theme: {
//       type: String,
//       default: 'light',
//     },
//   },
//   data() {
//     return {
//       email: '',
//       password: '',
//       errors: {},
//     }
//   },
//   computed: {
//     reverse() {
//       return this.theme === 'dark' ? 'light' : 'dark'
//     },
//   },
//   methods: {
//     removeError(key: string): void {
//       this.$set(this.errors, key, '')
//     },
//     async login({ email, password }: LoginParams): Promise<void> {
//       // console.log('login', email, password)

//       const params = {
//         email,
//         password,
//       }

//       const { errors } = validate(schemaLogin, params)
//       if (!isEmpty(errors)) {
//         this.errors = errors
//         return (this as any).snackAlert('入力項目に不備があります')
//       }

//       const res = await this.$store.dispatch('auth/login', { email, password })

//       if (res.code) {
//         switch (res.code) {
//           case 'auth/user-not-found':
//             ;(this as any).snackAlert(`ユーザーが登録されていません`)
//             break

//           case 'auth/wrong-password':
//             ;(this as any).snackAlert(`パスワードが正しくありません`)
//             break

//           default:
//             ;(this as any).snackAlert(`ログインに失敗しました`)
//             break
//         }
//       }
//     },
//   },
// })
</script>

<style lang="scss" scoped>
.form {
  width: 100%;

  &.dark {
    color: $white;
  }
}
</style>

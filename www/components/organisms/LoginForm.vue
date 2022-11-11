<template>
  <form class="form" :class="[{ widget: props.isWidget }, props.theme]" @submit.prevent="login(email, password)">
    <BlocksForm label="メールアドレス">
      <FormsEmail v-model="email" placeholder="メールアドレスを入力" @click="removeError('email')" />
      <p v-if="errors.get('email')" class="error">
        {{ errors.email }}
      </p>
      <ul v-if="errors.get('email').length > 0" class="error" @click="removeError('email')">
        <li v-for="(error, i) of errors.get('email')" :key="`login-error-email-${i}`">
          {{ error }}
        </li>
      </ul>
    </BlocksForm>
    <BlocksForm label="パスワード">
      <FormsPassword v-model="password" placeholder="パスワードを入力" @click="removeError('password')" />
      <ul v-if="errors.get('password').length > 0" class="error">
        <li v-for=" (error, i) of errors.get('password')" :key="`login-error-password-${i}`">
          {{ error }}
        </li>
      </ul>
    </BlocksForm>
    <BlocksForm>
      <AtomsButton>ログイン</AtomsButton>
    </BlocksForm>
    <ul v-for="key of errors.keys()" :key="`login-error-group-${key}`">
      <li v-for="(error, i) of errors.get(key)" :key="`login-error-${key}-${i}`">
        {{ error }}
      </li>
    </ul>
  </form>
</template>
<script lang="ts" setup>
import { useLogin } from '~/composables/firebase/useLogin';
import { authValidator } from '~/schemas/auth';
import { useValidationError } from '~/composables/validation/useValidationError';

const props = defineProps<{
  isWidget?: boolean;
  theme?: string;
}>();

const errorMap = new Map();

errorMap.set('email', []);
errorMap.set('password', []);

const email = ref('');
const password = ref('');
const errors = ref<any>(errorMap);

const login = async (email: string, password: string) => {

  if (!authValidator({ email, password })) {
    errors.value = useValidationError(authValidator.errors, ['email', 'password']);
    console.log(errors.value);
    return;
  }

  try {
    await useLogin(email, password);
  } catch (e) {
    console.error(e);
  }

};

const removeError = (key: string) => {
  errors.value.set(key, []);
}

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

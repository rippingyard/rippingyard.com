<template>
  <form class="form" :class="[{ widget: props.isWidget }, props.theme]" @submit.prevent="login(email, password)">
    <ul v-if="errors._total && errors._total.length > 0" class="error">
      <li v-for="(error, i) of errors._total" :key="`login-error-${i}`">
        {{ error }}
      </li>
    </ul>
    <BlocksForm label="メールアドレス" :errors="errors.email">
      <FormsEmail v-model="email" placeholder="メールアドレスを入力" @click="removeError('email')" />
    </BlocksForm>
    <BlocksForm label="パスワード" :errors="errors.password">
      <FormsPassword v-model="password" placeholder="パスワードを入力" @click="removeError('password')" />
    </BlocksForm>
    <BlocksForm>
      <AtomsButton>ログイン</AtomsButton>
    </BlocksForm>
  </form>
</template>
<script lang="ts" setup>
import { useLogin } from '~/composables/firebase/useLogin';
import { authValidationErrors } from '~/schemas/auth';

const props = defineProps<{
  isWidget?: boolean;
  theme?: string;
}>();

const { validationErrors } = authValidationErrors();

const email = ref('');
const password = ref('');
const errors = ref(validationErrors);

const login = async (email: string, password: string) => {
  const res = await useLogin({ email, password });
  if (res?.errors) errors.value = res?.errors.value;
};

const removeError = (key: string) => {
  if (errors.value._total.length === 0) return;
  console.log('validationErrors', validationErrors);
  setTimeout(() => {
    errors.value = validationErrors;
  }, 1200);
}

</script>
<script lang="ts">
//   computed: {
//     reverse() {
//       return this.theme === 'dark' ? 'light' : 'dark'
//     },
//   },
</script>
<style lang="scss" scoped>
.form {
  width: 100%;

  &.dark {
    color: $white;
  }
}
</style>

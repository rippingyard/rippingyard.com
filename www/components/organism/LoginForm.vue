﻿<template>
  <form class="form" :class="[{ widget: props.isWidget }, props.theme]" @submit.prevent="login(email, password)">
    <BlockForm label="メールアドレス" :errors="errors.email">
      <FormEmail v-model="email" placeholder="メールアドレスを入力" @click="removeError('email')" />
    </BlockForm>
    <BlockForm label="パスワード" :errors="errors.password">
      <FormPassword v-model="password" placeholder="パスワードを入力" @click="removeError('password')" />
    </BlockForm>
    <BlockForm>
      <AtomButton>ログイン</AtomButton>
    </BlockForm>
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
const { $openToast: openToast } = useNuxtApp();

const email = ref('');
const password = ref('');
const errors = ref(validationErrors);

const login = async (email: string, password: string) => {
  const res = await useLogin({ email, password });
  if (res?.errors) {
    errors.value = res?.errors.value;
    openToast('ログインに失敗しました', {
      isDanger: true,
    });
  } else {
    openToast('ログインしました');
  }
};

const removeError = (key: string) => {
  setTimeout(() => {
    const newErrors = errors.value;
    newErrors._total = [];
    if (key) newErrors[key] = [];
    errors.value = newErrors;
  }, 1200);
}
</script>
<style lang="scss" scoped>
.form {
  width: 100%;

  &.dark {
    color: $white;
  }
}
</style>

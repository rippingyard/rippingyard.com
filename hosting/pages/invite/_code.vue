<template>
  <main class="block container">
    <Header />
    <h1 class="title">ようこそ！</h1>
    <SignupForm />
  </main>
</template>

<script>
export default {
  fetch({ params }) {
    console.log('Code', params.code)

    // TODO: params.codeをチェックする
  },
  head: () => {
    return {
      title: 'Sign Up',
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}
</style>

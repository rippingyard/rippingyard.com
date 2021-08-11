<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <main class="column c80">
      <ManageHeading label="新規投稿" />
      <div class="form">
        <PostForm />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  layout: 'manage',
  middleware: ['auth'],
  head: () => {
    return {
      title: '新規投稿 - HOME',
    }
  },
}
</script>
<style lang="scss" scoped>
.form {
  padding: 10px 60px 60px;
}
</style>

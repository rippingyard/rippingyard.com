<template>
  <main class="page">
    <ManageHeading label="新規投稿" />
    <div class="form">
      <PostForm />
    </div>
  </main>
</template>

<script>
export default {
  // layout: 'manage',
  middleware: ['auth'],
  head: () => {
    return {
      title: '新規投稿 - HOME',
    }
  },
}
</script>
<style lang="scss" scoped>
.page {
  margin-top: $gap;
  border: 1px solid $gray-black;
}
.form {
  padding: 10px 60px 60px;
}
</style>

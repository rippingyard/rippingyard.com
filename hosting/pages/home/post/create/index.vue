<template>
  <main class="page">
    <ManageHeading label="新規投稿" />
    <div class="form">
      <PostForm />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['auth'],
  data(): {
    me: any
  } {
    return {
      me: this.$store.state.auth.me,
    }
  },
  async mounted() {
    const can = await this.can('postArticle')
    if (!can) this.$router.push('/')
  },
  head: () => {
    return {
      title: '新規投稿 - HOME',
    }
  },
})
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

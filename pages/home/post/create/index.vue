<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <main class="column c80">
      <div class="heading">
        <h2>新規投稿</h2>
      </div>
      <div class="form">
        <PostForm />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  layout: 'manage',
  mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      // this.$buefy.notification.open({
      //   duration: 5000,
      //   message: 'ログインしてください',
      //   position: 'is-bottom-right',
      //   type: 'is-danger',
      //   hasIcon: false,
      // })
      this.$router.push('/login')
    }
  },
  head: () => {
    return {
      title: '新規投稿 - HOME',
    }
  },
}
</script>
<style lang="scss" scoped>
.heading {
  h2 {
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    color: $gray-black;
    background-color: $gray;
    // border-bottom: 4px solid $gray-black;
    padding: 30px;
    display: inline-block;
  }
}
.form {
  padding: 10px 60px 60px;
}
</style>

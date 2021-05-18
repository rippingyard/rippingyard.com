<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <div class="column c80">
      <ManageHeading label="招待" />
      <div class="block container">
        <div class="box wysiwyg">
          <h2>友だちを招待する</h2>
          <p>招待URLを使って、友だちをripping yardに招待しましょう</p>
          <InviteUrl />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'manage',
  fetch() {
    this.me = this.$store.state.auth.me
  },
  data() {
    return {
      me: null,
    }
  },
  middleware: ['auth'],
  mounted() {},
  head: () => {
    return {
      title: '招待',
    }
  },
}
</script>

<style lang="scss" scoped>
.heading {
  padding: 30px;
  h1 {
    font-size: 2rem;
    color: $gray-black;
  }
}
.box {
  padding: 0 30px;
  // border-left: 4px solid $black;
  margin-bottom: 60px;
  h2 {
    line-height: 1;
    padding-top: 0;
  }
  .button {
    text-decoration: none;
  }
}
</style>

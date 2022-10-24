<template>
  <main class="frame page">
    <ManageHeading label="招待" />
    <div class="form">
      <div class="box wysiwyg">
        <h2>友だちを招待する</h2>
        <p>招待URLを使って、友だちをripping yardに招待しましょう</p>
        <InviteUrl />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'

type DataType = {
  me: any
}

export default Vue.extend({
  middleware: ['auth'],
  fetch(): void {
    this.me = this.$store.state.auth.me
  },
  data(): DataType {
    return {
      me: null,
    }
  },
  head: (): any => {
    return {
      title: '招待',
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

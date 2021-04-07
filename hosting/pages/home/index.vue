<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <div class="column c80">
      <div class="block container">
        <div class="heading">
          <h1>ripping yardでできること</h1>
        </div>
        <div class="box wysiwyg">
          <h2>記事の投稿</h2>
          <p>
            ripping yardの核は「記事」です。<br />
            テーマや題材を決めて、いつもより少し長めの文章を書いてみましょう。
          </p>
          <nuxt-link class="button" to="/home/post/create">新規投稿</nuxt-link>
        </div>
        <div class="heading">
          <h1>ripping yardでこれからできること</h1>
        </div>
        <div class="box wysiwyg">
          <h2>エンティティの管理</h2>
          <p>
            エンティティとは、「もの」や「出来事」など、名前のついたすべての事象のことです。<br />
            ripping
            yardでは、エンティティを使って、つながりや言及を行うことができます。<br />
            レビューや体験の整理などに役立ててください。
          </p>
          <span class="button is-disabled">エンティティ投稿</span>
        </div>
        <div class="box wysiwyg">
          <h2>友だちを招待</h2>
          <p>
            ripping yardは、小さなグループで作る、小さなメディアです。<br />
            サービスの中に、いくつもの小さなグループを作り、情報交換したり、外部発信することができます。<br />
            友だちの招待はその第一歩。話のわかる友だちと、共通の話題を積み重ねていきましょう。
          </p>
          <span class="button is-disabled">友だちを招待</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import PostTable from '~/components/organisms/PostTable'
// import InfoMe from '~/components/molecules/InfoMe'
// import Belt from '~/components/atoms/Belt/Global'

export default {
  layout: 'manage',
  props: {
    test: {
      default: 'TEST',
      type: String,
    },
  },
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
      title: 'HOME',
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
  border-left: 4px solid $black;
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

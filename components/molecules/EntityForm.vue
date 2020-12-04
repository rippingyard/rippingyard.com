<template>
  <section>
    <b-field label="何について書きますか？">
      <b-input v-model="content"></b-input>
    </b-field>
    <Wysiwyg
      @update="updateContent"
      :post="post"
    />
    <div class="console-bottom">
      <div class="container">
        <b-button
          @click="submit"
          type="is-primary"
          inverted
          outlined>
          {{ submitText }}
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions } from 'vuex'
import Wysiwyg from '~/components/atoms/Wysiwyg'

export default {
  components: {
    Wysiwyg,
  },
  props: {
    // postId: {
    //   type: String,
    //   default: null,
    // },
    entity: {
      type: Object,
      default: () => {
        return {}
      },
    },
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
    submitText: {
      type: String,
      default: '新規投稿',
    }
  },
  data() {
    return {
      content: '',
    }
  },
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      // console.log('Not Logined')
      this.$router.push('/')
    }

  },
  methods: {
    ...mapActions({
      saveEntity: 'entity/save'
    }),
    updateContent(content) {
      this.content = content
    },
    async submit() {

      const entity = {...this.entity, ...{
        id: this.content,
        aliases: [this.content],
        name: this.content
      }}

      const res = await this.saveEntity(entity)

      this.$buefy.notification.open({
        duration: 5000,
        message: res.status === 'succeed' ? '更新しました' : '更新に失敗しました',
        position: 'is-bottom-right',
        type: res.status === 'succeed' ? 'is-success' : 'is-danger',
        hasIcon: false
      })

      // this.$router.push('/home') // テスト用にコメントアウト中

    },
  }
}
</script>

<style lang="scss" scoped>

.console-bottom {
  position: fixed;
  width: 100%;
  padding: 15px;
  left: 0;
  bottom: 0;
  background-color: rgba( 41, 85,113,1);
}

.is-text {
  color: #FFF;
  text-decoration: none;
  opacity: .75;
  &:hover {
    background-color: transparent;
    color: #FFF;
    opacity: 1;
  }
}

</style>

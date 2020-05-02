<template>
  <section class="section">

    <div class="container column is-8 is-offset-2">
      <article class="article">
        <div v-html="post.content" class="wysiwyg"></div>

        <div class="card">
          <div class="card-container">
            <!-- <div v-if="owner" class="card-footer">
              <p class="title">{{ owner.displayName }}</p>
              <p class="subtitle">@{{ owner.userName }}</p>
            </div> -->
          </div>
        </div>
      </article>
    </div>

  </section>
</template>

<script>

import { db } from '~/plugins/firebase'

export default {
  components: {},
  data() {
    return {
      title: '',
    }
  },
  head: (context) => {
    return {
      title: context.post.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
    }
  },
  async asyncData(context) {

    const r = {}

    await db
      .collection('posts')
      .doc(context.params.id)
      .get()
      .then(doc => {
        r.post = Object.assign(
          doc.data(),
          {
            id: doc.id,
            permalink: '/post/' + doc.id,
          }
        )
        r.post.createdAt = null
        r.post.updatedAt = null
        r.post.owner = null
      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  }

}
</script>

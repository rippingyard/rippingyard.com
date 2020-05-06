<template>
  <section class="main-content columns">

    <Belt/>
    <div class="container column is-8 is-offset-2">
      <PostList :limit="12" />
    </div>

  </section>
</template>

<script>

import PostList from '~/components/organisms/PostList'
import Belt from '~/components/atoms/Belt/Global'

export default {
  components: {
    PostList,
    Belt,
  },
  fetch() {

    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>

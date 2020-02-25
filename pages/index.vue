<template>
  <section class="main-content columns">

    <div class="container column is-8 is-offset-2">
      <PostList/>
    </div>

    <!-- <aside class="column is-2 section">
      <p class="menu-label is-hidden-touch">General</p>
    </aside> -->
  </section>

</template>

<script>

import PostList from '~/components/organisms/PostList'

export default {
  components: {
    PostList,
  },
  fetch() {

    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>

<template>
  <div class="card">
    <!-- <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div> -->
    <div class="card-content">
      <div class="content">
        <div v-html="post.content" class="wysiwyg"></div>
        <!-- <p><a href="#">#css</a> <a href="#">#responsive</a></p> -->
        <!-- <time datetime="2016-1-1">{{ post.createdate.format('YYYY-MM-DD HH:mm:ss') }}</time> -->
      </div>
      <div class="media">
        <!-- <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div> -->
        <div v-if="post.owner" class="media-content">
          <p class="title is-4">{{ post.owner.id }}</p>
          <p class="subtitle is-6">@mcatm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    post: {
      type: Object,
      default: null,
    },
  },

}

</script>


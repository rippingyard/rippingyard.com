<template>
  <div class="item">
    <div class="columns">
      <div class="content column c80">
        <h1 class="title">
          <nuxt-link :to="post.permalink">
            {{ title }}
          </nuxt-link>
        </h1>
        <div class="summary" v-html="summary"></div>
      </div>
      <div v-if="thumbnail" class="image column c20">
        <nuxt-link :to="post.permalink">
          <img :src="thumbnail" />
        </nuxt-link>
      </div>
    </div>
    <p class="footer">
      <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getTitle, getSummary, getThumbnail } from '~/plugins/typography'

export default Vue.extend({
  props: {
    post: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    title() {
      return getTitle(this.post.content)
    },
    summary() {
      return getSummary(this.post.content, 120)
    },
    thumbnail() {
      return getThumbnail(this.post.contentOriginal)
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  padding: $gap;
}

.title {
  font-size: 1.9rem;
  margin-bottom: 8px;
  font-weight: 800;
}

.image {
  margin-bottom: 25px;
  padding-top: 10px;
  img {
    max-width: 100%;
  }
}

.summary {
  font-size: 0.9rem;
  margin-bottom: 42px;
  padding-right: $gap;
}

.footer {
  font-size: 0.8rem;
  font-weight: 800;
  color: $gray-black;
  position: relative;
  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: -10px;
    left: 0;
    display: block;
    position: absolute;
  }
  .icon {
    margin-right: 5px;
  }
}
a {
  text-decoration: none;
  &:hover {
    color: $orange;
  }
}
</style>

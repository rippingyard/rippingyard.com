<template>
  <nuxt-link :to="post.permalink">
    <div class="wysiwyg">
      <h1>
        {{ title }}
      </h1>
      <div class="summary" v-html="summary"></div>
    </div>
    <p class="footer">
      <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
    </p>
  </nuxt-link>
</template>
<script lang="ts">
import Vue from 'vue'
import { getTitle, getSummary } from '~/plugins/typography'

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
      return getSummary(this.post.content, 80)
    },
  },
})
</script>

<style lang="scss" scoped>
.summary {
  margin-bottom: 60px;
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
  display: block;
  &:hover {
    background-color: $orange;
    color: $white;
    .footer {
      color: $white;
      &::before {
        background-color: $white;
      }
    }
  }
}
</style>

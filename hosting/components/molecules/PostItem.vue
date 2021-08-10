<template>
  <nuxt-link :to="post.permalink" :class="{ noTitle: !hasTitle}">
    <div class="wysiwyg">
      <h1 v-if="hasTitle">
        {{ title }}
      </h1>
      <div v-if="thumbnail" class="image">
        <img :src="thumbnail" />
      </div>
      <div class="summary" v-html="summary"></div>
    </div>
    <p class="footer">
      <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
    </p>
  </nuxt-link>
</template>
<script lang="ts">
import Vue from 'vue'
import { hasTitle, getTitle, getSummary, getThumbnail } from '~/plugins/typography'

export default Vue.extend({
  props: {
    post: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    hasTitle(): boolean {
      return hasTitle(this.post.content)
    },
    title(): string {
      return getTitle(this.post.content)
    },
    summary(): string {
      return getSummary(this.post.content, this.hasTitle ? 80 : 140)
    },
    thumbnail(): string {
      return getThumbnail(this.post.contentOriginal)
    },
  },
})
</script>

<style lang="scss" scoped>
.image {
  margin-bottom: 25px;
  img {
    max-width: 100%;
  }
}
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
  // transition: all 100ms 0s ease-out;
  &:hover {
    background-color: $orange;
    color: $white;
    img {
      mix-blend-mode: screen;
    }
    .footer {
      color: $white;
      &::before {
        background-color: $white;
      }
    }
  }
  &.noTitle {
    font-size: 1.4rem;
  }
}
</style>

<template>
  <nuxt-link :to="post.permalink">
    <h1 v-if="hasTitle || hasParentTitle" class="title">
      {{ title }}
    </h1>
    <div class="item">
      <ItemCard v-if="post.parent" :item="post.parent" />
    </div>
    <div class="wysiwyg">
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
import {
  hasTitle,
  getTitle,
  getSummary,
  getThumbnail,
  hasThumbnail,
} from '~/plugins/typography'

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
    hasParentTitle(): boolean {
      return this.post.parent
    },
    hasThumbnail(): boolean {
      return hasThumbnail(this.post.contentOriginal)
    },
    title(): string {
      if (this.hasTitle) return getTitle(this.post.content)
      if (this.hasParentTitle) return this.post.parent.name.ja
      return getTitle(this.post.content)
    },
    summary(): string {
      return getSummary(
        this.post.content,
        !this.hasTitle && !this.hasParentTitle
          ? 240
          : !this.hasThumbnail && !this.hasParentTitle
          ? 180
          : 80
      )
    },
    thumbnail(): string {
      return getThumbnail(this.post.contentOriginal)
    },
  },
})
</script>
<style lang="scss" scoped>
.title {
  font-size: 2.2rem;
  line-height: 1.4;
  font-weight: 800;
  padding-bottom: $gap / 2;
  @include until($desktop) {
    font-size: 1.8rem;
  }
}
.image {
  margin-bottom: 25px;
  img {
    max-width: 100%;
    margin: auto;
    @include mobile {
      margin: 0;
    }
  }
  @include mobile {
    width: calc(100% + 32px);
    margin-left: -16px;
  }
}
.item {
  margin-bottom: $gap / 2;
  list-style: none;
}
.summary {
  margin-bottom: 90px;
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
    // background-color: $orange;
    color: $orange;
    // img {
    //   mix-blend-mode: screen;
    // }
    .footer {
      color: $orange;
      &::before {
        background-color: $orange;
      }
    }
  }
  // &.noTitle {
  //   font-size: 1.4rem;
  // }
}
</style>

<template>
  <nuxt-link :to="post.permalink" :class="className">
    <div class="inner">
      <h1 v-if="hasTitle || hasParentTitle" class="title">
        {{ title }}
      </h1>
      <div v-if="thumbnail" class="image">
        <img :src="thumbnail" />
      </div>
      <div class="item">
        <ItemCard v-if="post.parent" :item="post.parent" :show-image="false" />
      </div>
      <div class="wysiwyg">
        <div class="summary" v-html="summary" />
      </div>
      <p class="footer">
        <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
      </p>
    </div>
  </nuxt-link>
</template>
<script lang="ts">
import Vue from 'vue'
import { hasTitle, getTitle, getSummary } from '~/plugins/typography'
import { numberByString } from '~/plugins/util'
import { getThumbnail, hasThumbnail } from '~/services/post'

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
      return hasThumbnail(this.post)
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
      return getThumbnail(this.post)
    },
    className(): string {
      return `bgcolor-${numberByString(this.post.id) % 4}`
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
    > img {
      display: block;
      margin: auto;
    }
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
  position: relative;
  // border: 1px solid $gray;
  // border-radius: 16px;
  // background-color: $gray;
  transition: background-color 500ms 0s ease-out;

  &:hover {
    color: $white;
    background-color: $orange;
    border-color: $red;
    .footer {
      color: $white;
      &::before {
        background-color: $white;
      }
    }
    > .inner {
      mix-blend-mode: screen;
    }
  }
  // &.noTitle {
  //   font-size: 1.4rem;
  // }
  > .inner {
    position: relative;
    z-index: 10;
    padding: 25px;
    @include mobile {
      padding: 16px;
    }
  }
}
</style>

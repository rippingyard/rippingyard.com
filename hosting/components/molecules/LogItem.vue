<template>
  <div class="item">
    <div class="content" :class="className">
      <div v-if="post.parent" class="parent">
        <ItemCard :item="post.parent" />
      </div>
      <div class="summary" v-html="summary" />
    </div>
    <div class="entities">
      <EntitySimpleList :entities="post.entities" />
    </div>
    <ul class="footer">
      <li>
        <span class="avatar">
          <Avatar
            :to="permalink"
            :user="post.owner"
            size="xs"
            domtype="inline-block"
          />
        </span>
        <span class="displayname">{{ post.owner.displayName }}</span>
      </li>
      <li>
        <nuxt-link :to="post.permalink">
          <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getTitle, getSummary } from '~/plugins/typography'
import { numberByString } from '~/plugins/util'
import { getThumbnail } from '~/services/post'
import { User } from '~/types/user'

export default Vue.extend({
  props: {
    post: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    title(): string {
      return getTitle(this.post)
    },
    summary(): string {
      return getSummary(this.post.content, 120)
    },
    thumbnail(): string {
      return getThumbnail(this.post)
    },
    className(): string {
      return `bgcolor-${numberByString(this.post.id) % 4}`
    },
    userlink(): string {
      return `/people/${(this.post.owner as Partial<User>).userName}`
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @include until-desktop {
    padding: $gap / 2;
  }
}

.content {
  // color: $white;
  padding: $gap / 2;
}

.parent {
  margin: 0 0 $gap / 2;
  // padding-right: $gap;
  @include until-desktop {
    margin: 0 0 $gap / 2;
  }
}

.image {
  margin-bottom: 25px;
  padding-top: 10px;
  img {
    max-width: 100%;
  }

  @include mobile {
    padding-top: 0;
  }
}

.summary {
  font-size: 1.2rem;
  // padding-right: $gap;

  @include until-desktop {
    padding-right: 0;
    margin-bottom: $gap / 2;
  }
}

.entities {
  padding-bottom: 15px;
}

.footer {
  font-size: 0.8rem;
  font-weight: 800;
  color: $gray-black;
  position: relative;
  padding-top: 10px;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: 0;
    left: 0;
    display: block;
    position: absolute;
  }
  .icon {
    margin-right: 5px;
  }
  > li {
    display: flex;
    align-items: center;
    margin-right: 20px;
    > .avatar {
      margin-right: 10px;
      line-height: 1;
    }
  }
}
a {
  text-decoration: none;
  &:hover {
    color: $orange;
  }
}
</style>

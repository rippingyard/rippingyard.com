<template>
  <div class="menu" :class="{ 'is-open': isOpen }">
    <h2>
      <span class="trigger clickable" @click="toggle"> MENU </span>
    </h2>
    <div v-show="isOpen" class="extra">
      <ul class="links">
        <li>
          <nuxt-link to="/home/">
            <fa-icon icon="angle-right" class="icon" />ホーム
          </nuxt-link>
        </li>
      </ul>
      <h3>POST</h3>
      <ul class="links">
        <li>
          <nuxt-link to="/home/posts/">
            <fa-icon icon="angle-right" class="icon" />投稿記事一覧
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/home/post/create/">
            <fa-icon icon="angle-right" class="icon" />新規投稿
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/home/logs/">
            <fa-icon icon="angle-right" class="icon" />ライフログ一覧
          </nuxt-link>
        </li>
        <li v-if="true !== true">
          <nuxt-link to="/home/comments/">
            <fa-icon icon="angle-right" class="icon" />コメント一覧
          </nuxt-link>
        </li>
      </ul>
      <!-- <h3>ENTITIES</h3> -->
      <ul class="links">
        <li v-if="true === false">
          <nuxt-link to="/home/entities/">
            <fa-icon icon="angle-right" class="icon" />エンティティ管理
          </nuxt-link>
        </li>
      </ul>
      <h3>MISC</h3>
      <ul class="links">
        <li>
          <nuxt-link to="/home/setting/">
            <fa-icon icon="angle-right" class="icon" />ユーザー設定
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/home/invite/">
            <fa-icon icon="angle-right" class="icon" />招待
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>
<style lang="scss" scoped>
.menu {
  // display: none;
  position: fixed;
  z-index: 100;
  top: 0;
  right: $navMargin;
  margin-bottom: $navMargin;
  // background-color: $gray;
  .trigger {
    border-bottom: 1px solid $black;
    border-left: 1px solid $black;
    border-right: 1px solid $black;
    font-size: 0.8rem;
    font-weight: 800;
    background-color: $gray;
    padding: 10px 20px;
    display: inline-block;
  }
  h3 {
    font-size: 0.8rem;
    font-weight: 800;
    padding: 10px 20px;
    color: $gray-black;
  }
  .links {
    li {
      font-size: 0.95rem;
      font-weight: 800;
      // display: inline-block;
      a,
      span {
        padding: 10px 20px;
        display: block;
        .icon {
          margin-right: 12px;
          transition: all 100ms 0s ease;
        }
        &:hover {
          color: $yellow;
          .icon {
            margin-right: 8px;
          }
        }
        &.is-current {
          opacity: 0.4;
          &:hover {
            cursor: default;
            color: $white;
            .icon {
              margin-right: 12px;
            }
          }
        }
      }
    }
    &.sub {
      li {
        font-size: 0.85rem;
        font-weight: 400;
        a,
        span {
          padding: 5px 20px;
          &:hover {
            background-color: initial;
            color: $yellow;
          }
        }
      }
    }
  }
  .sep {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .extra {
    position: absolute;
    right: 0;
    background-color: $yellow;
    min-width: 200px;
  }
  .clickable {
    cursor: pointer;
  }
  &.is-open {
    .trigger {
      background-color: $black;
      color: $white;
    }
    .extra {
      background-color: $black;
      color: $white;
    }
  }
}
</style>

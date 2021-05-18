<template>
  <div class="menu">
    <h2><span>MENU</span></h2>
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
    <hr class="sep" />
    <ul class="links sub">
      <li><nuxt-link to="/terms">利用規約</nuxt-link></li>
      <li><nuxt-link to="/privacy">プライバシーポリシー</nuxt-link></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  background-color: $gray;
  height: 100%;
  min-height: 400px;
  h2 {
    font-size: 0.8rem;
    font-weight: 800;
    padding: 10px 20px;
    span {
      border-bottom: 2px solid $black;
    }
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
      a,
      span {
        padding: 10px 20px;
        display: block;
        .icon {
          margin-right: 12px;
          transition: all 100ms 0s ease;
        }
        &:hover {
          background-color: $yellow;
          color: $white;
          .icon {
            margin-right: 8px;
          }
        }
        &.is-current {
          opacity: 0.4;
          &:hover {
            cursor: default;
            background-color: transparent;
            color: $black;
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
}
</style>

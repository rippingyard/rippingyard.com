<template>
  <nav class="nav" :class="{ isOpen: isOpen }">
    <div class="inner">
      <div class="logo">
        <span @click="toggleNav()">
          <SvgTextLogo />
        </span>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
      <div v-show="!isOpen" class="body">
        <ul class="links">
          <li>
            <nuxt-link to="/">TOP<small>トップ</small></nuxt-link>
          </li>
          <li>
            <nuxt-link to="/posts/">POSTS<small>記事一覧</small></nuxt-link>
          </li>
          <li>
            <nuxt-link to="/items/">ITEMS<small>アイテム一覧</small></nuxt-link>
          </li>
          <client-only>
            <li v-if="isAuthenticated">
              <nuxt-link to="/home/">HOME<small>ホーム</small></nuxt-link>
              <ul class="sublinks">
                <li>
                  <nuxt-link to="/home/posts">投稿一覧</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/home/post/create">新規投稿</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/home/setting">設定変更</nuxt-link>
                </li>
                <li>
                  <span @click="logout">ログアウト</span>
                </li>
              </ul>
            </li>
          </client-only>
          <client-only>
            <li v-if="!isAuthenticated">
              <nuxt-link to="/login/">LOGIN<small>ログイン</small></nuxt-link>
            </li>
          </client-only>
        </ul>
      </div>
      <div v-show="isOpen" class="body">
        <div class="close" @click="closeNav"></div>
      </div>
      <div class="foot">
        <client-only>
          <ul class="triggers">
            <li @click="onClickTab('search')">
              <fa-icon icon="search" class="icon" />
            </li>
            <li @click="onClickTab('dashboard')">
              <fa-icon icon="list" class="icon" />
            </li>
            <li
              v-if="isAuthenticated && canPostArticle"
              @click="onClickTab('post')"
            >
              <fa-icon icon="plus-circle" class="icon" />
            </li>
          </ul>
          <ul class="triggers close">
            <li @click="closeNav" />
          </ul>
        </client-only>
      </div>
    </div>
    <div class="extra">
      <ul class="tabs">
        <li
          :class="{ active: isActiveTab('dashboard') }"
          @click="onClickTab('dashboard')"
        >
          <span class="pconly">ダッシュボード<small>Dashboard</small></span>
          <span class="sponly">
            <fa-icon icon="tachometer-alt" class="icon" />
          </span>
        </li>
        <li
          :class="{ active: isActiveTab('notification') }"
          @click="onClickTab('notification')"
        >
          <span class="pconly">新着記事<small>Latest</small></span>
          <span class="sponly">
            <fa-icon icon="bell" class="icon" />
          </span>
        </li>
        <li
          :class="{ active: isActiveTab('search') }"
          @click="onClickTab('search')"
        >
          <span class="pconly">検索<small>Search</small></span>
          <span class="sponly">
            <fa-icon icon="search" class="icon" />
          </span>
        </li>
        <client-only>
          <li
            v-if="isAuthenticated && canPostArticle"
            :class="{ active: isActiveTab('post') }"
            @click="onClickTab('post')"
          >
            <span class="pconly">新規投稿<small>Post</small></span>
            <span class="sponly">
              <fa-icon icon="plus-circle" class="icon" />
            </span>
          </li>
        </client-only>
      </ul>
      <client-only>
        <section v-if="activeTab === 'dashboard'" class="inner">
          <NavHeader
            title="A SMARTER WAY<br />TO RECORD OUR LIVES"
            subtitle="生命を記録する冴えたやり方 - リッピングヤード"
          />
          <div v-if="isAuthenticated">
            <div class="columns">
              <div class="column links">
                <ul>
                  <li>
                    <nuxt-link to="/">
                      <fa-icon icon="angle-right" class="icon" />トップ
                    </nuxt-link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <nuxt-link to="/posts/">
                      <fa-icon icon="angle-right" class="icon" />記事一覧
                    </nuxt-link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <nuxt-link to="/terms/">
                      <fa-icon icon="angle-right" class="icon" />利用規約
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/privacy/">
                      <fa-icon
                        icon="angle-right"
                        class="icon"
                      />プライバシーポリシー
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="column links">
                <ul>
                  <li>
                    <nuxt-link to="/home/">
                      <fa-icon icon="angle-right" class="icon" />ホーム
                    </nuxt-link>
                  </li>
                </ul>
                <h3>POST</h3>
                <ul>
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
                  <li v-if="true !== true">
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
                <ul>
                  <li v-if="true === false">
                    <nuxt-link to="/home/entities/">
                      <fa-icon
                        icon="angle-right"
                        class="icon"
                      />エンティティ管理
                    </nuxt-link>
                  </li>
                </ul>
                <h3>MISC</h3>
                <ul>
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
                  <li>
                    <span @click="logout">
                      <fa-icon icon="angle-right" class="icon" />ログアウト
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="login bg-dotted">
            <LoginForm :is-widget="true" />
          </div>
        </section>
      </client-only>
      <section v-show="activeTab === 'notification'" class="inner">
        <PostSimpleList
          :posts="posts"
          :is-small="true"
          :has-margin="true"
          :is-dark="true"
        />
      </section>
      <section v-show="activeTab === 'search'" class="inner">
        <Search />
      </section>
      <section
        v-if="canPostArticle"
        v-show="activeTab === 'post'"
        class="inner"
      >
        <NoteForm />
      </section>
    </div>
    <div class="overlay" />
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Post } from '~/types/post'
import SvgTextLogo from '~/assets/img/textLogo.svg'

type DataType = {
  activeTab: TabMode
  isOpen: boolean
  canPostArticle: boolean
  unsubscriber: () => void
}

type TabMode = 'dashboard' | 'notification' | 'article' | 'comment'

export default Vue.extend({
  components: {
    SvgTextLogo,
  },
  data(): DataType {
    return {
      activeTab: 'dashboard',
      isOpen: false,
      canPostArticle: false,
      unsubscriber: () => {},
    }
  },
  computed: {
    posts(): Post[] {
      return this.$store.state.global.posts
    },
    isAuthenticated(): boolean {
      return this.$isAuthenticated(this.$store)
    },
  },
  watch: {
    $route(): void {
      this.isOpen = false
    },
  },
  created() {
    if (process.client) {
      this.unsubscriber = this.$store.subscribe(async mutation => {
        switch (mutation.type) {
          case 'auth/setMe':
          case 'auth/removeMe':
            this.canPostArticle = await this.can('postArticle')
            break
        }
      })
    }
  },
  async mounted() {
    this.canPostArticle = await this.can('postArticle')
  },
  beforeDestroy() {
    this.unsubscriber()
  },
  methods: {
    ...mapActions({
      signout: 'auth/logout',
    }),
    toggleNav(): void {
      this.isOpen = !this.isOpen
    },
    openNav(): void {
      this.isOpen = true
    },
    closeNav(): void {
      this.isOpen = false
    },
    onClickTab(tab: TabMode): void {
      this.openNav()
      this.activeTab = tab
    },
    isActiveTab(tab: TabMode): boolean {
      return this.activeTab === tab
    },
    logout(): void {
      this.signout()
      this.snack('ログアウトしました')
      this.$router.push('/')
    },
  },
})
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  top: $navMargin - 20px;
  left: calc(50vw - #{($mainSize / 2) + $navSize + $navMargin});
  width: $navSize;
  height: calc(100vh - #{$navMargin});
  z-index: 9999;

  > .inner {
    display: flex;
    flex-direction: column;
    width: $navSize;
    height: calc(100vh - #{$navMargin});
    box-sizing: content-box;
    position: relative;
    z-index: 10;
  }

  .extra {
    display: none;
    position: absolute;
    left: $navSize + ($navMargin / 2);
    top: 0;
    z-index: 20;
    // width: 100%;
    width: $mainSize + $navMargin + (($navSize + $navMargin) * 2) - $navSize -
      $navMargin;
    min-width: 200px;
    height: calc(100vh - #{$navMargin});
    border-left: 1px $black solid;
    overflow-y: auto;
    flex-direction: column;

    .tabs {
      display: flex;
      > li {
        padding: 15px 18px 14px;
        line-height: 1.2;
        font-size: 1.4rem;
        font-weight: 800;
        border-right: 1px solid $black;
        border-bottom: 1px solid $black;
        flex-grow: 1;
        &:hover {
          cursor: pointer;
          color: rgba($black, 0.4);
        }
        small {
          display: block;
          font-size: 0.8rem;
          font-weight: 400;
        }
        &.active {
          border-bottom: none;
          background-color: $black;
          color: $yellow;
        }
        &:last-child {
          border-right: none;
        }
      }
    }

    .inner {
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: auto;
    }

    .login {
      padding: 20px;
      border-bottom: 1px solid $black;
      border-right: 1px solid $black;
    }

    .links {
      min-width: 320px;
      padding: $gap / 2;
      h3 {
        font-weight: 800;
        font-size: 0.8rem;
        margin-bottom: 8px;
        opacity: 0.6;
      }
      > ul {
        margin-bottom: $gap / 2;
      }
      li {
        font-size: 1rem;
        font-weight: 800;
        color: $black;
        line-height: 1;
        margin-bottom: 12px;
        a,
        span {
          > .icon {
            margin-right: 10px;
          }
          &:hover {
            cursor: pointer;
            color: $orange;
            > .icon {
              margin-right: 15px;
            }
          }
          &.is-current {
            color: $red;
          }
          > small {
            font-size: 0.8rem;
            display: block;
            // padding-left: 5px;
            margin-top: 5px;
            font-weight: 400;
          }
        }
      }
    }
  }

  .logo {
    position: relative;
    flex-shrink: 0;
    width: $navSize;
    height: $navSize;
    background-color: $white;
    .box {
      width: 5px;
      height: 7px;
      bottom: 4px;
      position: absolute;
      &:nth-of-type(1) {
        right: 30px;
        background-color: $yellow;
      }
      &:nth-of-type(2) {
        right: 35px;
        background-color: $blue;
      }
      &:nth-of-type(3) {
        right: 40px;
        background-color: $orange;
      }
    }
    > a,
    > span {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      border: 4px solid $black;
      padding: 0;
      > svg {
        margin: auto;
        width: $navSize - $navMargin - 20px;
      }
    }
    &:hover {
      > a,
      > span {
        background-color: $yellow;
        cursor: pointer;
      }
      .box {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          background-color: $black !important;
        }
      }
    }
  }

  .body {
    width: $navSize;
    height: calc(100% - #{$navSize});
    display: flex;
    flex-direction: column;
    justify-content: center;
    .links {
      > li {
        position: relative;
        font-size: 2rem;
        font-weight: 800;
        color: $black;
        line-height: 1;
        margin-bottom: 12px;
        text-align: center;
        a,
        span {
          &:hover {
            cursor: pointer;
            color: $orange;
          }
          &.is-current {
            color: $red;
          }
          > small {
            font-size: 0.8rem;
            display: block;
            // padding-left: 5px;
            margin-top: 5px;
            font-weight: 400;
          }
        }
        > .sublinks {
          margin: 0;
          display: none;
          position: absolute;
          text-align: left;
          width: 120px;
          top: -40px;
          right: -120px;
          border: 1px solid $black;
          background-color: $white;
          li {
            font-size: 0.8rem;
            font-weight: 400;
            margin: 0;
            small {
              padding-left: 0;
              font-size: 0.6rem;
            }
            > a,
            > span {
              display: block;
              padding: 10px;
            }
          }
        }
        &:hover {
          > .sublinks {
            display: block;
          }
        }
      }
    }

    @include short {
      .links {
        display: none;
      }
    }
  }

  .foot {
    > .triggers {
      display: flex;
      border: 2px solid $black;
      width: 100%;
      &.close {
        display: none;
      }
      > li {
        // width: 50%;
        cursor: pointer;
        line-height: 1;
        flex-grow: 1;
        text-align: center;
        font-size: 0.8rem;
        padding: 10px 0;
        border-left: 1px solid $black;
        &:first-child {
          border: none;
        }
        &:hover {
          background-color: $black;
          color: $white;
        }
      }
    }
  }

  .overlay {
    display: none;
    background-color: $yellow;
    border: 1px solid $black;
    width: $mainSize + $navMargin + (($navSize + $navMargin) * 2);
    height: calc(100% - #{$navMargin});
    position: fixed;
    top: $navMargin / 2;
    left: calc(50vw - #{($mainSize / 2) + $navSize + ($navMargin * 1.5)});
    overflow: hidden;
  }

  &.isOpen {
    width: calc(100% - #{$navMargin * 2});

    .logo {
      background-color: $yellow;
      .box {
        background-color: $black;
      }
    }

    .extra {
      display: flex;
    }

    .foot {
      > .triggers {
        border-bottom: none;
        > li {
          padding: 10px 0 12px;
          &:hover {
            color: $yellow;
          }
        }
      }
    }

    .overlay {
      display: block;
    }
  }

  .close {
    display: block;
    position: relative;
    width: 30px;
    height: 30px;
    margin: auto;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 30px;
      background: $black;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  @include until($desktop) {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    > .inner {
      display: block;
      padding: 0;
      width: 100%;
      height: auto;
      z-index: 100;
    }
    .logo,
    .body {
      display: none;
    }

    .foot {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      // bottom: $navMargin / 4;
      // left: $navMargin / 4;
      .triggers {
        background-color: $white;
        height: $navMargin;
        display: flex;
        align-items: center;
        border: none;
        border-top: 1px solid $black;
        > li {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .extra {
      top: $navMargin / 4;
      left: $navMargin / 4 + 160px;

      .tabs {
        .sponly {
          display: block;
          text-align: center;
        }
      }

      .block {
        &.login,
        &.widget {
          margin-right: $navMargin / 2;
        }
      }
    }

    .overlay {
      top: $navMargin / 4;
      left: $navMargin / 4;
      width: calc(100% - #{$navMargin / 2});
      height: calc(100% - #{$navMargin / 2});
    }

    &.isOpen {
      width: 100%;

      .logo {
        > a,
        > span {
          border: none;
        }
      }

      .foot {
        > .triggers {
          border-bottom: 2px solid $black;
          display: none;
          > li {
            padding: 8px 0;
          }
          &.close {
            display: block;
            position: relative;
            margin: auto;
            cursor: pointer;

            &::before,
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 1px;
              height: 16px;
              background: $black;
            }
          }
        }
      }

      .extra {
        position: fixed;
        top: $navMargin / 4;
        left: $navMargin / 4;
        width: calc(100% - #{$navMargin / 2});
        height: calc(100% - #{($navMargin / 2) + $navMargin + 10px});
      }

      .overlay {
        height: calc(100% - #{($navMargin / 2) + $navMargin + 10px});
      }
    }
  }
}
</style>

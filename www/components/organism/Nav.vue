<template>
  <nav ref="el" class="nav" :class="{ isOpen, toTop: toTop || isOpen }">
    <div class="inner">
      <div class="logo" @mouseenter="onHoverLogo()" @mouseleave="onHoverLogo(false)">
        <span @click="toggle()">
          <IconLogoType />
        </span>
        <IconLines :is-black="isHoverLogo" />
      </div>
      <div v-show="!isOpen" class="body">
        <ul class="links">
          <li>
            <nuxt-link to="/">TOP<small>トップ</small></nuxt-link>
          </li>
          <li>
            <nuxt-link to="/posts/">POSTS<small>記事一覧</small></nuxt-link>
          </li>
          <li v-if="isAuthenticated">
            <nuxt-link to="/profile/">PROFILE<small>プロフィール</small></nuxt-link>
          </li>
          <!--<li>
                <nuxt-link to="/items/">ITEMS<small>アイテム一覧</small></nuxt-link>
              </li>-->
          <client-only>
            <!-- <li v-if="isAuthenticated">
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
                </li> -->
            <li v-if="!isAuthenticated">
              <nuxt-link to="/login/">LOGIN<small>ログイン</small></nuxt-link>
            </li>
          </client-only>
        </ul>
      </div>
      <div v-show="isOpen" class="body">
        <div class="close" @click="close" />
      </div>
      <div class="foot">
        <client-only>
          <ul class="triggers">
            <li @click="onClickTab('search')">
              <IconSearch />
            </li>
            <li @click="onClickTab('dashboard')">
              <IconGauge />
            </li>
            <li v-if="isAuthenticated && canCreateArticle" @click="onClickTab('post')">
              <IconPen />
            </li>
          </ul>
          <ul class="triggers close">
            <li @click="close" />
          </ul>
        </client-only>
      </div>
    </div>
    <div class="extra">
      <client-only>
        <ul class="tabs">
          <li :class="{ active: isActiveTab('dashboard') }" @click="onClickTab('dashboard')">
            <span class="pconly">ダッシュボード<small>Dashboard</small></span>
            <span class="sponly">
              <IconGauge />
            </span>
          </li>
          <li v-if="isAuthenticated" :class="{ active: isActiveTab('posts') }" @click="onClickTab('posts')">
            <span class="pconly">あなたの記事<small>Posts</small></span>
            <span class="sponly">
              <IconBell />
            </span>
          </li>
          <li :class="{ active: isActiveTab('search') }" @click="onClickTab('search')">
            <span class="pconly">検索<small>Search</small></span>
            <span class="sponly">
              <IconSearch />
            </span>
          </li>
          <li v-if="canCreateArticle" :class="{ active: isActiveTab('post') }" @click="onClickTab('post')">
            <span class="pconly">新規投稿<small>Post</small></span>
            <span class="sponly">
              <IconPen />
            </span>
          </li>
        </ul>
      </client-only>
      <OrganismDashboard v-if="activeTab === 'dashboard'" />
      <OrganismPostForm v-show="activeTab === 'post'" :is-footer-dotted="true" :is-widget="true" :show-item="true" />
      <OrganismNavPostList v-if="activeTab === 'posts'" />
      <!--
            
          <section v-show="activeTab === 'posts'" class="inner">
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
            v-if="canCreateArticle"
            v-show="activeTab === 'post'"
            class="inner"
          >
            <NoteForm />
          </section>-->
    </div>
    <div class="overlay" />
    <div class="backdrop" @click="close" />
  </nav>
</template>
<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core';
import { useAuth } from '~/composables/firebase/useAuth';
import { useLogout } from '~/composables/firebase/useLogout';
import { useNavState } from '~/composables/state/useNavState';
import IconGauge from '~~/components/icon/Gauge.vue';
import IconSearch from '~~/components/icon/Search.vue';
import { useCanCreateArticle } from '~~/composables/permission/useCanCreateArticle';

const { y } = useWindowScroll();

type TabMode = 'dashboard' | 'search' | 'posts' | 'post' | 'comment';

const { isAuthenticated } = useAuth();
const { canCreateArticle } = useCanCreateArticle();
const { isOpen, open, close, toggle } = useNavState();

// const isOpen = ref(false);
const activeTab = ref<TabMode>('dashboard');
const isHoverLogo = ref(false);
const toTop = ref(true);

const onClickTab = (tab: TabMode): void => {
  open();
  activeTab.value = tab;
};
const onHoverLogo = (isHover = true): void => {
  isHoverLogo.value = isHover;
}
const isActiveTab = (tab: TabMode) => activeTab.value === tab;

watch(y, (val, old) => toTop.value = val < old);

const logout = async () => await useLogout();
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  top: $navMargin;
  left: calc(50vw - #{($mainSize * 0.5) + $navSize + $navMargin});
  width: $navSize;
  height: calc(100vh - #{$navMargin * 1.5});
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s;

  &.toTop {
    opacity: 1;
  }

  >.inner {
    display: flex;
    flex-direction: column;
    width: $navSize;
    height: calc(100vh - #{$navMargin * 1.5});
    box-sizing: content-box;
    position: relative;
    z-index: 10;
  }

  .extra {
    display: none;
    position: absolute;
    left: $navSize + ($navMargin * 0.5);
    top: $navMargin * -0.5;
    z-index: 20;
    // width: 100%;
    width: $mainSize + $navMargin + (($navSize + $navMargin) * 2) - $navSize - $navMargin;
    min-width: 200px;
    height: calc(100vh - #{$navMargin});
    border-left: 1px $black solid;
    overflow-y: auto;
    flex-direction: column;

    .tabs {
      display: flex;

      >li {
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

    // .login {
    //   padding: 20px;
    //   border-bottom: 1px solid $black;
    //   border-right: 1px solid $black;
    // }

    .links {
      min-width: 320px;
      padding: $gap * 0.5;

      h3 {
        font-weight: 800;
        font-size: 0.8rem;
        margin-bottom: 8px;
        opacity: 0.6;
      }

      >ul {
        margin-bottom: $gap * 0.5;
      }

      li {
        font-size: 1rem;
        font-weight: 800;
        color: $black;
        line-height: 1;
        margin-bottom: 12px;

        a,
        span {
          display: block;

          >.icon {
            margin-right: 10px;
          }

          &:hover {
            cursor: pointer;
            color: $orange;

            >.icon {
              margin-right: 15px;
            }
          }

          &.is-current {
            color: $red;
          }

          >small {
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

    >a,
    >span {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      border: 4px solid $black;
      padding: 0;

      >svg {
        margin: auto;
        width: $navSize - $navMargin - 20px;
      }
    }

    &:hover {

      >a,
      >span {
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
      >li {
        position: relative;
        font-size: 2rem;
        font-weight: 800;
        color: $black;
        line-height: 1;
        margin-bottom: 12px;
        text-align: center;

        a,
        span {
          display: block;

          &:hover {
            cursor: pointer;
            color: $orange;
          }

          &.is-current {
            color: $red;
          }

          >small {
            font-size: 0.8rem;
            display: block;
            // padding-left: 5px;
            margin-top: 5px;
            font-weight: 400;
          }
        }

        >.sublinks {
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

            >a,
            >span {
              display: block;
              padding: 10px;
            }
          }
        }

        &:hover {
          >.sublinks {
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
    >.triggers {
      display: flex;
      border: 2px solid $black;
      width: 100%;

      &.close {
        display: none;
      }

      >li {
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
    top: $navMargin * 0.5;
    left: calc(50vw - #{($mainSize * 0.5) + $navSize + ($navMargin * 1.5)});
    overflow: hidden;
  }

  .backdrop {
    display: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  &.isOpen {
    width: calc(100% - #{$navMargin * 2});

    .extra {
      display: flex;
    }

    .foot {
      >.triggers {
        border-bottom: none;

        >li {
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

    .backdrop {
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

    >.inner {
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
      width: calc(100vw - #{$navMargin * 0.5});
      bottom: $navMargin * 0.25;
      left: $navMargin * 0.25;

      .triggers {
        background-color: $yellow;
        height: $navMargin;
        display: flex;
        align-items: center;
      }
    }

    .extra {
      top: $navMargin * 0.25;
      left: $navMargin * 0.25 + 160px;

      .tabs {
        .sponly {
          display: block;
          text-align: center;
        }
      }

      .block {

        &.login,
        &.widget {
          margin-right: $navMargin * 0.5;
        }
      }
    }

    .overlay {
      top: $navMargin * 0.25;
      left: $navMargin * 0.25;
      width: calc(100% - #{$navMargin * 0.5});
      height: calc(100% - #{$navMargin * 0.5});
    }

    &.isOpen {
      width: 100%;

      .logo {

        >a,
        >span {
          border: none;
        }
      }

      .foot {
        >.triggers {
          border-bottom: 2px solid $black;
          display: none;

          >li {
            // padding: 8px 0;
            height: 100%;
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
        top: $navMargin * 0.25;
        left: $navMargin * 0.25;
        width: calc(100% - #{$navMargin * 0.5});
        height: calc(100% - #{($navMargin * 0.5) + $navMargin + 10px});
      }

      .overlay {
        height: calc(100% - #{($navMargin * 0.5) + $navMargin + 10px});
      }
    }
  }
}
</style>

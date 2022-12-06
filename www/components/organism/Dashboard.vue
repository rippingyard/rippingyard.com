<template>
  <client-only>
    <section class="inner">
      <StaticNavHeader title="A SMARTER WAY<br />TO RECORD OUR LIVES" subtitle="生命を記録する冴えたやり方 - リッピングヤード" />
      <div v-if="isAuthenticated">
        <div class="columns">
          <div v-for="links, i in linkGroups" :key="`linkGroup-${i}`" class="column links">
            <div v-for="linkGroup, i2 in links" :key="`linkGroup-${i}-${i2}`">
              <h3 v-if="linkGroup.title">{{ linkGroup.title }}</h3>
              <ul>
                <li v-for="link, i3 in linkGroup.links" :key="`linkGroup-${i}-${i2}-${i3}`">
                  <nuxt-link :to="link.to">
                    <IconAngleRight class="icon" />{{ link.label }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="column links">
            <ul>
              <li>
                <span @click="logout">
                  <IconAngleRight class="icon" />ログアウト
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="login bg-dotted">
        <OrganismLoginForm :is-widget="true" />
      </div>
      <StaticInformation />
    </section>
  </client-only>
</template>
<script lang="ts" setup>
import { useAuth } from '~/composables/firebase/useAuth';
import { useLogout } from '~/composables/firebase/useLogout';
// import { useMe } from '~~/composables/fetch/useMe';

type Link = {
  to?: string;
  label: string;
}

type LinkGroup = {
  title?: string;
  links: Link[];
}

const linkGroups: LinkGroup[][] = [
  [
    {
      title: 'TOP',
      links: [
        {
          to: '/',
          label: 'トップ',
        }
      ],
    },
    {
      links: [
        {
          to: '/posts/',
          label: '記事一覧',
        }
      ],
    },
    {
      links: [
        {
          to: '/terms/',
          label: '利用規約',
        },
        {
          to: '/privacy/',
          label: 'プライバシーポリシー',
        },
      ],
    },
  ],
  [
    {
      title: 'POST',
      links: [
        {
          to: '/',
          label: '投稿記事一覧',
        },
        {
          to: '/',
          label: '新規投稿',
        },
      ],
    },
    {
      title: 'MISC',
      links: [
        {
          to: '/',
          label: 'ユーザー設定',
        },
        {
          to: '/',
          label: '招待',
        },
      ],
    }
  ]
];

const { isAuthenticated } = useAuth();
const logout = async () => await useLogout();
</script>
<style lang="scss" scoped>
.inner {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.login {
  padding: 20px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
}

.links {
  min-width: 320px;
  padding: $gap * 0.5;

  h3 {
    font-weight: 800;
    font-size: 0.8rem;
    margin-bottom: 8px;
    opacity: 0.6;
  }

  ul {
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

@include until($desktop) {
  .inner {
    display: block;
    padding: 0;
    width: 100%;
    height: auto;
    z-index: 100;
  }
}
</style>
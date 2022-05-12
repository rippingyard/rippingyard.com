<template>
  <main>
    <ManageNav />
    <div class="block container">
      <div class="information">
        <ul class="tabs">
          <li
            :class="{ 'is-current': currentTab === 'notification' }"
            @click="switchTab('notification')"
          >
            <h2>通知</h2>
          </li>
          <li
            :class="{ 'is-current': currentTab === 'activity' }"
            @click="switchTab('activity')"
          >
            <h2>あなたの活動履歴</h2>
          </li>
        </ul>
        <div v-show="currentTab === 'notification'" class="information-box">
          <NotificationSimpleList :notifications="notifications" />
        </div>
        <div v-show="currentTab === 'activity'" class="information-box">
          <ActivitySimpleList :activities="activities" />
        </div>
      </div>
      <AdsenseHomeMiddle />
      <LinkTwitter />
      <div class="heading">
        <h1>ripping yardでできること</h1>
      </div>
      <div class="box wysiwyg">
        <h2>記事の投稿</h2>
        <p>
          ripping yardの核は「記事」です。<br />
          テーマや題材を決めて、いつもより少し長めの文章を書いてみましょう。
        </p>
        <nuxt-link class="button" to="/home/post/create">新規投稿</nuxt-link>
      </div>
      <div class="heading">
        <h1>ripping yardでこれからできること</h1>
      </div>
      <div class="box wysiwyg">
        <h2>エンティティの管理</h2>
        <p>
          エンティティとは、「もの」や「出来事」など、名前のついたすべての事象のことです。<br />
          ripping
          yardでは、エンティティを使って、つながりや言及を行うことができます。<br />
          レビューや体験の整理などに役立ててください。
        </p>
        <span class="button is-disabled">エンティティ投稿</span>
      </div>
      <div class="box wysiwyg">
        <h2>友だちを招待</h2>
        <p>
          ripping yardは、小さなグループで作る、小さなメディアです。<br />
          サービスの中に、いくつもの小さなグループを作り、情報交換したり、外部発信することができます。<br />
          友だちの招待はその第一歩。話のわかる友だちと、共通の話題を積み重ねていきましょう。
        </p>
        <span class="button is-disabled">友だちを招待</span>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { Activity } from '~/types/activity'
import { Notification } from '~/types/notification'
import { Context } from '~/types/context'
export default Vue.extend({
  asyncData({ $fire, store }: Context) {
    const r: {
      activities: Partial<Activity>[]
      notifications: Partial<Notification>[]
    } = {
      activities: [],
      notifications: [],
    }
    $fire.firestore
      .collection('activities')
      .where(
        'owner',
        '==',
        $fire.firestore.doc(`users/${store.state.auth.me.uid}`)
      )
      .where('type', 'in', ['comment:create', 'post:create', 'post:update'])
      .limit(8)
      .orderBy('createdAt', 'desc')
      .get()
      .then((qs: any) => {
        qs.forEach((doc: any) => {
          const activity: Partial<Activity> = doc.data()
          r.activities.push(activity)
        })
      })

    $fire.firestore
      .collection('notifications')
      .where(
        'targets',
        'array-contains',
        $fire.firestore.doc(`users/${store.state.auth.me.uid}`)
      )
      .limit(24)
      .orderBy('createdAt', 'desc')
      .get()
      .then((qs: any) => {
        qs.forEach((doc: any) => {
          const notification: Partial<Notification> = doc.data()
          r.notifications.push(notification)
        })
      })

    return r
  },
  data(): {
    me: any
    activities: Partial<Activity>[]
    notifications: Partial<Notification>[]
    currentTab: 'notification' | 'activity'
  } {
    return {
      me: this.$store.state.auth.me || null,
      activities: [],
      notifications: [],
      currentTab: 'notification',
    }
  },
  methods: {
    switchTab(current: string) {
      this.$data.currentTab = current
    },
  },
  middleware: ['auth'],
  head: () => {
    return {
      title: 'HOME',
    }
  },
})
</script>

<style lang="scss" scoped>
.heading {
  padding: 30px;
  h1 {
    font-size: 2rem;
    color: $gray-black;
  }
}
.tabs {
  padding: 6rem 30px 30px;
  font-size: 1.4rem;
  > li {
    display: inline-block;
    margin-right: 10px;
    font-weight: 800;
    color: $gray-black;
    &:hover {
      cursor: pointer;
    }
    &.is-current {
      color: $black;
      border-bottom: 4px solid $black;
    }
  }
}
.box {
  padding: 0 30px;
  border-left: 4px solid $black;
  margin-bottom: 60px;
  &.no-border {
    border: none;
  }
  h2 {
    line-height: 1;
    padding-top: 0;
  }
  .button {
    text-decoration: none;
  }
}
</style>

﻿<template>
  <div class="container">
    <ul class="comments">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="comment"
      >
        <div class="body">
          <div class="content wysiwyg" v-html="comment.content"></div>
          <p class="date">{{ comment.createdAt }}</p>
        </div>
        <div class="user">
          <UserTip :user="comment.owner" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { normalize } from '~/services/comment'
export default Vue.extend({
  props: {
    parentId: {
      type: String,
      default: undefined,
    },
  },
  data(): {
    comments: any[],
    unsubscribe: any
  } {
    return {
      comments: [],
      unsubscribe: () => {}
    }
  },
  async mounted(): Promise<void> {
    let promises: any[] = []
    this.unsubscribe = await (this as any).$fire.firestore
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .where('parent', '==', (this as any).$fire.firestore.doc(this.parentId))
      .onSnapshot((qs: any) => {
        this.comments = []

        promises = qs.docs.map(async (doc: any) => {
          const comment = doc.data()
          if (
            comment.isDeleted ||
            (!comment.isPublic && this.$store.state.auth.me.uid !== comment.owner.id) ||
            comment.status !== 'published'
          ) return
          const normalizedComment = await normalize(comment.id, comment, this.$store)
          this.comments.push(normalizedComment)
        })

        qs.docChanges().forEach((change: any) => {
          if (change.type === 'added') {
            console.log('New Comment: ', change.doc.data());
          }
        });
      })
    await Promise.all(promises)
  },
  destroyed() {
    this.unsubscribe()
  },
})
</script>
<style lang="scss" scoped>
.comments {
  margin-bottom: $gap;
}
.comment {
  padding: 20px 0 5px;
  border-top: 1px solid $gray-black;
  display: flex;
  justify-content: space-between;
  &:first-child {
    border: none;
  }
  @include mobile {
    flex-direction: column;
  }
}
.body {
  width: calc(100% - 180px);
  padding: 20px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;

  /deep/ p {
    padding-bottom: 20px;
  }
  /deep/ a {
    color: $blue;
    text-decoration: underline;
  }

  /deep/ .content {
    p:last-child {
      padding-bottom: 0;
    }
  }

  .date {
    font-size: 0.8rem;
    color: $gray-black;
    padding-top: 5px;
    padding-bottom: 20px;
  }

  @include mobile {
    width: 100%;
  }
}
.user {
  width: 180px;
  padding: 12px 0;
  @include mobile {
    width: 100%;
    padding-top: 0;
  }
}
</style>
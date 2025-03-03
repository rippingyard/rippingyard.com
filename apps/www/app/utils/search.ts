﻿﻿import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { Post, PostAsSearchResult } from '~/schemas/post';

export const hitToPost = (item: PostAsSearchResult): Post => {
  return {
    id: item.objectID,
    slug: item.objectID,
    content: item.content,
    createdAt: Timestamp.fromDate(dayjs(item.createdAt * 1000).toDate()),
    publishedAt: Timestamp.fromDate(dayjs(item.publishedAt * 1000).toDate()),
    updatedAt: Timestamp.fromDate(dayjs(item.updatedAt * 1000).toDate()),
    status: item.status,
    type: item.type,
    isPublic: item.isPublic,
    isDeleted: item.isDeleted,
    tags: [], // 検索結果にタグ情報がない場合は空配列を設定
    items: [],
    // Post型で必須のsuggestedTagsプロパティを追加
    suggestedTags: [], // デフォルトは空配列
    // オプショナルだがよく使われるプロパティ
    count: {
      favorite: 0,
      bookmark: 0,
      pageview: 0,
    },
  };
};

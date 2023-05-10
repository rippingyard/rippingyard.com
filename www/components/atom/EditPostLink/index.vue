<template>
  <client-only>
    <p v-if="canEdit" class="link">
      <nuxt-link :to="link">編集する</nuxt-link>
    </p>
  </client-only>
</template>
<script setup lang="ts">
import { isClient } from '@vueuse/shared';
import { useCanEditPost } from '~/composables/permission/useCanEditPost';
import { usePostEditLink } from '~/composables/link/usePostEditLink';
import { OriginalPost } from '~/schemas/post';

const props = defineProps<{
  post: OriginalPost;
}>();

const canEdit = ref(false);
const link = usePostEditLink(props.post);

onMounted(async () => {
  if (isClient) {
    console.log('props.post on editlink', props.post);
    const { canEditPost } = useCanEditPost(props.post);
    canEdit.value = canEditPost.value;
  }
});
</script>
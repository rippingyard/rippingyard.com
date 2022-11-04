<template>
  <div>
    {{ count }}
    <button @click="increment">+++</button>
  </div>
</template>
<script lang="ts" setup>
import { usePosts } from '~~/composables/firebase/usePosts'
const count = ref<number>(0);
const increment = () => count.value++;

onMounted(() => {
  console.log('Mounted!');
})

const { data, isLoading } = usePosts();
console.log('getPosts', data.value, isLoading);

</script>
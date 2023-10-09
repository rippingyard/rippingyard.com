<template>
  <div class="items">
    <template v-if="items.length">
      <button class="item" :class="classes(index)" v-for="(item, index) in items" :key="index" @click="selectItem(index)">
        {{ item }}
      </button>
    </template>
    <div v-else class="item">
      No result
    </div>
  </div>
</template>
<script setup lang="ts">
import { SuggestionKeyDownProps } from '@tiptap/suggestion';

type Item = string;

const props = defineProps<{
  items: Item[];
  command: (item: {
    id: Item
  }) => void;
}>();

const classes = (index: number) => {
  return {
    'is-selected': index === selectedIndex.value,
  };
};

const items = computed(() => props.items);
const selectedIndex = ref<number>(0);

watch(items, () => selectedIndex.value = 0);

const onKeyDown = ref(({ event }: SuggestionKeyDownProps) => {

  console.log('event', event);

  if (event.key === 'ArrowUp') {
    upHandler();
    return true;
  }

  if (event.key === 'ArrowDown') {
    downHandler();
    return true;
  }

  if (event.key === 'Enter') {
    enterHandler();
    return true;
  }

  return false;
});

const upHandler = () => {
  selectedIndex.value = ((selectedIndex.value + items.value.length) - 1) % items.value.length
};

const downHandler = () => {
  selectedIndex.value = (selectedIndex.value + 1) % items.value.length
};

const enterHandler = () => {
  selectItem(selectedIndex.value);
};

const selectItem = (index: number) => {
  const item = items.value[index];

  if (item) {
    props.command({ id: item });
  }
};

defineExpose({
  onKeyDown,
});
</script>

<style lang="scss">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0px 10px 20px rgba(0, 0, 0, 0.1),
  ;
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>
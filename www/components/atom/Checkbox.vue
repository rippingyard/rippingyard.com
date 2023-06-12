<template>
  <span class="checkbox" :class="{ 'checked': isChecked }">{{ label }}</span>
</template>
<script setup lang="ts">
const props = defineProps<{
  isChecked?: boolean;
  label?: string;
}>();

const isChecked = computed(() => props.isChecked || false);
const label = computed(() => props.label || '');

// const toggle = () => isChecked.value = !isChecked.value;
</script>
<style lang="scss" scoped>
.checkbox {
  // visibility: hidden;
  cursor: pointer;
  // line-height: 1.4;

  &::before {
    content: '';
    visibility: visible;
    border-radius: 0;
    border: 2px solid $black;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    box-shadow: 0 0 0 1px $white inset;
    margin-right: 5px;
    // transition: all 100ms 0s ease-out;
  }

  &:hover::before {
    cursor: pointer;
    // background-color: $yellow;
  }

  &.checked::before {
    background-color: $black;
  }

  &.checked:hover::before {
    cursor: pointer;
    // background-color: $gray-black;
  }
}
</style>
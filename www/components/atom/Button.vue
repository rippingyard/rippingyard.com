<template>
  <button class="button" :class="classes">
    <slot />
  </button>
</template>
<script lang="ts" setup>

const props = defineProps<{
  expanded?: boolean;
  centered?: boolean;
}>();

const classes = {
  expanded: props.expanded,
  centered: props.centered,
};

</script>
<style scoped lang="scss">
.button {
  padding: 10px 18px;
  border: 2px solid $black;
  font-weight: 800;
  display: inline-block;
  color: $black;

  &.expanded {
    width: 100%;
  }

  &.centered {
    text-align: center;
  }

  &.light {
    color: $white;
    border-color: $white;
  }

  &.twitter {
    background-color: rgb(29, 155, 240);

    &:hover {
      background-color: rgba(29, 155, 240, 0.6);
    }
  }

  &:hover {
    background-color: $yellow;
    // color: $yellow;
  }

  &.is-wide {
    width: 100%;
  }

  &.is-oneline {
    line-height: 1;
  }

  &.no-border {
    border: none;

    &:hover {
      background-color: transparent;
      color: $gray-black;
    }
  }

  &.is-disabled {
    opacity: 0.35;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }
}

.buttons {
  display: flex;
}
</style>
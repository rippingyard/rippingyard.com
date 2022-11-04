<template>
  <div class="field">
    <label v-if="label" v-html="label" />
    <slot />
  </div>
</template>
<script lang="ts" setup>
const { label } = defineProps<{
  label?: string
}>()
</script>
<style lang="scss" scoped>
.field {
  position: relative;
  padding-bottom: 40px;

  &.widget {
    padding-bottom: 20px;
  }

  :deep()>label {
    display: block;
    font-size: 0.9rem;
    font-weight: 800;
    opacity: 0.8;
  }

  .error {
    color: $white;
    font-size: 0.8rem;
    padding: 5px;
    margin-top: 5px;
    background-color: $red;
    position: absolute;
    left: 0;
    bottom: 8px;

    &::after {
      content: "";
      border-style: solid;
      border-width: 7px;
      border-color: transparent transparent $red transparent;
      position: absolute;
      top: -7px;
      transform: translateY(-50%);
      left: 20px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &.dark {
    .input {
      border-color: $white;
    }
  }
}
</style>
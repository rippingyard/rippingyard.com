<template>
  <div class="manifest bg-dotted">
    <h2 v-html="props.title"></h2>
    <p class="caption" v-html="props.subtitle"></p>
  </div>
</template>
<script lang="ts" setup>

type Props = {
  title: string;
  subtitle: string;
}

const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.manifest {
  // background-color: $black;
  border-bottom: 1px solid $black;
  padding: $navMargin * 0.75 $navMargin * 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  // min-height: $navSize;
  >h2 {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 3px;
  }

  >.caption {
    font-size: 0.8rem;
  }
}
</style>
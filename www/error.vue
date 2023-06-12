<template>
  <div class="wrapper">
    <OrganismNav />
    <BlockMain>
      <BlockHeading>
        <h1>{{ error.statusCode }}</h1>
      </BlockHeading>
      <p>{{ error.statusMessage }}</p>
    </BlockMain>
    <OrganismFooter />
  </div>
</template>
<script lang="ts" setup>
import { Ref } from 'nuxt/dist/app/compat/vue-demi';

type Props = {
  error: Ref<{
    data: string;
    message: string;
    stack: string;
    statusCode: string;
    statusMessage: string;
    url: string;
  }>;
};

// eslint-disable-next-line vue/no-setup-props-destructure
const { error } = defineProps<Props>();

console.log('Error', error);

</script>
<style lang="scss">
html,
body {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: $black;
  font-family: $font-normal;
  background-color: $white;
}
</style>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: auto;
  // background-color: #111;
}

h1 {
  font-size: 16rem;
  font-weight: 100;
  line-height: 0.8;
}
</style>
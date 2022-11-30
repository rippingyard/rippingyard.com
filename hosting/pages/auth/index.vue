<template>
  <div class="frame">
    <div class="header">
      <div class="brand">
        <SvgLogo />
      </div>
    </div>
    <ResetPassword v-if="mode === 'resetPassword'" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgLogo from '~/assets/img/logo.svg'

type Mode = 'resetPassword'

type DataType = {
  mode?: Mode
}

export default Vue.extend({
  components: { SvgLogo },
  data(): DataType {
    return {
      mode: undefined,
    }
  },
  mounted(): void {
    const { mode } = this.$route.query as {
      mode: Mode
    }
    if (!['resetPassword'].includes(mode))
      throw new Error('ページが見つかりません')
    this.mode = mode
  },
  layout: 'empty',
  head(): any {
    return {
      title: 'Authenticate',
    }
  },
})
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 40px 0 80px;
  .brand {
    width: 34px;
    > svg {
      width: 100%;
      height: auto;
    }
  }
}
</style>

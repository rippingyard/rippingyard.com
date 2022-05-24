<template>
  <div class="header">
    <div class="inner">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  margin: 0 auto $navMargin;

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: $navMargin;
    padding-left: $navMargin;
    background-color: $black;
  }

  @include until($desktop) {
    margin: 0;
    .inner {
      background: none;
      height: 18px;
    }
  }
}

.box {
  width: 6px;
  height: 18px;
  bottom: -9px;
  position: absolute;
  &:nth-of-type(1) {
    right: 30px;
    background-color: $yellow;
  }
  &:nth-of-type(2) {
    right: 36px;
    background-color: $blue;
  }
  &:nth-of-type(3) {
    right: 42px;
    background-color: $orange;
  }
  &:nth-of-type(4) {
    right: 48px;
    background-color: $green;
  }
  @include until($desktop) {
    bottom: 0;
    &:nth-of-type(1) {
      right: 0;
    }
    &:nth-of-type(2) {
      right: 6px;
    }
    &:nth-of-type(3) {
      right: 12px;
    }
    &:nth-of-type(4) {
      right: 18px;
    }
  }
}
</style>

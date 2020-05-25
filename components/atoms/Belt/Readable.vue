<template>
  <div class="screen">
    <div class="belt"></div>
  </div>
</template>

<style lang="scss" scoped>

.belt {
  width: 105%;
  height: 600px;
  background-color: $yellow;
  position: absolute;
  top: -320px;

  // width: 400px;

  display: inline-block;
  transform: skewY(-8deg);
}

.screen {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: $white;
  top: 0;
  left: 0;
  overflow: hidden;
}

</style>
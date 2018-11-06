<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/css/bass.scss";
  @import "./assets/css/variable.scss";
body {
  min-width: 1280px;
  font-family:MicrosoftYaHei;
  font-size: $normal_size;
}
</style>

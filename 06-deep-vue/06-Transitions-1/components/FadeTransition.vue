<template>
  <transition name="fade" mode="out-in">
    <slot v-on="$listeners" v-bind="$attrs" />
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
  inheritAttrs: false,
};
</script>

<style scoped>
.fade-enter-active {
  animation: fade 0.2s ease-in;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

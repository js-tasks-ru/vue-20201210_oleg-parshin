<template>
  <base-button
    :tag="tag"
    :block="block"
    :class="{ button_block: block }"
    class="button_danger"
    @click="click"
  >
    <slot />
  </base-button>
</template>

<script>
import options from './options';
import BaseButton from './BaseButton';
export default {
  name: 'DangerButton',
  components: {
    BaseButton,
  },
  ...options,
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>

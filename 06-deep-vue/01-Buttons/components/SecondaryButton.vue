<template>
  <base-button
    :tag="tag"
    :block="block"
    :class="{ button_block: block }"
    class="button_secondary"
    @click="click"
  >
    <slot />
  </base-button>
</template>

<script>
import options from './options';
import BaseButton from './BaseButton';
export default {
  name: 'SecondaryButton',
  components: {
    BaseButton,
  },
  ...options,
};
</script>

<style scoped>
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>

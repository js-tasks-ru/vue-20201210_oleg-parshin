<template>
  <base-button
    :tag="tag"
    :block="block"
    :class="{ button_block: block }"
    class="button_primary"
    @click="click"
  >
    <slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';
import options from './options';
export default {
  name: 'PrimaryButton',
  components: {
    BaseButton,
  },
  ...options,
};
</script>

<style scoped>
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>

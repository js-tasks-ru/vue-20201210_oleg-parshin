<template>
  <base-button
    :tag="tag"
    :block="block"
    :class="{ button_block: block }"
    class="button_secondary"
    v-bind="$attrs"
    v-on="$listeners"
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
  mixins: [options],
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

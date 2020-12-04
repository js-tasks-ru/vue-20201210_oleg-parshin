<template>
  <div>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped></style>

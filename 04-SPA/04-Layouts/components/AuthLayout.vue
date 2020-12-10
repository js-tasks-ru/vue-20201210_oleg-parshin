<template>
  <div>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped></style>

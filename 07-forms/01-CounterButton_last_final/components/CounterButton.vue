<template>
  <button type="button" @click="onClick">{{ count }}</button>
</template>

<script>
export default {
  model: {
    prop: 'count',
    event: 'increment',
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onClick() {
      this.$emit('increment', ++this.count);
    },
  },
};
</script>

<style></style>

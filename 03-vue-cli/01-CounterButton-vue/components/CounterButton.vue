<template>
  <button type="button" @click="onClick">{{ count }}</button>
</template>

<script>
export default {
  model: {
    prop: 'count',
    event: 'click',
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

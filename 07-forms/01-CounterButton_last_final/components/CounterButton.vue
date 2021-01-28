<template>
  <button type="button" @click="onClick">{{ count_ }}</button>
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
  data() {
    return {
      count_: this.count,
    };
  },
  watch: {
    count(newVal) {
      this.count_ = newVal;
    },
  },
  methods: {
    onClick() {
      this.$emit('increment', ++this.count_);
    },
  },
};
</script>

<style></style>

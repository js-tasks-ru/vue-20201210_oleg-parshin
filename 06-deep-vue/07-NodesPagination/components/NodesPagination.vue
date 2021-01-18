<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  render(h) {
    const startIdx = (this.page - 1) * this.perPage;
    const endIdx = startIdx + this.perPage;
    const elemsOnPage = (this.$slots.default || []).slice(startIdx, endIdx);
    return h('div', elemsOnPage);
  },
};
</script>

<style scoped></style>

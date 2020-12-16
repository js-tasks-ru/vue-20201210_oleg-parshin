export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'a', 'router-link'].includes(value);
      },
    },
  },
  methods: {
    click(e) {
      e.preventDefault();
      this.$emit('click', e);
    },
  },
};

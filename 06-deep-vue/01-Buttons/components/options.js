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
};

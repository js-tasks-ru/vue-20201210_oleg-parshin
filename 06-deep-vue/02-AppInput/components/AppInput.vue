<template>
  <div
    class="input-group"
    :class="[
      { 'input-group_icon': leftIconPassed || rightIconPassed },
      { 'input-group_icon-left': leftIconPassed },
      { 'input-group_icon-right': rightIconPassed },
    ]"
  >
    <slot name="left-icon" />

    <component
      v-bind="$attrs"
      v-on="componentListeners"
      :is="tag"
      class="form-control"
      :class="[
        { 'form-control_sm': small },
        { 'form-control_rounded': rounded },
      ]"
      :value="value"
      ref="comp"
    />

    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  data() {
    return {
      slots: this.$slots,
    };
  },
  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: {
      type: Boolean,
      default: false,
    },
    value: String,
  },
  computed: {
    componentListeners() {
      const vm = this;
      return {
        ...this.$listeners,
        input(e) {
          vm.$emit('input', e.target.value);
        },
        change(e) {
          vm.$emit('change', e.target.value);
        },
      };
    },
    tag() {
      return this.multiline ? 'textarea' : 'input';
    },
    leftIconPassed() {
      return !!this.slots['left-icon'];
    },
    rightIconPassed() {
      return !!this.slots['right-icon'];
    },
  },
  watch: {
    value(newV) {
      this.$refs.comp.value = newV;
    },
    slots(newVal) {
      console.log(newVal);
    },
  },
  updated() {
    this.slots = this.$slots;
  },
  mounted() {
    if (this.tag === 'textarea') {
      this.$refs.comp.value = this.value;
    }
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>

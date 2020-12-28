<template>
  <AppInput
    :type="type"
    :value="computedValue"
    v-bind="$attrs"
    v-on="listeners"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
    },
    valueAsDate: Date,
    valueAsNumber: Number,
  },

  computed: {
    computedValue() {
      const date = this.valueAsNumber || this.valueAsDate;
      const { YYYY, MM, DD, hh, mm, ss } = this.getDateComponents(date);
      let value;
      if (this.valueAsDate || this.valueAsNumber) {
        switch (this.type) {
          case 'date':
            value = `${YYYY}-${MM}-${DD}`;
            break;
          case 'datetime-local':
            value = `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
            break;
          case 'time': {
            const step = this.$attrs['step'];
            value = +step % 60 ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
            break;
          }
        }
      } else {
        value = this.value;
      }
      return value;
    },
    listeners() {
      return {
        ...this.$listeners,
        change: ({ target }) => {
          const { value, valueAsDate, valueAsNumber } = target;
          this.$emit(
            'update:valueAsDate',
            valueAsDate || new Date(valueAsNumber),
          );
          this.$emit('update:valueAsNumber', valueAsNumber);
          this.$emit('change', value);
        },
      };
    },
  },

  methods: {
    getDateComponents(d) {
      const date = new Date(d);
      const YYYY = date.getUTCFullYear();
      const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = date.getUTCDate().toString().padStart(2, '0');
      const hh = date.getUTCHours().toString().padStart(2, '0');
      const mm = date.getUTCMinutes().toString().padStart(2, '0');
      const ss = date.getUTCSeconds().toString().padStart(2, '0');
      return { YYYY, MM, DD, hh, mm, ss };
    },
  },
};
</script>

<style scoped></style>

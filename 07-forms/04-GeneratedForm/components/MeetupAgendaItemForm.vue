<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem_.type"
      />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input
            type="time"
            placeholder="00:00"
            :value="agendaItem_.startsAt"
            @input="onInput($event, 'startsAt')"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>
    <form-group
      v-for="input in $options.fieldSpecifications[agendaItem_.type]"
      :key="input.title"
      :label="input.title"
    >
      <component
        :is="input.component"
        v-bind="input.props"
        v-model="agendaItem_[input.field]"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup.vue';

import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
  getAgendaItemLanguageOptions,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  langs: getAgendaItemLanguageOptions(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      agendaItem_: this.agendaItem,
    };
  },
  watch: {
    agendaItem_: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.syncTime(newVal, oldVal);
        }
        this.$emit('update:agendaItem', { ...newVal });
      },
    },
  },
  methods: {
    onInput(e, field) {
      this.agendaItem_ = {
        ...this.agendaItem_,
        [field]: e,
      };
    },
    format(n) {
      return n.length === 1 ? 0 + n : n;
    },
    matchStr(str) {
      return str.match(/\d{2}/g);
    },
    syncTime(newVal, oldVal) {
      let hours = 0;
      let [startsNewH] = this.matchStr(newVal.startsAt);
      let [startsOldH] = this.matchStr(oldVal.startsAt);
      let [endsH] = this.matchStr(this.agendaItem_.endsAt);
      startsNewH = +startsNewH;
      startsOldH = +startsOldH;
      endsH = +endsH;
      let dif = 0;
      if (startsNewH > startsOldH) {
        dif = startsNewH - startsOldH;
      } else {
        dif = 24 + startsNewH - startsOldH;
      }
      hours = (endsH + dif) % 24;
      hours = this.format(hours.toString());
      newVal.endsAt = `${hours}:00`;
    },
  },
};
</script>

<style></style>

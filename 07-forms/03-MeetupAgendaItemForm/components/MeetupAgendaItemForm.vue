<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option disabled value="">Выберете тип</option>
        <option
          v-for="type in $options.agendaItemTypes"
          :key="type.text"
          :value="type.value"
        >
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
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
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ title }}</label>
      <input class="form-control" v-model="agendaItem_.title" />
    </div>

    <div v-if="isTalk" class="form-group">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="agendaItem_.speaker" />
    </div>

    <div v-if="isTalk || isOther" class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaItem_.description"
      ></textarea>
    </div>

    <div v-if="isTalk" class="form-group">
      <label class="form-label">Язык</label>
      <select class="form-control" title="Язык" v-model="agendaItem_.language">
        <option
          v-for="lang in $options.langs"
          :key="lang.text"
          :value="lang.value"
        >
          {{ lang.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },
  agendaItemTypes: getAgendaItemTypes(),
  langs: getTalkLanguages(),
  computed: {
    isTalk() {
      return this.agendaItem_.type === 'talk';
    },
    isOther() {
      return this.agendaItem_.type === 'other';
    },
    title() {
      let title = 'Нестандартный текст (необязательно)';
      switch (this.agendaItem_.type) {
        case 'talk':
          title = 'Тема';
          break;
        case 'other':
          title = 'Заголовок';
          break;
      }
      return title;
    },
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
        [field]: e.target.value,
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

<template>
  <form class="form meetup-form" @submit.prevent="onSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="meetup_.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="meetup_.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <template v-if="meetup_.agenda.length">
        <meetup-agenda-item-form
          vclass="mb-3"
          :key="item.id"
          v-for="(item, idx) in meetup_.agenda"
          :agenda-item.sync="meetup_.agenda[idx]"
          @remove="removeItem(idx)"
        />
      </template>
      <!-- <meetup-agenda-item-form class="mb-3" />-->

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="onCancel"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem(startsAt = '00:00') {
  return {
    id: Math.random(),
    startsAt,
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}
function deepClone(obj) {
  const cloned = {};
  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop]) {
      const c = deepClone(obj[prop]);
      cloned[prop] = c;
    }
    if (obj[prop] instanceof Array) {
      const newArr = obj[prop].map((el) => deepClone(el));
      cloned[prop] = newArr;
    }
    if (obj[prop] == null) {
      cloned[prop] = obj[prop];
    }
    if (typeof obj[prop] !== 'object') {
      cloned[prop] = obj[prop];
    }
  }
  return cloned;
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
  },
  data() {
    return {
      meetup_: deepClone(this.meetup),
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSubmit() {
      const meetup = deepClone(this.meetup_);
      this.$emit('submit', meetup);
    },
    addAgendaItem() {
      let item;
      const isFirstInProgramm = this.meetup_.agenda.length === 0;
      if (isFirstInProgramm) {
        item = buildAgendaItem();
      } else {
        const nextStartsAt = this.meetup_.agenda[this.meetup_.agenda.length - 1]
          .endsAt;
        item = buildAgendaItem(nextStartsAt);
      }
      this.meetup_.agenda.push(item);
    },
    removeItem(idx) {
      this.meetup_.agenda.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>

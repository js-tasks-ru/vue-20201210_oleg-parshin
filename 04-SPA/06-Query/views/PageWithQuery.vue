<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      qView: 'calendar',
      qDate: 'future',
      qParticipation: 'attending',
      qSearch: 'search',
    };
  },
  computed: {
    view: {
      get() {
        return this.qView;
      },
      set(val) {
        this.qView = val;
      },
    },
    date: {
      get() {
        return this.qDate;
      },
      set(val) {
        this.qDate = val;
      },
    },
    participation: {
      get() {
        return this.qParticipation;
      },
      set(val) {
        this.qParticipation = val;
      },
    },
    search: {
      get() {
        return this.qSearch;
      },
      set(val) {
        this.qSearch = val;
      },
    },
  },
  watch: {
    $route(to) {
      for (let key in to.query) {
        this[key] = to.query[key];
      }
    },
    view(val, oldV) {
      if (val !== oldV) {
        this.updateRoute({ view: val });
      }
    },
    date(val, oldV) {
      if (val !== oldV) {
        this.updateRoute({ date: val });
      }
    },
    participation(val, oldV) {
      if (val !== oldV) {
        this.updateRoute({ participation: val });
      }
    },
    search(val, oldV) {
      if (val !== oldV) {
        this.updateRoute({ search: val });
      }
    },
  },
  methods: {
    updateRoute(param) {
      let query = {
        view: this.view,
        date: this.date,
        participation: this.participation,
        search: this.search,
      };
      const key = Object.keys(param)[0];
      query = { ...query, ...{ [key]: param[key] } };
      if (!query.view || query.view === 'list') {
        delete query.view;
      }
      if (!query.date || query.date === 'all') {
        delete query.date;
      }
      if (!query.participation || query.participation === 'all') {
        delete query.participation;
      }
      if (!query.search) {
        delete query.search;
      }
      // выбрал пуш метод, он добавляет в стек истории роут, а риплэйс заменяет
      this.$router.replace({
        path: '/',
        query,
      });
    },
  },
};
</script>

<style scoped></style>

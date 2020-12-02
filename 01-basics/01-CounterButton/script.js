import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    onClick() {
      this.count++;
    },
  },
});

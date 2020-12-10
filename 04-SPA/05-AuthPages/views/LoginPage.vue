<template>
  <form class="form" @submit="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      try {
        const res = await login(this.email, this.password);
        if (res.error) {
          alert(res.message);
          return;
        }
        alert(res.fullname);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped></style>

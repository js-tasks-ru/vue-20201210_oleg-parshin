<template>
  <form class="form" @submit="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="name" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="password2" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input v-model="checked" type="checkbox" /> Я согласен с условиями
        <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login" class="link"> Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      password2: '',
      checked: false,
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.name) {
        alert('Требуется ввести полное имя');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      if (this.password !== this.password2) {
        alert('Пароли не совпадают');
        return;
      }
      if (!this.checked) {
        alert('Требуется согласиться с условиями');
        return;
      }
      try {
        const res = await register(this.email, this.name, this.password);
        if (res.error) {
          alert(res.message);
          return;
        }
        alert(res.id);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped></style>

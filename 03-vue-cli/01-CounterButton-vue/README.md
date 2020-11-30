# CounterButton.vue

Требуется ещё раз создать компонент CounterButton, но теперь как SFC.


- Единственный входной параметр компонента: `count`, значение счётчика (число, по умолчанию 0);
- Компонент выводит кнопку с текущим значением счётчика;
- При клике компонент порождает событие `increment` с новым значением;
- Текущее значение счётчика -- это **модель** компонента.

*Примечание: подразумевается, что компонент работает всегда с переданным `v-model`, и поддерживать его работу **без** `v-model` пока не требуется.*

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/CounterButton.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/03-vue-cli/01-CounterButton-vue](http://localhost:8080/03-vue-cli/01-CounterButton-vue).

✅ Доступно автоматическое тестирование: `npm test CounterButton-vue`.
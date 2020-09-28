/* eslint-disable default-case */
import { VueMaskDirective } from 'v-mask';
import { format } from 'date-fns';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vue2-datepicker/locale/pt-br';

Vue.config.productionTip = false;

Vue.filter('date', (value) => {
  if (!value) return '';
  return format(value, 'dd/MM/yyy - HH:mm');
});

Vue.filter('toLowerCase', (value) => {
  if (!value) return '';
  return value.toLowerCase();
});

Vue.filter('status', (value) => {
  if (!value) return '';
  switch (value.toLowerCase()) {
    case 'cancelado':
      return 'Cancelado';
    case 'agendado':
      return 'Agendado';
    case 'concluido':
      return 'Concluido';
    case 'consulta_realizada':
      return 'Realizada';
    case 'falta':
      return 'Falta';
  }
  return value.toLowerCase();
});

Vue.directive('mask', VueMaskDirective);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

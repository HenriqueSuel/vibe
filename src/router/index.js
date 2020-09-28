import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/cadastro',
    name: 'Cadastrar',
    component: () => import('../views/sing-up/SingUp.vue'),
  },
  {
    path: '/doutor/agendamento',
    name: 'agendamento',
    component: () => import('../views/doctor-appointment/DoctorAppointment'),
  },
  {
    path: '/registro/:id',
    name: 'registro',
    props: true,
    component: () => import('../views/consultation-record/ConsultationRecord'),
  },
  {
    path: '/paciente/agendamento',
    name: 'consulta',
    component: () => import('../views/patient-appointment/PatientAppointment'),
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

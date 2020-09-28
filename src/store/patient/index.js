import router from '@/router';
import { uuid } from 'vue-uuid';

export default {
  state: {
    listPatient: [
      {
        id: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
        nome: 'Henrique',
        cpf: '460.978.918-30',
      },
    ],
    patient: null,
  },
  actions: {
    actionAddPatient({ commit, getters, dispatch }, payload) {
      const patient = getters.findPatientByCpf(payload.cpf);
      if (!patient) {
        commit('addPatient', payload);
        router.push('/');
      } else {
        const toast = {
          title: 'Usuario',
          description: 'Usuario já está cadastrado',
          type: 'info',
        };
        dispatch('GlobalStore/actionToast', toast, { root: true });
      }
    },
    actionPatientLogin({ commit, getters }, payload) {
      const patient = getters.findPatientByCpf(payload);
      if (!patient) return false;
      commit('sessionUser', patient);
      router.push('/paciente/agendamento');
      return patient;
    },
    actionLogoutPatient({ commit }) {
      router.push('/');
      commit('logoutUser');
    },
  },
  mutations: {
    addPatient(state, payload) {
      state.listPatient.push({ ...payload, id: uuid.v4() });
    },
    sessionUser(state, payload) {
      sessionStorage.removeItem('doctor');
      sessionStorage.setItem('patient', JSON.stringify({ ...payload }));
      state.patient = payload;
    },
    logoutUser(state) {
      sessionStorage.removeItem('patient');
      state.patient = null;
    },
  },
  getters: {
    getAllPatient(state) {
      if (!state.listPatient) return [];
      return state.listPatient;
    },
    findPatientByCpf: (state) => (cpf) => state.listPatient.find((patient) => patient.cpf === cpf),

    getPatient(state) {
      if (!state.patient) {
        const patient = JSON.parse(sessionStorage.getItem('patient'));
        if (!patient) {
          return null;
        }
        state.patient = patient;
      }
      return state.patient;
    },
  },
  namespaced: true,
};

/* eslint-disable max-len */
import router from '@/router';

export default {
  state: {
    doctor: null,
    listDoctor: [
      {
        id: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
        nome: 'Henrique Suel',
        crm: '1',
      },
    ],
  },
  actions: {
    actionAddDoctor({ commit, getters, dispatch }, payload) {
      const doctor = getters.findPatientByCRM(payload.crm);
      if (!doctor) {
        router.push('/');
        commit('addDoctor', payload);
      } else {
        const toast = {
          title: 'Usuario',
          description: 'Usuario já está cadastrado',
          type: 'info',
        };
        dispatch('GlobalStore/actionToast', toast, { root: true });
      }
    },
    actionDoctorLogin({ commit, getters }, payload) {
      const doctor = getters.findPatientByCRM(payload);
      if (!doctor) return false;
      commit('sessionUser', doctor);
      router.push('/doutor/agendamento');
      return doctor;
    },
    actionLogoutPatient({ commit }) {
      commit('logoutUser');
    },
  },
  mutations: {
    addDoctor(state, payload) {
      state.listDoctor.push(payload);
    },
    sessionUser(state, payload) {
      sessionStorage.removeItem('patient');
      sessionStorage.setItem('doctor', JSON.stringify({ ...payload }));
      state.doctor = payload;
    },
    logoutUser(state) {
      sessionStorage.removeItem('doctor');
      state.doctor = null;
    },
  },
  getters: {
    getAllDoctor(state) {
      if (!state.listDoctor) return [];
      return state.listDoctor;
    },
    getDoctor(state) {
      if (!state.doctor) {
        const doctor = JSON.parse(sessionStorage.getItem('doctor'));
        if (!doctor) {
          return null;
        }
        state.doctor = doctor;
      }
      return state.doctor;
    },
    findPatientByCRM: (state) => (crm) => state.listDoctor.find((doctor) => doctor.crm === crm),
    findDoctorByName: (state) => (name) => state.listDoctor.filter((doctor) => doctor.nome.toLowerCase().indexOf(name.toLowerCase()) > -1),
  },
  namespaced: true,
};

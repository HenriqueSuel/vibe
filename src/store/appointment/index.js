/* eslint-disable max-len */
import {
  format,
  isEqual,
  differenceInHours,
  isWithinInterval,
} from 'date-fns';

import { uuid } from 'vue-uuid';

export default {
  state: {
    listAppointment: [
      {
        id: 'e6bf0b5d-c924-497d-a75a-d433ade8b60d',
        idDoctor: 'b04c0379-f5aa-41cd-9b66-edf579bf0d5e',
        data: new Date(2020, 8, 25, 14, 0, 0),
        idUser: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
        nameUser: 'henrique Suel',
        status: 'AGENDADO',
        cid: '',
        descricao: '',
      },
    ],
  },
  actions: {
    makeAppointment({
      commit, getters, dispatch, rootGetters,
    }, payload) {
      return new Promise((resolve) => {
        const toast = {
          title: 'Invalido',
          description: 'Essa data nao está disponivel',
          type: 'error',
        };
        const { doctor, date } = payload;
        const hour = format(date, 'HH');
        if (hour < 7 || hour > 18) {
          dispatch('GlobalStore/actionToast', toast, { root: true });
          return resolve(false);
        }
        const isAppointmentAvailable = getters.getDoctorAppointmentByDateFull(doctor.id, date);
        if (isAppointmentAvailable) {
          const patient = rootGetters['PatientStore/getPatient'];
          const appointment = {
            id: uuid.v4(),
            idDoctor: doctor.id,
            data: date,
            idUser: patient.id,
            nameUser: patient.nome,
            status: 'AGENDADO',
            cid: '',
            descricao: '',
          };
          commit('setAppointment', appointment);
          return resolve(true);
        }
        dispatch('GlobalStore/actionToast', toast, { root: true });
        return resolve(false);
      });
    },
    cancelAppointment({ commit, dispatch }, payload) {
      return new Promise((resolve) => {
        const toast = {
          title: 'Error',
          description: 'Desculpe, mas esse agendamento nao pode ser cancelado',
          type: 'error',
        };
        if (differenceInHours(payload.data, new Date()) <= 24) {
          dispatch('GlobalStore/actionToast', toast, { root: true });
          return resolve(false);
        }

        dispatch('GlobalStore/actionToast', { title: 'sucesso', description: 'Agendamento cancelado com sucesso', type: 'sucess' }, { root: true });
        commit('updateAppointment', { ...payload, status: 'CANCELADO' });
        return resolve(true);
      });
    },
    updateStatusAppointment({ commit, dispatch }, payload) {
      return new Promise((resolve) => {
        if (payload.status !== 'CANCELADO') {
          dispatch('GlobalStore/actionToast', { title: 'sucesso', description: 'Agendamento atualizado com sucesso', type: 'sucess' }, { root: true });
          commit('updateAppointment', payload);
          resolve(true);
        } else {
          const toast = {
            title: 'Error',
            description: 'Desculpe, mas esse agendamento nao pode ser atualizado',
            type: 'error',
          };
          dispatch('GlobalStore/actionToast', toast, { root: true });
          resolve(false);
        }
      });
    },
  },
  mutations: {
    setAppointment(state, payload) {
      state.listAppointment.push(payload);
    },
    updateAppointment(state, payload) {
      state.listAppointment = state.listAppointment.map((appointment) => {
        if (appointment.id === payload.id) {
          return payload;
        }
        return appointment;
      });
    },
  },
  getters: {
    getDoctorAppointmentByDateFull: (state) => (idDoctor, date) => !state.listAppointment.some((appointment) => isEqual(appointment.data, date) && appointment.idDoctor === idDoctor),
    getAllPatientAppointment: (state) => (idUser, date) => state.listAppointment.filter((appointment) => (
      format(appointment.data, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
      && appointment.idUser === idUser
    )),
    filterAppointment: (state) => ({ period, name, status }) => {
      // eslint-disable-next-line no-debugger
      debugger;
      const isFilterStatus = status.some((statusActive) => statusActive.value);
      return state.listAppointment.filter((appointment) => appointment.nameUser.toLowerCase().indexOf(name.toLowerCase()) > -1
        && ((!period || period.length < 2) || isWithinInterval(appointment.data, { start: period[0], end: new Date(period[1].setHours(23, 59, 59, 0)) }))
        && (status.some((statusActive) => !isFilterStatus || (statusActive.value && statusActive.name.toLowerCase() === appointment.status.toLowerCase()))));
    },
    findAppointmentById: (state) => (id) => state.listAppointment.find((appointment) => appointment.id === id),
  },
  namespaced: true,
};

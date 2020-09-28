import Vue from 'vue';
import Vuex from 'vuex';
import GlobalStore from './global';
import PatientStore from './patient';
import DoctorStore from './doctor';
import AppointmentStore from './appointment';

const modules = {
  GlobalStore,
  PatientStore,
  DoctorStore,
  AppointmentStore,
};

Vue.use(Vuex);

export default new Vuex.Store({ modules });

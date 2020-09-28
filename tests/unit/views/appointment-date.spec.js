import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueMaskDirective } from 'v-mask';
import Vuex from 'vuex';

import AppointmentDate from '@/views/patient-appointment/components/appointment-date/AppointmentDate.vue';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue(Vuelidate);
localVue.use(Vuex);
localVue.use(Vuelidate);

describe('Login.vue', () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        PatientStore: {
          namespaced: true,
          actions,
          getters,
        },
        DoctorStore: {
          namespaced: true,
          actions,
        },
        AppointmentStore: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });
  });

  it('should valid the hour', () => {
    const wrapper = shallowMount(AppointmentDate, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const isDateValid = wrapper.vm.notBeforeTodayTwelveOClock(new Date(2040, 1, 1, 13, 0, 0));
    expect(isDateValid).toBeFalsy();
    /*     expect(wrapper.html()).toMatchSnapshot(); */
  });

  it('should invalidate the hour', () => {
    const wrapper = shallowMount(AppointmentDate, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const isDateValid = wrapper.vm.notBeforeTodayTwelveOClock(new Date(2020, 1, 1, 0, 0, 0));
    expect(isDateValid).toBeTruthy();
  });

  it('should valid the hour', () => {
    const wrapper = shallowMount(AppointmentDate, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const isDateValid = wrapper.vm.notBeforeTodayTwelveOClock(new Date(2040, 1, 9, 10, 0, 0));
    expect(isDateValid).toBeFalsy();
  });

  it('should valid the date', () => {
    const wrapper = shallowMount(AppointmentDate, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const isDateValid = wrapper.vm.notBeforeToday(new Date(2020, 1, 1));
    expect(isDateValid).toBeTruthy();
  });

  it('should invalidate the date', () => {
    const wrapper = shallowMount(AppointmentDate, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const isDateValid = wrapper.vm.notBeforeToday(new Date(2040, 1, 9));
    expect(isDateValid).toBeFalsy();
  });
});

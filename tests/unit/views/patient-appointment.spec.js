import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueMaskDirective } from 'v-mask';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import PatientAppointment from '@/views/patient-appointment/PatientAppointment.vue';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue(Vuelidate);
localVue.use(Vuex);
localVue.use(Vuelidate);

describe('Login.vue', () => {
  const doctor = { id: '99272cf5-bd9c-4413-b6bf-124ebb45ec80', nome: 'Henrique Suel', crm: '1' };
  const appointment = {
    id: '239fdc6c-d8ef-49ef-859e-9fe66b2d3833', data: '2020-09-26T15:00:00.000Z', idUser: '99272cf5-bd9c-4413-b6bf-124ebb45ec80', nameUser: 'Henrique', status: 'AGENDADO', cid: '', descricao: '',
  };
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    actions = {
      makeAppointment: jest.fn().mockResolvedValue(true),
      cancelAppointment: jest.fn().mockResolvedValue(true),
    };

    getters = {
      getAllPatientAppointment: () => [{ id: '1' }],
      getPatient: jest.fn().mockResolvedValue({ date: new Date(), nameUser: 'henrique' }),
      findDoctorByName: jest.fn().mockResolvedValue({ date: new Date(), nameUser: 'henrique' }),
    };

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

  it('should set a value for the doctor', () => {
    const wrapper = shallowMount(PatientAppointment, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.vm.selectDoctor(doctor);
    expect(wrapper.vm.$data.chosenDoctor.id).toEqual(doctor.id);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set a value for the doctor', async () => {
    const wrapper = shallowMount(PatientAppointment, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.vm.completeAppointment(new Date());
    await flushPromises();
    expect(actions.makeAppointment).toHaveBeenCalled();
  });
  it('Should be reset as variables', () => {
    const wrapper = shallowMount(PatientAppointment, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({ done: true, chosenDoctor: doctor });
    wrapper.vm.resetAppointment();
    expect(wrapper.vm.$data.done).toBeFalsy();
    expect(wrapper.vm.$data.chosenDoctor).toEqual(null);
  });

  it('Should cancel the appointment', async () => {
    const wrapper = shallowMount(PatientAppointment, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({ done: true, chosenDoctor: doctor });
    wrapper.vm.patientCancelAppointment(appointment);
    await flushPromises();
    expect(actions.cancelAppointment).toHaveBeenCalled();
  });
});

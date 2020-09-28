import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DoctorAppointment from '@/views/doctor-appointment/DoctorAppointment.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DoctorAppointment.vue', () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      updateStatusAppointment: jest.fn().mockResolvedValue({ id: '1' }),
    };

    getters = {
      filterAppointment: jest.fn().mockResolvedValue({ date: new Date(), nameUser: 'henrique' }),
    };

    store = new Vuex.Store({
      state: {},
      modules: {
        AppointmentStore: {
          namespaced: true,
          actions,
          getters,
        },
        DoctorStore: {
          namespaced: true,
          actions,
        },
        GlobalStore: {
          namespaced: true,
          actions,
        },
      },
    });
  });
  it('should change the input to cpf', () => {
    const wrapper = shallowMount(DoctorAppointment, {
      stubs: [],
      localVue,
      store,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should return a schedule list', async () => {
    const wrapper = shallowMount(DoctorAppointment, {
      stubs: [],
      localVue,
      store,
      computed: {
        ...getters,
      },
    });

    wrapper.setData({
      filter: {
        period: new Date(),
        name: 'Henrique',
      },
    });

    const buttonSubmit = wrapper.find('button');
    buttonSubmit.trigger('click');
    await flushPromises();
    expect(getters.filterAppointment).toHaveBeenCalled();
  });

  it('should change the status', async () => {
    const wrapper = shallowMount(DoctorAppointment, {
      stubs: [],
      localVue,
      store,
      computed: {
        ...getters,
      },
    });

    wrapper.vm.absence({ id: '123' });
    await flushPromises();
    expect(actions.updateStatusAppointment).toHaveBeenCalled();
  });
});

import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueMaskDirective } from 'v-mask';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import Login from '@/views/login/Login.vue';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue(Vuelidate);
localVue.use(Vuex);
localVue.use(Vuelidate);

describe('Login.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      actionPatientLogin: jest.fn().mockResolvedValue({ id: '1' }),
      actionDoctorLogin: jest.fn().mockResolvedValue({ id: '1' }),
      actionToast: jest.fn().mockResolvedValue(),
    };

    store = new Vuex.Store({
      state: {},
      modules: {
        PatientStore: {
          namespaced: true,
          actions,
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
    const wrapper = shallowMount(Login, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });

    wrapper.vm.$v.$touch();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

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

  it('should login in with the patient', async () => {
    const wrapper = shallowMount(Login, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({ isPatient: true, doc: '460.978.918-30' });
    const buttonSubmit = wrapper.find('button');
    buttonSubmit.trigger('submit');
    await flushPromises();
    expect(actions.actionPatientLogin).toHaveBeenCalled();
    expect(actions.actionToast).not.toHaveBeenCalled();
  });

  it('shouldnt login in with the patient', async () => {
    actions = {
      actionPatientLogin: jest.fn().mockResolvedValue(null),
      actionToast: jest.fn().mockResolvedValue(),
    };

    store = new Vuex.Store({
      state: {},
      modules: {
        PatientStore: {
          namespaced: true,
          actions,
        },
        GlobalStore: {
          namespaced: true,
          actions,
        },
      },
    });
    const wrapper = shallowMount(Login, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({ isPatient: true, doc: '460.978.918-30' });
    const buttonSubmit = wrapper.find('button');
    buttonSubmit.trigger('submit');
    await flushPromises();
    expect(actions.actionPatientLogin).toHaveBeenCalled();
    expect(actions.actionToast).toHaveBeenCalled();
  });

  it('After the user submit button, $v.$invalid return true?', () => {
    const wrapper = shallowMount(Login, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    const loginBtn = wrapper.find('button');
    loginBtn.trigger('submit');
    expect(wrapper.vm.$v.$invalid).toBeTruthy();
  });

  it('should log in with the doctor', async () => {
    const wrapper = shallowMount(Login, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({ isPatient: false, doc: '46097891830' });
    const buttonSubmit = wrapper.find('button');
    buttonSubmit.trigger('submit');
    await flushPromises();
    expect(actions.actionDoctorLogin).toHaveBeenCalled();
  });
});

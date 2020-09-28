import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueMaskDirective } from 'v-mask';
import SingUp from '@/views/sing-up/SingUp.vue';
import Vuelidate from 'vuelidate';
import flushPromises from 'flush-promises';

const localVue = createLocalVue(Vuelidate);
localVue.use(Vuex);
localVue.use(Vuelidate);

describe('SingUp.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      actionAddPatient: jest.fn().mockResolvedValue({ id: '1' }),
      actionAddDoctor: jest.fn().mockResolvedValue({ id: '1' }),
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
      },
    });
  });
  it('should change the input to cpf', () => {
    const wrapper = shallowMount(SingUp, {
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

  it('After the user submit button, $v.$invalid return true?', () => {
    const wrapper = shallowMount(SingUp, {
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

  it('should register in with the patient', async () => {
    const wrapper = shallowMount(SingUp, {
      stubs: ['router-link'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({
      isPatient: true,
      form: {
        doc: '123.456.789-30',
        nome: 'Henrique Suel',
        dataNascimento: new Date(1996, 4, 27),
        sexo: 'm',
      },
    });
    const loginBtn = wrapper.find('button');
    loginBtn.trigger('submit');
    await flushPromises();
    expect(actions.actionAddPatient).toHaveBeenCalled();
  });

  it('should register in with the doctor', async () => {
    const wrapper = shallowMount(SingUp, {
      stubs: ['router-link', 'date-picker', 'KindPerson'],
      directives: {
        mask: VueMaskDirective,
      },
      localVue,
      store,
    });
    wrapper.setData({
      isPatient: false,
      form: {
        doc: '12345678930',
        nome: 'Henrique Suel',
        dataNascimento: new Date(1996, 4, 27),
        sexo: 'm',
      },
    });
    const loginBtn = wrapper.find('button');
    loginBtn.trigger('submit');
    await flushPromises();
    expect(actions.actionAddDoctor).toHaveBeenCalled();
  });

  it('Should return the date is valid', async () => {
    const wrapper = shallowMount(SingUp, {
      stubs: [],
      localVue,
      store,
    });

    const isDateValid = wrapper.vm.disabledBeforeToday(new Date(1996, 6, 27));
    expect(isDateValid).toBeFalsy();
  });

  it('Should return that data is invalid', async () => {
    const wrapper = shallowMount(SingUp, {
      stubs: [],
      localVue,
      store,
    });

    const isDateValid = wrapper.vm.disabledBeforeToday(new Date(2030, 6, 27));
    expect(isDateValid).toBeTruthy();
  });
});

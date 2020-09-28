import store from '../../../src/store/patient';

describe('Store Action - Patient ', () => {
  const toast = {
    title: 'Usuario',
    description: 'Usuario já está cadastrado',
    type: 'info',
  };
  it('should add a patient', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };
    const user = {
      id: '1',
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    jest.spyOn(context.getters, 'findPatientByCpf').mockImplementationOnce(() => null);

    store.actions.actionAddPatient({ ...context }, user);
    expect(context.commit).toHaveBeenCalledWith('addPatient', user);
  });

  it('should not add a patient', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };
    const user = {
      id: '1',
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    jest.spyOn(context.getters, 'findPatientByCpf').mockImplementationOnce(() => user);

    store.actions.actionAddPatient({ ...context }, user);
    expect(context.dispatch).toHaveBeenCalledWith('GlobalStore/actionToast', toast, { root: true });
  });

  it('should log the user', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };
    const user = {
      id: '1',
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    jest.spyOn(context.getters, 'findPatientByCpf').mockImplementationOnce(() => user);

    store.actions.actionPatientLogin({ ...context }, user);
    expect(context.commit).toHaveBeenCalledWith('sessionUser', user);
  });

  it('should not log the user', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };
    const user = {
      id: '1',
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    jest.spyOn(context.getters, 'findPatientByCpf').mockImplementationOnce(() => null);

    const isLogin = store.actions.actionPatientLogin({ ...context }, user);
    expect(isLogin).toBeFalsy();
  });

  it('should log out the user', async () => {
    const context = {
      commit: jest.fn(),
    };
    store.actions.actionLogoutPatient({ ...context });
    expect(context.commit).toHaveBeenCalledWith('logoutUser');
  });
});

describe('Store Mutation - Patient ', () => {
  const state = {
    listPatient: [],
    patient: null,
  };
  it('should add patient', async () => {
    const user = {
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    store.mutations.addPatient(state, user);
    expect(state.listPatient.length).toEqual(1);
  });

  it('should add a logged in patient', async () => {
    const user = {
      nome: 'Suel',
      cpf: '123.123.123-44',
    };
    store.mutations.sessionUser(state, user);
    expect(state.patient.cpf).toEqual(user.cpf);
  });

  it('should reset the logged patient variable', async () => {
    const user = {
      nome: 'Suel',
      cpf: '123.123.123-44',
    };
    store.mutations.sessionUser(state, user);
    store.mutations.logoutUser(state);
    expect(state.patient).toEqual(null);
  });
});

describe('Store Getters - Patient ', () => {
  const state = {
    listPatient: [{
      id: 1,
      nome: 'Suel',
      cpf: '123.123.123-44',
    }],
    patient: {
      id: 1,
      nome: 'Suel',
      cpf: '123.123.123-44',
    },
  };

  it('should seek all patients', () => {
    const listPatient = store.getters.getAllPatient(state);
    expect(listPatient).toEqual(state.listPatient);
  });

  it('should return an empty list', () => {
    const listPatient = store.getters.getAllPatient({ ...state, listPatient: null });
    expect(listPatient.length).toEqual(0);
  });

  it('should add patient', () => {
    const user = {
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    const findUser = store.getters.findPatientByCpf(state)(user.cpf);
    expect(findUser.cpf).toEqual(user.cpf);
  });

  it('should add patient', () => {
    const user = store.getters.getPatient(state);
    expect(user.id).toEqual(user.id);
  });
});

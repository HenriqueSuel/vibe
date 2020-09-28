import store from '../../../src/store/doctor';

describe('Store Action - Doctor ', () => {
  const toast = {
    title: 'Usuario',
    description: 'Usuario já está cadastrado',
    type: 'info',
  };
  it('should add a doctor', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };
    const user = {
      id: '1',
      nome: 'Suel',
      crm: '123.123.123-44',
    };

    jest.spyOn(context.getters, 'findPatientByCRM').mockImplementationOnce(() => null);

    store.actions.actionAddDoctor({ ...context }, user);
    expect(context.commit).toHaveBeenCalledWith('addDoctor', user);
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

    jest.spyOn(context.getters, 'findPatientByCRM').mockImplementationOnce(() => user);

    store.actions.actionAddDoctor({ ...context }, user);
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

    jest.spyOn(context.getters, 'findPatientByCRM').mockImplementationOnce(() => user);

    store.actions.actionDoctorLogin({ ...context }, user);
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

    jest.spyOn(context.getters, 'findPatientByCRM').mockImplementationOnce(() => null);

    const isLogin = store.actions.actionDoctorLogin({ ...context }, user);
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

describe('Store Mutation - Doctor ', () => {
  const state = {
    listDoctor: [],
    doctor: null,
  };
  it('should add doctor', async () => {
    const user = {
      nome: 'Suel',
      cpf: '123.123.123-44',
    };

    store.mutations.addDoctor(state, user);
    expect(state.listDoctor.length).toEqual(1);
  });

  it('should add a logged in doctor', async () => {
    const user = {
      nome: 'Suel',
      crm: '123.123.123-44',
    };
    store.mutations.sessionUser(state, user);
    expect(state.doctor.crm).toEqual(user.crm);
  });

  it('should reset the logged doctor variable', async () => {
    const user = {
      nome: 'Suel',
      crm: '123.123.123-44',
    };
    store.mutations.sessionUser(state, user);
    store.mutations.logoutUser(state);
    expect(state.doctor).toEqual(null);
  });
});

describe('Store Getters - Doctor ', () => {
  const state = {
    listDoctor: [{
      id: 1,
      nome: 'Suel',
      crm: '123.123.123-44',
    }],
    doctor: {
      id: 1,
      nome: 'Suel',
      crm: '123.123.123-44',
    },
  };

  it('should seek all doctor', () => {
    const listDoctor = store.getters.getAllDoctor(state);
    expect(listDoctor).toEqual(state.listDoctor);
  });

  it('should return an empty list', () => {
    const listDoctor = store.getters.getAllDoctor({ ...state, listDoctor: null });
    expect(listDoctor.length).toEqual(0);
  });

  it('should look for a doctor by crm', () => {
    const user = {
      nome: 'Suel',
      crm: '123.123.123-44',
    };

    const findUser = store.getters.findPatientByCRM(state)(user.crm);
    expect(findUser.crm).toEqual(user.crm);
  });

  it('should return the active doctor', () => {
    const user = store.getters.getDoctor(state);
    expect(user.id).toEqual(user.id);
  });

  it('should return the active doctor', () => {
    const listDoctor = store.getters.findDoctorByName(state)('Suel');
    expect(listDoctor.length).toEqual(1);
  });
});

import flushPromises from 'flush-promises';
import store from '../../../src/store/appointment';

describe('Store Action - Appointment ', () => {
  const toast = {
    title: 'Invalido',
    description: 'Essa data nao está disponivel',
    type: 'error',
  };
  const appointment = {
    id: 'e6bf0b5d-c924-497d-a75a-d433ade8b60d',
    idDoctor: 'b04c0379-f5aa-41cd-9b66-edf579bf0d5e',
    data: new Date(2050, 8, 25, 14, 0, 0),
    idUser: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
    nameUser: 'henrique Suel',
    status: 'AGENDADO',
    cid: '',
    descricao: '',
  };

  it('should return false for wrong time', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
    };

    const payload = {
      date: new Date(2020, 5, 10, 0, 0, 0),
      doctor: null,
    };

    store.actions.makeAppointment({ ...context }, payload);
    await flushPromises();
    expect(context.dispatch).toHaveBeenCalledWith('GlobalStore/actionToast', toast, { root: true });
  });

  it('Should a new appointment', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
      rootGetters: {
        'PatientStore/getPatient': { id: 1, nome: 'henrique' },
      },
    };

    const payload = {
      date: new Date(2050, 5, 10, 10, 0, 0),
      doctor: {
        id: 1,
      },
    };

    jest.spyOn(context.getters, 'getDoctorAppointmentByDateFull').mockImplementation(() => true);

    store.actions.makeAppointment({ ...context }, payload);
    await flushPromises();
    expect(context.commit).toHaveBeenCalled();
  });

  it('should not register a new appointment with the same date and time', async () => {
    const context = {
      commit: jest.fn(),
      getters: store.getters,
      dispatch: jest.fn(),
      rootGetters: {
        'PatientStore/getPatient': { id: 1, nome: 'henrique' },
      },
    };

    const payload = {
      date: new Date(2050, 5, 10, 10, 0, 0),
      doctor: {
        id: 1,
      },
    };

    jest.spyOn(context.getters, 'getDoctorAppointmentByDateFull').mockImplementation(() => false);

    store.actions.makeAppointment({ ...context }, payload);
    await flushPromises();
    expect(context.dispatch).toHaveBeenCalledWith('GlobalStore/actionToast', toast, { root: true });
  });

  it('should cancel the appointment', async () => {
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
    };

    store.actions.cancelAppointment({ ...context }, appointment);
    await flushPromises();
    expect(context.commit).toHaveBeenCalledWith('updateAppointment', { ...appointment, status: 'CANCELADO' });
  });
  it('should not cancel the appointment', async () => {
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
    };
    store.actions.cancelAppointment(
      { ...context },
      { ...appointment, data: new Date(2019, 8, 10) },
    );
    await flushPromises();
    expect(context.dispatch).toHaveBeenCalledWith('GlobalStore/actionToast', {
      title: 'Error',
      description: 'Desculpe, mas esse agendamento nao pode ser cancelado',
      type: 'error',
    }, { root: true });
  });

  it('should update the appointment', async () => {
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
    };
    store.actions.updateStatusAppointment(
      { ...context },
      appointment,
    );
    expect(context.commit).toHaveBeenCalledWith('updateAppointment', appointment);
  });
  it('should not update the appointment', async () => {
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
    };
    store.actions.updateStatusAppointment(
      { ...context },
      { ...appointment, status: 'CANCELADO' },
    );
    expect(context.dispatch).toHaveBeenCalledWith('GlobalStore/actionToast', {
      title: 'Error',
      description: 'Desculpe, mas esse agendamento nao pode ser atualizado',
      type: 'error',
    }, { root: true });
  });
});

describe('Store Mutation - Appointment ', () => {
  const appointment = {
    id: 'e6bf0b5d-c924-497d-a75a-d433ade8b60d',
    idDoctor: 'b04c0379-f5aa-41cd-9b66-edf579bf0d5e',
    data: new Date(2050, 8, 25, 14, 0, 0),
    idUser: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
    nameUser: 'henrique Suel',
    status: 'AGENDADO',
    cid: '',
    descricao: '',
  };

  const state = {
    listAppointment: [],
  };
  it('should add appointment', async () => {
    store.mutations.setAppointment(state, appointment);
    expect(state.listAppointment.length).toEqual(1);
  });

  it('should update appointment', async () => {
    state.listAppointment.push(appointment);
    state.listAppointment.push({ ...appointment, id: '123' });
    store.mutations.updateAppointment(state, { ...appointment, status: 'CANCELADO' });
    expect(state.listAppointment[0].status).toEqual('CANCELADO');
  });
});

describe('Store Getters - Appointment ', () => {
  const status = [{
    name: 'Falta',
    value: false,
  },
  {
    name: 'Cancelado',
    value: false,
  },
  {
    name: 'Agendado',
    value: true,
  },
  {
    name: 'Realizada',
    value: false,
  },
  {
    name: 'Concluido',
    value: false,
  }];

  const state = {
    listAppointment: [{
      id: 'e6bf0b5d-c924-497d-a75a-d433ade8b60d',
      idDoctor: 'b04c0379-f5aa-41cd-9b66-edf579bf0d5e',
      data: new Date(2050, 8, 25, 14, 0, 0),
      idUser: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
      nameUser: 'henrique Suel',
      status: 'AGENDADO',
      cid: '',
      descricao: '',
    },
    ],
  };

  it('should return all patients appointments', async () => {
    const data = new Date(2050, 8, 25, 14, 0, 0);
    const id = '99272cf5-bd9c-4413-b6bf-124ebb45ec80';
    const isAvalible = await store.getters.getAllPatientAppointment(state)(id, data);
    expect(isAvalible.length).toEqual(1);
  });
  it('should filter appointments by name, period and status', async () => {
    const period = [new Date(), new Date(2050, 8, 25, 14, 0, 0)];
    const isAvalible = await store.getters.filterAppointment(state)({ period, name: 'henrique', status });
    expect(isAvalible.length).toEqual(1);
  });

  it('should get an appointment by id', async () => {
    const appointment = await store.getters.findAppointmentById(state)('e6bf0b5d-c924-497d-a75a-d433ade8b60d');
    expect(appointment.id).toEqual('e6bf0b5d-c924-497d-a75a-d433ade8b60d');
  });
});

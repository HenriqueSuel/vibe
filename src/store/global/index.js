export default {
  actions: {
    actionToast({ commit }, payload) {
      commit('changeToast', payload);
    },
  },
  state: {
    toast: null,
    isPatient: false,
  },
  mutations: {
    changeToast(state, payload) {
      setTimeout(() => {
        state.toast = null;
      }, 5000);
      state.toast = payload;
    },
    changeIsPatient(state, payload) {
      state.isPatient = payload;
    },
  },
  getters: {
    getToast(state) {
      if (!state.toast) return null;
      return state.toast;
    },
    getIsPatient(state) {
      if (!state.isPatient) return false;
      return state.isPatient;
    },
  },
  namespaced: true,
};

import { createStore } from 'vuex';

export default createStore({
    state: {
      loggedIn: false,
    },
    getters: {
      isLoggedIn(state) {
        return state.loggedIn;
      },
    },
    mutations: {
      setLoggedIn(state, value) {
        state.loggedIn = value;
      },
    },
    actions: {
      setLoggedIn({ commit }, value) {
        console.log('setLoggedIn:', value)
        commit('setLoggedIn', value);
      },
    },
});

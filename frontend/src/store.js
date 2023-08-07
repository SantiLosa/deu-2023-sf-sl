import { createStore } from 'vuex';

export default createStore({
  state: {
    loggedIn: false,
    user: '',
  },

  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
    user(state) {
      return state.user;
    }
  },

  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUser(state, value) {
      state.user = value;
    }
  },
  
  actions: {
    setLoggedIn({ commit }, value) {
      console.log('setLoggedIn:', value)
      commit('setLoggedIn', value);
    },
    setUser({ commit }, value) {
      console.log('setUser: ', value)
      commit('setUser', value)
    }
  },
});

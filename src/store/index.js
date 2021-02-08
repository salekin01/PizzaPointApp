import Vue from 'vue';
import Vuex from 'vuex';
import http from "../http-common";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //isLoggedIn: !!localStorage.getItem('lbUser'),
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            http
                .post("/SignIn", payload) //(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.data.roleId  //user.uid
                        }
                        commit('setUser', newUser)
                        console.log(newUser);
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        logout ({commit}) {
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
});

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
        signBakerUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            http
                .post("/baker", payload)
                .then(
                    user => {
                        commit('setLoading', false)
                        if(user != null && user.data == 1){
                            const newUser1 = {
                                email: payload.email,
                                roleId: 1   //baker roleId
                            }
                            commit('setUser', newUser1)
                        }
                        else{
                            const newUser = {
                                roleId: user.uid,
                            }
                            commit('setUser', newUser)
                        }
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
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            http
                .post("/customer", payload)
                .then(
                    user => {
                        commit('setLoading', false)
                        if(user != null && user.data == 1){
                            const newUser1 = {
                                email: payload.email,
                                roleId: 2   //customer roleId
                            }
                            commit('setUser', newUser1)
                        }
                        else{
                            const newUser = {
                                roleId: user.uid,
                            }
                            commit('setUser', newUser)
                        }
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
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            http
                .post("/SignIn", payload) //(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        if(user != null && user.data != null && user.data.roleId > 0){     //above 0 indicates roleId
                            const newUser1 = {
                                email: payload.email,
                                roleId: user.data.roleId
                            }
                            commit('setUser', newUser1)
                        }
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

import { userService } from '../_services';
import router from '../../router';
// import { router } from '../_helpers';
// router
const user = JSON.parse(localStorage.getItem('user'));
console.log("user", user);

const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: {} };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/fa_question');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/fa_question');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    assertLogin(state) {
        const saved_user = JSON.parse(localStorage.getItem('user'));
        if (saved_user) {
            state.user = saved_user;
            status = { loggedIn: true }
        }
        else {
            state.status = {};
            state.user = {};
        }
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    loginFailure(state) {
        state.status = {};
        state.user = {};
    },
    logout(state) {
        state.status = {};
        state.user = {};
    },
    registerRequest(state, user) {
        state.user = user;
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
        state.status = { loggedIn: true };
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
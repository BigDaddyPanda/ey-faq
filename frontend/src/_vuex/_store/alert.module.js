const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        console.log('success', message);
        commit('success', message);
    },
    error({ commit }, message) {
        console.log('error', message);
        commit('error', message);
    },
    clear({ commit }) {
        console.log('clear');
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.type = 'success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};

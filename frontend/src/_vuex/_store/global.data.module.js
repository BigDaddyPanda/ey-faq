import { apiRes } from "@/utils";
import axios from "axios";
const state = {
    roles: [],
    services: []
};

const actions = {
    initialize({ commit }) {
        // const { data } = await
        axios.get(apiRes('getInitialData')).then(res => commit('setInitData', res.data))
        // commit('setInitData', data);

    },
};

const mutations = {
    setInitData: function (state, data) {
        state.roles = data.roles
        state.services = data.services
    }
};

export const globalData = {
    namespaced: true,
    state,
    actions,
    mutations
};

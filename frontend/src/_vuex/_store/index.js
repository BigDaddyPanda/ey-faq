import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { globalData } from './global.data.module';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        globalData
    }
});
store.dispatch('globalData/initialize')
export default store;
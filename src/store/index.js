import { createStore } from 'vuex';

import user from "./module/user"; // 引入user.js



export default createStore({
    state: {
        //
    },
    getters: {
        isLogin: (state) => state.user.isLogin,
        username: (state) => state.user.username,
        userId: (state) => state.user.userId,
        userInfoObj: (state) => state.user.userInfoObj,
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
    },
});
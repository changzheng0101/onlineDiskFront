import { createStore } from 'vuex';

import file from "./module/file";
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
        selectedColumnList: (state) =>
            state.file.selectedColumnList === null
                ? state.file.allColumnList
                : state.file.selectedColumnList.split(","),
        selectedFiles: (state) => state.file.selectedFiles
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
        file
    },
});
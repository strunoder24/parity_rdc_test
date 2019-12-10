const state = {
    first: 1000000,
    second: 0,
    third: 0
};

const getters = {};

const mutations = {
    setFirst(state, payload) {
        if (payload >= 0) state.first = payload;
    },
    
    setSecond(state, payload) {
        if (payload >= 0) state.second = payload
    },
    
    setThird(state, payload) {
        if (payload >= 0) state.third = payload
    },
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
}
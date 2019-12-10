const state = {
    first: 100,
    second: 1000,
    third: 1000000
};

const getters = {
    getSummary: state => {
        return state.second + state.third
    }
};

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

export default {
    state,
    getters,
    mutations
}
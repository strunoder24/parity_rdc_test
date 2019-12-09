const state = {
    value: 0,
};

const mutations = {
    plus1: state => {
        state.value++
    },

    minus1: state => {
        if (state.value > 1) state.value--
    }
};


export default {
    state,
    mutations
}
const onLoadDelay = 200;
const showIconDelay = 200;
const minimumIconTime = 300;

// Этот скрипт отвественен за прелоадер между асинхронной загрузкой других скриптов
const state = {
    loadInProgress: false,
    showPreloaderIcon: false,

    loadInProgressTimer: Function,
};


const mutations = {
    setLoadInProgress(state, flag) {
        state.loadInProgress = flag;
    },

    setPreloaderIcon(state, flag) {
        state.showPreloaderIcon = flag;
    },

    setLoadInProgressTimer(state, timer) {
        state.loadInProgressTimer = timer
    },

    clearLoadInProgressTimer(state) {
        clearTimeout(state.loadInProgressTimer)
    },

    disableAll(){
        state.loadInProgress = false;
        state.showPreloaderIcon = false;
        clearTimeout(state.loadInProgressTimer);
    }
};

const actions = {
    scriptOnload({state, commit}) {
        const helperContext = {state, commit};
        enablePreloader(helperContext);
        setTimeout(() => {
            enableIcon(helperContext)
        }, onLoadDelay + 10);
    },

    scriptIsLoaded({state, commit}) {
        commit('clearLoadInProgressTimer');

        if (state.showPreloaderIcon) {
            disablePreloaderWithIcon(commit)
        } else {
            commit('disableAll')
        }
    },
};

function enablePreloader({commit}) {
    const timer = setTimeout(() => {
        commit('setLoadInProgress', true)
    }, onLoadDelay);

    commit('setLoadInProgressTimer', timer)
}
function enableIcon({state, commit}) {
    setTimeout(() => {
        //Если спустя showIconDelay скрипты всё ещё грузятся, то можно показать анимацию
        if (state.loadInProgress) {
            console.log('hey');
            commit('setPreloaderIcon', true)
        }
    }, showIconDelay);
}
function disablePreloaderWithIcon(commit) {
    setTimeout(() => {
        commit('disableAll')
    }, minimumIconTime);
}


export default {
    state,
    mutations,
    actions
}
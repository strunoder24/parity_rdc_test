import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import './config/axiosConf';
import 'normalize.css';
import '~/styles/common.sass';

import '~/plugins/icons';

import { store } from './store';
import { router } from './routes';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
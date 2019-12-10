import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './config/axiosConf';
import 'normalize.css';
import '~/styles/common.sass';

import { store } from './store';
import { router } from './routes';

library.add(faAngleUp, faAngleDown, faCaretDown, faCaretUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
import VueRouter from 'vue-router';
import { store } from '~s'

const root = () => import('~p/Root.vue');
const fat = () => import('~p/Fat.vue');
const fattest = () => import('~p/Fattest.vue');

// import Root from '~p/Root.vue'
// import Fat from '~p/Fat.vue'

let mode = '';
if (process.env.NODE_ENV === 'production') {
    mode = 'history';
}


const routes = [
    { path: '/', component: root, name: 'root'},
    { path: '/fat', component: fat, name: 'fat'},
    { path: '/fattest', component: fattest, name: 'fattest'}
];


export const router = new VueRouter({
    routes,
    mode,
});

router.beforeEach((to, from, next) => {
    store.dispatch('scriptOnload');
    next();
});

router.afterEach((to, from) => {
    store.dispatch('scriptIsLoaded');
});
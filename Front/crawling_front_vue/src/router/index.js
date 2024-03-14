import Vue from 'vue';
import Router from 'vue-router';
import HomeRouter from './modules/Home';
import MainRouter from './modules/Main';

Vue.use(Router);

const routes = [
  ...HomeRouter,
  ...MainRouter,
  { path: '*', redirect: '/' },
];

const router = new Router({
  mode: 'history',
  base: '/',
  routes: routes,
});

export default router;

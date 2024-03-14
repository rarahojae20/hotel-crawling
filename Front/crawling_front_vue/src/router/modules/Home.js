const Search = () => import(/* webpackChunkName: "home" */ '../../views/home/Search.vue')


export default [
  {
    path: '/search', component: Search,
    meta: {layout: 'Home', requiresAuth: false,},
  },
]

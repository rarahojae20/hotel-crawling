const Home = () => import(/* webpackChunkName: "home" */ '../../views/home/Home');

const MainRouter = [
  {
    path: '/', name: 'Home', component: Home,
    meta: {layout: 'Home',  requiresAuth: false,}
  }
]

export default MainRouter;

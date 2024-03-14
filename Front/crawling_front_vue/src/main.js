import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko'; // 한국어 설정
import '@/assets/styles/main.scss'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(ElementUI, { locale });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

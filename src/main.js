import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import './assets/global.css'  
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
Vue.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToastr from "vue-toastr";
import LoadingPlugin from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueToastr);
Vue.use(LoadingPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

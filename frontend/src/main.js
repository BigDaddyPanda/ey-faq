import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import store from './_vuex/_store';
import VueScrollTo from 'vue-scrollto'
import CKEditor from '@ckeditor/ckeditor5-vue';
// MyCustomUploadAdapterPlugin
import 'vue-select/dist/vue-select.css';
import VeeValidate from 'vee-validate';
Vue.config.productionTip = false;

Vue.use(NowUiKit);
Vue.use(VueScrollTo);
Vue.use(CKEditor);
Vue.use(VeeValidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
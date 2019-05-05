import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import {
  store
} from './_vuex/_store';
import VueScrollTo from 'vue-scrollto'
import CKEditor from '@ckeditor/ckeditor5-vue';
// MyCustomUploadAdapterPlugin
Vue.config.productionTip = false;

Vue.use(NowUiKit);
Vue.use(VueScrollTo);
Vue.use(CKEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
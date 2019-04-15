import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/src/stylus/app.styl';

new Vue({
  render: h => h(App),
}).$mount('#app')

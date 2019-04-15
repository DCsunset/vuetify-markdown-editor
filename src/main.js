import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

import 'vuetify/src/stylus/app.styl';
import './style.css';

new Vue({
  render: h => h(App),
}).$mount('#app')

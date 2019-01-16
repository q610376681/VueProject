// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
// import index from
// import $ from 'jquery'
Vue.config.productionTip = false
Vue.use(Resource)
/* eslint-disable no-new */

Vue.http.options.emulateJSON = true
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>'
})

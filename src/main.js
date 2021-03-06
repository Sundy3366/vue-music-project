// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
// Vue.config.productionTip = false
import './common/stylus/index.styl'
import VueJsonp from 'vue-jsonp'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import EasyScroll from 'easyscroll';
import VueLazyLoad from 'vue-lazyload'
Vue.use(EasyScroll);
Vue.prototype.$http = axios
Vue.use(VueAwesomeSwiper)
Vue.use(VueJsonp)
Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router
})

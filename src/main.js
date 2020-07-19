import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDDDlYhYAGO5HkgJIA1aZG5EO2yjxsn5XU",
  authDomain: "vue-warehouse.firebaseapp.com",
  databaseURL: "https://vue-warehouse.firebaseio.com",
  projectId: "vue-warehouse",
  storageBucket: "vue-warehouse.appspot.com",
  messagingSenderId: "419793063147",
  appId: "1:419793063147:web:58352aa868bf7f71e942ae"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

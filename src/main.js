import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import dateFilter from "./filters/date.filter";
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


Vue.config.productionTip = false

Vue.filter('date', dateFilter)

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

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
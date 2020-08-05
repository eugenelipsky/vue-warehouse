import Vue from 'vue'
import Vuex from 'vuex'
import list from "./list";
import auth from "./auth";
import groups from './groups';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list, auth, groups
  }
})

import firebase from "firebase/app";
import {firestore} from 'firebase';

export default {
  state: {
    users: [],
    groups: []
  },

  actions: {
    async loginWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        await firebase.auth().signInWithPopup(provider);
        const db = firestore();
        await db.collection('users')
          .doc(`${firebase.auth().currentUser.uid}`)
          .set({
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid,
            photo: firebase.auth().currentUser.photoURL
          })
      } catch (e) {
        console.log(e)
      }
    },
    async logout() {
      await firebase.auth().signOut()
    },
    async setUsers({commit}) {
      await firestore().collection("users")
        .onSnapshot(function (querySnapshot) {
          let users = [];
          querySnapshot.forEach(function (doc) {
            users.push(doc.data())
          })
          commit('setUserInfo', users)
        })
    },
    async setUsersGroups({commit}) {
      await firestore().collection("users")
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('groups')
        .onSnapshot(function (querySnapshot) {
          let userGroups = [];
          querySnapshot.forEach(function (doc) {
            userGroups.push(doc.data())
          })
          commit('setUserGroups', userGroups)
        })
    },
  },
  mutations: {
    setUserInfo(state, info) {
      return state.users = info
    },
    setUserGroups(state, groups) {
      return state.groups = groups
    },
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUserGroups(state) {
      return state.groups
    }
  }
}
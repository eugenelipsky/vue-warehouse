import firebase from "firebase/app";

export default {
  state: {
    user: []
  },
  mutations: {},
  actions: {
    async loginWithGoogle({commit}) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        await firebase.auth().signInWithPopup(provider);
      } catch (e) {
        console.log(e)
      }
    },
    getUID() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut()
    }
  },
  getters: {}
}
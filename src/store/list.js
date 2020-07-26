import firebase, {firestore} from "firebase/app";

export default {
  actions: {
    async setItems({commit}) {
      await firestore().collection("users")
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('list')
        .onSnapshot(function (querySnapshot) {
          let list = [];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data())
          })
          commit('setStoreItems', list)

        })
    }
  },
  mutations: {
    async addItem(state, newItem) {
      try {
        const db = firestore();
        await db.collection('users')
          .doc(`${firebase.auth().currentUser.uid}`)
          .collection('list')
          .doc(`${newItem.id}`)
          .set(newItem)
      } catch (e) {
        throw Error(e)
      }
    },
    async deleteItem(state, id) {
      await firestore().collection('users')
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('list')
        .doc(id)
        .delete().then(function () {
        state.list = state.list.filter(item => item.id !== id);
        console.log(state.list)
      })
    },
    updateItem(state, payload) {
      firestore().collection('users')
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('list')
        .doc(payload.id).update(payload)
        .then(function () {
          console.log('Updated')
        })
        .catch(function (error) {
          console.log('Error', error)
        })
    },
    setStoreItems(state, items) {
      state.list = items;
    },
    clearStore(state) {
      state.list = [];
    }
  },
  state: {
    list: []
  },
  getters: {
    getAllListItems(state) {
      return state.list;
    }
  },
}
import {firestore} from "firebase";

export default {
  actions: {
    async setItems({state, commit}) {
      await firestore().collection("list")
        .onSnapshot(function (querySnapshot) {
          let list = [];
          console.log(querySnapshot)
          querySnapshot.forEach(function (doc) {
            console.log(doc)
            list.push(doc.data());
          })
          commit('setStoreItems', list)
        })
    }
  },
  mutations: {
    async addItem(state, newItem) {
      try {
        let db = firestore();
        await db.collection('list').doc(`${newItem.id}`).set(newItem)
        console.log(state.list)
      } catch (e) {
        throw Error(e)
      }

    },
    deleteItem(state, id) {
      firestore().collection("list").doc(id).delete().then(function () {
        state.list = state.list.filter(item => item.id !== id);
        console.log(state.list)
      })
    },
    updateItem(state, payload) {
      firestore().collection("list").doc(payload.id).update(payload)
        .then(function () {
          console.log('Updated')
        })
        .catch(function (error) {
          console.log('Error', error)
        })
    },
    setStoreItems(state, items) {
      state.list = items;
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
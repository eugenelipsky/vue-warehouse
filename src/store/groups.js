import firebase, {firestore} from 'firebase';

export default {
  state: {
    groups: [],
    productList: [],
    userList: [],
    members: []
  },
  actions: {
    async setGroups({commit}) {
      await firestore().collection("groups")
        .onSnapshot(function (querySnapshot) {
          let group = [];
          querySnapshot.forEach(function (doc) {
            group.push(doc.data())
          })
          commit('setStoreGroups', group)

        })
    },
    async setProducts({commit}, route) {
      await firestore().collection("groups")
        .doc(`${route}`)
        .collection('list')
        .onSnapshot(function (querySnapshot) {
          let list = [];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data())
          })
          commit('setGroupProducts', list)
        })
    },
    async setMembers({commit}, route) {
      await firestore().collection("groups")
        .doc(`${route}`)
        .collection('members')
        .onSnapshot(function (querySnapshot) {
          let members = [];
          querySnapshot.forEach(function (doc) {
            members.push(doc.data())
          })
          commit('setGroupMembers', members)
        })
    },
  },
  mutations: {
    async addGroup(state, group) {
      try {
        const db = firestore();
        await db.collection('groups')
          .doc(`${group.id}`)
          .set(group)
      } catch (e) {
        console.log('Group API Error ', e)
      }
    },
    async addGroupProduct(state, product) {
      try {
        const db = firestore();
        await db.collection('groups')
          .doc(`${product.groupId}`)
          .collection('list')
          .doc(`${product.id}`)
          .set(product)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteProduct(state, product) {
      await firestore().collection('groups')
        .doc(`${product.routeId}`)
        .collection('list')
        .doc(product.id)
        .delete().then(function () {
          state.productList = state.productList.filter(item => item.id !== id);
          console.log(state.productList)
        })
    },
    updateProduct(state, payload) {
      firestore().collection('groups')
        .doc(`${payload.routeId}`)
        .collection('list')
        .doc(payload.id).update(payload)
        .then(function () {
          console.log('Updated')
        })
        .catch(function (error) {
          console.log('Error', error)
        })
    },
    async addMember(state, member) {
      try {
        const db = firestore();
        await db.collection('groups')
          .doc(`${member.groupId}`)
          .collection('members')
          .doc(`${member.id}`)
          .set(member)
        await db.collection('users')
          .doc(`${member.id}`)
          .collection('groups')
          .doc(`${member.groupId}`)
          .set({groupId: member.groupId, memberId: member.id})
      } catch (e) {
        console.log(e)
      }
    },
    async deleteMember(state, member) {
      await firestore().collection('groups')
        .doc(`${member.groupId}`)
        .collection('members')
        .doc(`${member.id}`)
        .delete().then(function () {
          console.log(state.members)
        })
      await firestore().collection('users')
        .doc(`${member.id}`)
        .collection('groups')
        .doc(`${member.groupId}`)
        .delete().then(function () {
          console.log(state.members)
        })
    },
    setStoreGroups(state, groups) {
      state.groups = groups;
    },
    setGroupProducts(state, products) {
      state.productList = products
    },
    setGroupMembers(state, members) {
      state.members = members
    }
  },
  getters: {
    getGroups(state) {
      return state.groups
    },
    getProducts(state) {
      return state.productList
    },
    getGroupMembers(state) {
      return state.members
    }
  }
}
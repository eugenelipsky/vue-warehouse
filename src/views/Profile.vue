<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <img class="user_img" v-bind:src="photo" alt="">
            <span class="card-title">{{name}}</span>
            <span v-show="authorized"><strong>E-mail: </strong>{{email}}</span>
          </div>
          <div class="card-action">
            <a href="#" @click="socialSignOut">Выйти</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase/app";
  import {mapActions} from "vuex";

  export default {
    name: "Profile",
    methods: {
      ...mapActions(['logout']),
      socialSignOut() {
        this.logout().then((res) => {
          this.$router.replace('login')
        })
      }
    },
    data: () => ({
      name: '',
      email: '',
      photo: '',
      authorized: false
    }),
    mounted() {
      firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
          this.authorized = true;
          this.name = user.displayName
          this.email = user.email
          this.photo = user.photoURL
        } else {
          this.authorized = false;
        }
      });
    }
  }
</script>

<style scoped>
  .user_img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
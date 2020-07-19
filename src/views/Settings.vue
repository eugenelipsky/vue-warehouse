<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <img class="user_img" v-bind:src="photo" alt="">
            <span class="card-title">{{authorized ? name : 'Авторизация'}}</span>
            <span v-show="authorized"><strong>E-mail: </strong>{{email}}</span>
            <p v-show="!authorized">Войдите пожалуйста в ваш аккаунт, чтобы сохранить свои данные.</p>
          </div>
          <div class="card-action">
            <a href="#" v-show="!authorized" @click="socialLogin">Авторизоваться с помощью Google OAuth</a>
            <a href="#" v-show="authorized" @click="socialSignOut">Выйти</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: "Settings",
    methods: {
      socialLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.$router.replace('list')
        })
        .catch((err) => {
          console.log(err);
        })
      },
      socialSignOut() {
        firebase.auth().signOut().then((result) => {
          this.$router.replace('list')
          this.authorized = false;

        }).catch(function(error) {
          // An error happened.
        });
      }
    },
    data: () => ({
      name: '',
      email: '',
      photo: '',
      authorized: false
    }),
    mounted() {
      let user = firebase.auth().currentUser;
      if (user !== null) {
        this.authorized = true;
        this.name = user.displayName
        this.email = user.email
        this.photo = user.photoURL
      }
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
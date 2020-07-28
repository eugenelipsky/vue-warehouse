<template>
  <div class="pa-4 text-center">
    <v-img
      class="mb-4"
      contain
      height="128"
      src="https://cdn.vuetifyjs.com/images/logos/v.svg"
    ></v-img>
    <h3 class="title font-weight-light mb-2">Добро пожаловать в Warehouse</h3>
    <span class="caption grey--text">Пожалуйста авторизуйтесь</span>
    <div class="my-2">
      <v-btn x-large color="success" @click="socialLogin" dark>Авторизоваться с помощью Google аккаунта</v-btn>
    </div>
  </div>
<!--  <div class="container">-->
<!--    <div class="row login__block">-->
<!--      <div class="col s12 m12">-->
<!--        <div class="card blue-grey darken-1">-->
<!--          <div class="card-content white-text">-->
<!--            <span class="card-title">Авторизация</span>-->
<!--            <p>Войдите пожалуйста в ваш аккаунт, чтобы сохранить свои данные.</p>-->
<!--          </div>-->
<!--          <div class="card-action">-->
<!--            <a href="#" @click="socialLogin">Авторизоваться с помощью Google OAuth</a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: "Settings",
    methods: {
      ...mapActions(['loginWithGoogle', 'logout']),
      socialLogin() {
        this.loginWithGoogle().then((res) => {
          this.$router.replace('/')
        })
      },
      socialSignOut() {
       this.logout().then((res) => {
         this.$router.replace('login')
       })
      }
    }
  }
</script>

<style scoped>
  .col {
    /*position: absolute; */
  }
  .login__block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
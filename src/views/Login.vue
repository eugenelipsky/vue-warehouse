<template>
    <div class="pa-4 text-center vertical">
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
  .vertical {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
  }
</style>
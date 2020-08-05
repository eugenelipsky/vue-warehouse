<template>
<div>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-item two-line v-if="authorized" link to="/profile">
        <v-list-item-avatar>
          <img :src="photo">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Вы не авторизованы</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/list">
        <v-list-item-action>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Товары</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/groups">
        <v-list-item-action>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Группы</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn v-show="authorized" @click="socialSignOut" block>Выйти</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar
    app
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
  </v-app-bar>
</div>
</template>
<script>
  import firebase from 'firebase/app';
  import {mapActions} from 'vuex';

  export default {
    name: 'navbar',
    data: () => ({
      drawer: null,
      name: '',
      email: '',
      photo: '',
      authorized: false
    }),
    methods: {
      ...mapActions(['logout']),
      socialSignOut() {
        this.logout().then((res) => {
          this.$router.replace('login')
        })
      }
    },
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
  nav {
    background-color: rgba(66, 178, 198, 0.8);
  }

  nav .brand-logo {
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 2.1rem;
    padding: 0;
    margin-left: 10px;
  }
</style>
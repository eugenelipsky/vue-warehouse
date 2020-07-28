<template>
  <div>
    <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
    >
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
      >
        <v-row>
          <v-col
            class="text-right"
            cols="12"
          >

          </v-col>
          <v-row
            class="pa-4"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <h3 class="headline">{{ name }}</h3>
              <span class="grey--text text--lighten-1">{{ title }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Имя"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="email"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="autoUpdate"
          :loading="isUpdating"
          color="blue-grey darken-3"
          depressed
          @click="snackbar = true"
        >
          <v-icon left>mdi-update</v-icon>
          Обновить
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Пока не работает.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
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
      authorized: false,
      snackbar: false
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
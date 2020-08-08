<template>
  <div>
    <router-view></router-view>
    <v-btn style="z-index: 9999"
           class="add_btn"
           @click="sheet = !sheet"
           color="success"
           dark
           fixed
           top
           right
           fab
           v-if="$route.path === '/groups'">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center">
        <v-card>
          <form @submit.prevent="submitHandler" id="add-group-form">
            <v-card-title class="headline">Создать группу</v-card-title>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-text-field
                    v-model="title"
                    label="Название"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <v-text-field
                    v-model="shortDescription"
                    label="Краткое описание"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="description"
                    label="Полное описание"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" form="add-group-form" color="green darken-1" text>Создать группу</v-btn>
              <v-btn color="red darken-1" text @click="sheet = !sheet">Закрыть</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>

</template>

<script>
  import {mapMutations} from 'vuex';
  import firebase from 'firebase/app'

  export default {
    name: "Groups",
    data: () => ({
      show: false,
      sheet: false,
      title: '',
      description: '',
      shortDescription: '',
    }),
    mounted() {
      this.$store.dispatch('setGroups')
      this.$store.dispatch('setItems')
      this.$store.dispatch('setUsers')
      this.$store.dispatch('setUsersGroups')
      this.$store.dispatch('setMembers')
    },
    methods: {
      ...mapMutations(['addGroup']),
      uniqueID() {
        return '_' + Math.random().toString(36).substr(2, 9);
      },
      submitHandler() {
        if (this.title !== '' && this.description !== '') {
          this.addGroup({
            id: this.uniqueID(),
            title: this.title,
            shortDescription: this.shortDescription,
            description: this.description,
            owner: firebase.auth().currentUser.uid
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="group of userGroups"
          :key="group.id"
          cols="12"
          md="4"
        >
          <v-card
            max-width="344"
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ group.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ group.description }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="purple"
                text
                :to="({ path: `/groups/${group.id}/group-info`})"
              >
                Войти
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import {mapGetters} from 'vuex';
import * as firebase from 'firebase';

export default {
  name: "GroupsList",
  methods: {},
  computed: {
    ...mapGetters(['getGroups', 'getUsers', 'getUserGroups']),
    userGroups() {
      let groups = []
      this.getUserGroups.filter(user => {
        this.getGroups.filter(group => {
          if (group.id === user.groupId && user.memberId === firebase.auth().currentUser.uid || group.owner === firebase.auth().currentUser.uid) {
            if (groups.includes(group)) {
              return groups
            } else
              groups.push(group)
          }
        })
      })
      return groups
    }
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>
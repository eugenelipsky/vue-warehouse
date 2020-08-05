<template>
  <v-card
    class="mx-auto"
  >
    <v-list>

      <v-list-item
        v-for="user in getUsers"
        :key="user.uid"
        :ripple="false">
        <v-list-item-avatar>
          <v-img :src="user.photo"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon
        >
          <v-btn
            v-if="!membersContains.includes(user.uid)"
            @click="addGroupMember(user.uid)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            v-if="membersContains.includes(user.uid)"
            @click="deleteMember({groupId: $route.params.id, id: user.uid})">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

  </v-card>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "GroupMembers",
  data: () => ({
    members: null,
    addedMember: '',
  }),
  computed: {
    ...mapGetters(['getUsers', 'getGroupMembers']),
    membersContains() {
      return this.getGroupMembers.map(member => {
        return member.id
      })
    }
  },
  methods: {
    ...mapMutations(['addMember', 'deleteMember']),
    ...mapActions(['setMembers']),
    addGroupMember(user) {
      this.addedMember = user;
      this.addMember({
        groupId: this.$route.params.id,
        id: user
      })
      this.$store.dispatch('setUsersGroups');
      console.log('Added')
    },
  },
  mounted() {
    this.$store.dispatch('setUsers')
    this.setMembers(this.$route.params.id)
    console.log(this.membersContains)
  }
}
</script>

<style scoped>

</style>
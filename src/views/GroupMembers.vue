<template>
  <div>
    <v-row class="mx-auto">
      <v-col>
        <BackButton/>
      </v-col>
      <v-col class="text-right">
          <v-btn
            dark
            small
            color="green"
            :to="({ path: `/groups/${$route.params.id}/group-members/admins`})"
          >
            Администратор
          </v-btn>
      </v-col>
    </v-row>
    <v-card
      class="mx-auto"
    >
      <v-list>

        <v-list-item
          v-for="user in getUsers"
          :key="user.uid"
          :ripple="false"
          v-if="owner !== user.uid"
        >
          <v-list-item-avatar>
            <v-img :src="user.photo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
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
  </div>

</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import BackButton from '@/components/BackButton'

export default {
  name: "GroupMembers",
  components: {
    BackButton
  },
  data: () => ({
    members: null,
    addedMember: '',
    owner: ''
  }),
  computed: {
    ...mapGetters(['getUsers', 'getGroupMembers', 'getGroups', 'getUserGroups']),
    membersContains() {
      return this.getGroupMembers.map(member => {
        return member.id
      })
    },

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
    ownerContains() {
      return this.getGroups.map(group => {
        this.owner = group.owner
      })
    }
  },
  mounted() {
    this.$store.dispatch('setGroups')
    this.setMembers(this.$route.params.id)
    this.ownerContains()
  },

}
</script>

<style scoped>

</style>
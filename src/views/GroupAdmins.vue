<template>
  <div>
    <h2>Администоратор</h2>
    <v-row>
      <v-col>
        <BackButton/>
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
        >
          <v-list-item-avatar>
            <v-img :src="user.photo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn
              v-if="owner !== user.uid"
              @click="setAdmin({id: user.uid, route: $route.params.id})"
            >
              Назначить админом
            </v-btn>
            <v-btn disabled
              v-if="owner === user.uid">
              Администратор
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
    owner: []
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
    ...mapMutations(['addMember', 'deleteMember', 'setAdministrator']),
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
      this.getGroups.forEach(group => {
        if (group.id === this.$route.params.id){
          return this.owner = group.owner
        }
      })
    },
    setAdmin (info) {
      this.setAdministrator(info)
      this.$router.replace(`/groups`)
    },
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
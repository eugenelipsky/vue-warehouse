<template>
  <v-app id="inspire">

    <Navbar />
    <v-main>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">Warehouse &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar';
  export default {
    name: 'App',

    components: {
      Navbar
    },

    data: () => ({
      //
    }),
  };
</script>
<style lang="scss">
</style>

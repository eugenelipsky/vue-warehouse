<template>
    <div class="app">
        <Navbar/>
        <router-view />
    </div>
</template>

<script>
  import Navbar from "./components/Navbar";

  export default {
    components: {
      Navbar
    },
    data: () => ({
      list: []
    }),
    methods: {
      submitHandler() {
        const newItem = {
          id: Date.now(),
          title: this.title,
          description: this.description,
          price: this.price
        }
        this.list.push(newItem)
      }
    }
  }
</script>

<style>
    @import "~materialize-css/dist/css/materialize.min.css";
</style>
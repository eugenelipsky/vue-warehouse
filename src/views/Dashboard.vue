<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h4>Товары</h4>
      </div>
    </div>

    <div class="row">
      <div class="col s4 m4 cards">
        <div class="card" v-for="product of getAllListItems">
          <div class="card-image">
            <img class="product__img" :src="product.photoUrl">
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <div class="product__price">{{product.price}}$</div>
            <span class="card-title">{{product.title}}</span>
            <p>{{product.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Dashboard",
    data: () => ({}),
    computed: mapGetters(['getAllListItems']),
    methods: {},
    mounted() {
      this.$store.dispatch('setItems')
    }
  }
</script>

<style scoped>
  .container {
    width: 90%;
  }

  .card .card-image {
    padding: 10px;
  }

  .card .card-image img {
    object-fit: cover;
    height: 250px;
    max-width: 195px;
    margin: 0 auto;
  }

  .card .card-content {
    position: relative;
  }

  .product__price {
    margin: 20px 0;
    color: tomato;
    font-size: 20px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    grid-gap: 20px;
  }
</style>
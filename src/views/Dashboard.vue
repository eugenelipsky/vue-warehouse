<template>
  <div class="container">
    <div class="row">
      <div class="col s3">
        <form @submit.prevent="submitHandler">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">shopping_bag</i>
              <input type="text" id="product-title" class="product-title" v-model="title">
              <label for="product-title">Название товара</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">description</i>
              <input type="text" id="product-descr" class="product-descr" v-model="description">
              <label for="product-descr">Описание товара</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">description</i>
              <input type="text" id="product-price" class="product-price" v-model="price">
              <label for="product-price">Цена</label>
            </div>
          </div>
          <div class="row">
            <button type="submit" class="btn waves-effect waves-light">Сохранить
              <i class="material-icons right">save</i>
            </button>
          </div>
        </form>
      </div>

      <div class="col s9">
        <table class="striped" v-if="getAllListItems.length">
          <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="item of getAllListItems" :key="item.id">
            <td>{{item.title}}</td>
            <td>{{item.description}}</td>
            <td>{{item.price}}</td>
          </tr>
          </tbody>
        </table>
        <p class="nothing__to-show" v-else>Вы еще ничего не добавили</p>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    name: "Dashboard",
    data: () => ({
      title: '',
      description: '',
      price: null
    }),
    computed: mapGetters(['getAllListItems']),
    methods: {
      ...mapMutations(['addItem', 'deleteItem']),
      submitHandler() {
        if (this.id !== '' && this.title !== '' && this.description !== '' && this.price !== null)
          this.addItem({
            id: Date.now(),
            title: this.title,
            description: this.description,
            price: this.price
          });

        this.title = this.description = this.price = '';
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: 0 15px;
  }

  .nothing__to-show {
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
    text-decoration: underline;
  }

  td {
    max-width: 700px;
    word-break: break-word;
  }
</style>
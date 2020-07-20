<template>
  <div class="container">
    <div class="row">
      <div class="input-field col s12">
        <select ref="select" v-model="select">
          <option value="DATE" selected>Сначала новые</option>
          <option value="DATE_OLD">Сначала старые</option>
          <option value="ALPH">По алфавиту</option>
          <option value="ASC">Цены по возрастанию</option>
          <option value="DESC">Цены по убыванию</option>
        </select>
        <label>Сортировка</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Всего товаров: <strong>{{getAllListItems.length}}</strong></p>
      </div>
    </div>
    <table class="striped" v-if="getAllListItems.length">
      <thead>
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Цена</th>
      </tr>
      </thead>
      <tbody>
<!--      <Loader v-if="loading" />-->
        <tr v-for="(item, index) of filteredList" :key="item.id">
          <td>
            <span v-show="item.id !== editedItem">{{`${index + 1}. ${item.title}`}}</span>
            <input type="text" v-model="item.title" v-show="item.id === editedItem">
          </td>
          <td>
            <span v-show="item.id !== editedItem">{{item.description}}</span>
            <input type="text" v-model="item.description" v-show="item.id === editedItem">
          </td>
          <td>
            <span v-show="item.id !== editedItem">{{item.price}}</span>
            <input type="number" v-model="item.price" v-show="item.id === editedItem">
          </td>
          <td>
            <button @click="deleteItem(item.id)"
                    class="waves-effect waves-light btn-small">
              <i class="material-icons right">delete</i>Удалить
            </button>
            <button
              @click="editItem(item.id)"
              v-show="item.id !== editedItem"
              class="waves-effect waves-light btn-small edit-btn">
              <i class="material-icons right">edit</i>Изменить
            </button>
            <button
              @click="saveItemEdit({id: item.id, title: item.title, description: item.description, price: item.price})"
              v-show="item.id === editedItem"
              class="waves-effect waves-light btn-small edit-btn">
              <i class="material-icons right">save</i>Сохранить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Вы еще не добавили товаров</p>
    <div class="fixed__action-btn">
      <a href="#modal1" class="btn-floating btn-large halfway-fab waves-effect waves-light teal modal-trigger">
        <i class="material-icons">add</i>
      </a>
    </div>
    <!-- Edit Structure -->
    <!-- Modal 1 Structure -->
    <div id="modal1" class="modal bottom-sheet" ref="modal">
      <form @submit.prevent="submitHandler">
        <div class="modal-content">
          <div class="col s12">
            <div class="row">
              <div class="input-field col s4">
                <input id="title" type="text" class="validate" v-model="title">
                <label for="title">Название</label>
              </div>
              <div class="input-field col s4">
                <input id="description" type="text" class="validate" v-model="description">
                <label for="description">Описание</label>
              </div>
              <div class="input-field col s4">
                <input id="descr" type="text" class="validate" v-model="price">
                <label for="descr">Цена</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="waves-effect waves-green btn-flat">Добавить товар</button>
          <a href="#!" class="modal-close waves-effect waves-red btn-flat">Закрыть</a>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "List",
    computed: {
      ...mapGetters(['getAllListItems']),
      filteredList() {
        if (this.select === 'DATE') {
          return this.getAllListItems.sort((a, b) => (Number(a.id) > Number(b.id)) ? -1 : 1)
        }
        if (this.select === 'DATE_OLD') {
          return this.getAllListItems.sort((a, b) => (Number(a.id) > Number(b.id)) ? 1 : -1)
        }
        if (this.select === 'ALPH') {
          return this.getAllListItems.sort((a, b) => (console.log(a, b)) ? 1 : -1)
        }
        if (this.select === 'ASC') {
          return this.getAllListItems.sort((a, b) => (Number(a.price) > Number(b.price)) ? 1 : -1)
        }
        if (this.select === 'DESC') {
          return this.getAllListItems.sort((a, b) => (Number(a.price) > Number(b.price)) ? -1 : 1)

        }
      }
    },
    data: () => ({
      select: 'DATE',
      title: '',
      description: '',
      price: null,
      editedItem: null
    }),
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select, {})
      M.Modal.init(this.$refs.modal, null);
      this.select = 'DATE';
      this.$store.dispatch('setItems')
    },
    methods: {
      ...mapMutations(['addItem', 'deleteItem', 'updateItem']),
      submitHandler() {
        if (this.id !== '' && this.title !== '' && this.description !== '' && this.price !== null){
          this.addItem({
            id: Date.now().toString(),
            title: this.title,
            description: this.description,
            price: Number(this.price)
          });

        }
        this.title = this.description = this.price = '';
      },
      editItem(item) {
        this.editedItem = item;
        console.log(item)
      },
      saveItemEdit(payload) {
        this.updateItem(payload);
        this.editedItem = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  td {
    max-width: 700px;
    word-break: break-word;
  }

  .fixed__action-btn {
    position: fixed;
    right: 15px;
    bottom: 23px;
    z-index: 999;
    padding-top: 15px;
    margin-bottom: 30px;
  }

  .teal {
    background-color: rgba(66, 178, 198, 0.8) !important;
  }

  .edit-btn {
    margin-left: 15px;
  }

</style>
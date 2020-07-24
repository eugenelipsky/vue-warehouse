<template>
  <div class="container">
    <div class="row">
      <div class="input-field col s12">
        <select ref="select" v-model="select">
          <option value="ALPH" selected>По алфавиту</option>
          <option value="DATE_NEW" selected>По дате добавления</option>
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
        <th>Фото</th>
        <th>Описание/Дата</th>
        <th>Цена</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) of filteredList" :key="item.id"
          @mouseover="rowIndex = index"
          @mouseleave="rowIndex = -1"
      >
        <td>
          <span v-show="item.id !== editedItem">{{`${index + 1}. ${item.title}`}}</span>
          <input type="text" v-model="item.title" v-show="item.id === editedItem">
        </td>
        <td>
          <img class="product__img" :src="item.photoUrl">
        </td>
        <td>
          <span v-show="item.id !== editedItem">{{item.description}}</span>
          <input type="text" v-model="item.description" v-show="item.id === editedItem">
        </td>
        <td>
          <span v-show="item.id !== editedItem">{{`${item.price}$`}}</span>
          <input type="number" v-model="item.price" v-show="item.id === editedItem">
        </td>
        <td>
          <div class="datetime" v-show="true">
            <span>{{item.date | date('datetime')}}</span>
          </div>
          <div class="controls_column" v-show="rowIndex === index">
            <i class="material-icons right icon_delete"
               @click="deleteItem(item.id)">delete</i>
            <i class="material-icons right icon_edit"
               @click="editItem(item.id)"
               v-show="item.id !== editedItem">edit</i>
            <i class="material-icons right icon_save"
               @click="saveItemEdit({
               id: item.id,
               title: item.title,
               description: item.description,
               price: item.price,
               date: new Date().getTime()})"
               v-show="item.id === editedItem">save</i>
          </div>
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
            <div class="row modal_row">
              <div class="input-field col s3">
                <input id="title" type="text" class="validate" v-model="title">
                <label for="title">Название</label>
              </div>
              <div class="input-field col s3">
                <input id="description" type="text" class="validate" v-model="description">
                <label for="description">Описание</label>
              </div>
              <div class="input-field col s3">
                <input id="descr" type="text" class="validate" v-model="price">
                <label for="descr">Цена</label>
              </div>
              <div class="file-field input-field s3">
                <div class="btn">
                  <span>Фото</span>
                  <input type="file" @change="onFileSelected">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" ref="photo_upload">
                </div>
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
  import firebase from 'firebase'

  export default {
    name: "List",
    computed: {
      ...mapGetters(['getAllListItems']),
      filteredList() {
        if (this.select === 'DATE_NEW') {
          return this.getAllListItems.sort((a, b) => (a.date > b.date) ? 1 : -1)
        }
        if (this.select === 'ALPH') {
          return this.getAllListItems.sort((a, b) => (a.title > b.title) ? 1 : -1)
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
      select: 'ALPH',
      title: '',
      description: '',
      price: null,
      editedItem: null,
      rowIndex: -1,
      selectedFile: null,
      photoUrl: ''
    }),
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select, {})
      M.Modal.init(this.$refs.modal, null);
      this.select = 'ALPH';
      this.$store.dispatch('setItems')
    },
    beforeDestroy() {
      this.clearStore()
    },
    methods: {
      ...mapMutations(['addItem', 'deleteItem', 'updateItem', 'clearStore']),
      uniqueID() {
        return '_' + Math.random().toString(36).substr(2, 9);
      },
      async submitHandler() {
        let storageRef = firebase.storage().ref(`images/${this.selectedFile.name}`)
        await storageRef.put(this.selectedFile).then(function (snapshot) {
          console.log('Uploaded', snapshot)
        })

        let storage = firebase.storage();
        this.photoUrl = await storage.ref('images/' + this.selectedFile.name).getDownloadURL();
        console.log(this.photoUrl)

        if (this.id !== '' && this.title !== '' && this.description !== '' && this.price !== null) {
          this.addItem({
            id: this.uniqueID(),
            date: new Date().getTime(),
            title: this.title,
            description: this.description,
            price: Number(this.price),
            photoUrl: this.photoUrl
          });
        }
        this.title = this.description = this.price = this.$refs.photo_upload.value = '';

      },
      editItem(item) {
        this.editedItem = item;
      },
      saveItemEdit(payload) {
        this.updateItem(payload);
        this.editedItem = false;
      },
      onFileSelected(event) {
        return this.selectedFile = event.target.files[0];
      }
    },
  }
</script>

<style lang="scss" scoped>
  td {
    max-width: 700px;
    min-width: 190px;
    word-break: break-word;
    position: relative;
  }

  tr {
    height: 70px;
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

  .controls_column {
    margin-right: auto;
  }

  .product__img {
    width: 80px;
  }

  .icon_delete, .icon_edit, .icon_save {
    color: #888;
    cursor: pointer;
  }

  .icon_delete:hover {
    color: tomato;
  }

  .icon_edit:hover {
    color: cadetblue;
  }

  .icon_save:hover {
    color: forestgreen;
  }

  .datetime {
    position: absolute;
    top: 0;
    right: 2px;
    font-size: 12px;
    color: #888;
  }

  .container {
    width: 90%;
  }

  .modal_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
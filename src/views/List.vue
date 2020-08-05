<template>
  <div>
    <v-card class="mb-4">
      <v-row class="mx-auto m4" cols="12" sm="12">
        <v-col class="mx-auto m4" cols="12" sm="9" md="9">
          <v-text-field v-model="search"
                        flat
                        hide-details
                        label="Поиск"
                        prepend-inner-icon="mdi-magnify"
                        solo-inverted></v-text-field>
        </v-col>
        <v-col class="mx-auto m4" cols="12" sm="3" md="3">
          <v-select v-model="select"
                    :items="selectItems"
                    item-value="abbr"
                    item-text="name"
                    flat
                    hide-details
                    solo-inverted
                    label="Сортировка"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col>
        <p>Всего товаров: <strong>{{getAllListItems.length}}</strong></p>
      </v-col>
    </v-row>
    <v-card
      v-if="getAllListItems.length"
      class="mx-auto">
      <v-list three-line>
        <template v-for="(item, index) of filteredList">
          <v-list-item
            :key="item.id"
            @mouseover="rowIndex = index"
            @mouseleave="rowIndex = -1"
            @click=""
            :ripple="false">
            <v-list-item-avatar>
              <v-img class="product_image" :src="item.photoUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title" v-show="item.id !== editedItem"></v-list-item-title>
              <v-row class="mx-auto m4" cols="12" sm="12">
                <v-col class="mx-auto" cols="12" sm="12">
                  <v-text-field
                    v-model="item.title"
                    v-show="item.id === editedItem"
                    label="Название"
                    single-line
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-list-item-subtitle v-html="item.description" v-show="item.id !== editedItem"></v-list-item-subtitle>
              <v-row class="mx-auto m4" cols="12" sm="12">
                <v-col class="mx-auto m4" cols="12" sm="12">
                  <v-text-field
                    v-model="item.description"
                    v-show="item.id === editedItem"
                    label="Описание"
                    single-line
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mx-auto m4" cols="12" sm="12">
                <v-col class="mx-auto m4" cols="12" sm="12">
                  <v-text-field
                    v-model="item.price"
                    v-show="item.id === editedItem"
                    label="Цена"
                    single-line
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-content v-show="item.id !== editedItem">
              <v-list-item-title v-html="item.price + '$'" v-show="item.id !== editedItem"></v-list-item-title>
            </v-list-item-content>
            <div class="datetime" v-show="item.id !== editedItem">
              <span>{{item.date | date('datetime')}}</span>
            </div>
            <v-list-item-action v-show="rowIndex === index">
              <v-btn v-on:click="editItem(item.id)" v-show="item.id !== editedItem" icon>
                <v-icon color="grey lighten-1">mdi-circle-edit-outline</v-icon>
              </v-btn>
              <v-btn v-on:click="saveItemEdit({
                           id: item.id,
                           title: item.title,
                           description: item.description,
                           price: item.price,
                           date: new Date().getTime(),
                           photoUrl: item.photoUrl})"
                     v-show="item.id === editedItem"
                     icon>
                <v-icon color="grey lighten-1">mdi-content-save</v-icon>
              </v-btn>
              <v-btn v-on:click="deleteItem(item.id)" v-show="item.id !== editedItem" icon>
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-row v-else>
      <v-col>
        <p>Вы еще не добавили товаров</p>
      </v-col>
    </v-row>
    <v-btn style="z-index: 9999"
           @click="sheet = !sheet"
           color="success"
           dark
           fixed
           top
           right
           fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center">
        <v-card>
          <form @submit.prevent="submitHandler" id="add-product-form">
            <v-card-title class="headline">Добавить товар</v-card-title>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-text-field
                    v-model="title"
                    label="Название"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6">
                  <v-text-field
                    v-model="price"
                    type="number"
                    label="Цена"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="description"
                    label="Описание"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12">
                  <v-file-input show-size
                                :rules="rules"
                                required
                                accept="image/*"
                                label="Фото товара"
                                v-model="selectedFile"></v-file-input>
                  <v-progress-linear
                    v-show="showProgress"
                    v-model="uploadProgress"
                    color="blue-grey"
                    height="25"
                  >
                    <template v-slot="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </v-progress-linear>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" form="add-product-form" color="green darken-1" text>Добавить товар</v-btn>
              <v-btn color="red darken-1" text @click="sheet = !sheet">Закрыть</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
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
        let searchList = this.getAllListItems.filter(product => {
          return product.title.toLowerCase().includes(this.search.toLowerCase().trim())
        })
        // if (this.select === 'DATE_NEW') {
        //   return searchList.sort((a, b) => (a.date > b.date) ? 1 : -1)
        // }
        // if (this.select === 'ALPH') {
        //   return searchList.sort((a, b) => (a.title.localeCompare(b.title)))
        // }
        if (this.select === 'ASC') {
          return searchList.sort((a, b) => (Number(a.price) > Number(b.price)) ? 1 : -1)
        }
        if (this.select === 'DESC') {
          return searchList.sort((a, b) => (Number(a.price) > Number(b.price)) ? -1 : 1)
        } else {
          return searchList
        }
      }
    },
    data: () => ({
      select: ['ASC', 'DESC'],
      selectItems: [
        // {name: 'По алфавиту', abbr: 'DATE_NOW'},
        // {name: 'По дате добавления', abbr: 'ALPH'},
        {name: 'Цены по возрастанию', abbr: 'ASC'},
        {name: 'Цены по убыванию', abbr: 'DESC'},
      ],
      title: '',
      description: '',
      price: null,
      editedItem: null,
      rowIndex: -1,
      selectedFile: null,
      photoUrl: '',
      uploadProgress: 0,
      showProgress: false,
      search: '',
      drawer: false,
      sheet: false,
      rules: [
        v => !!v || 'Это поле обязательное']
    }),
    mounted() {
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
      async submitHandler(e) {
        let storageRef = firebase.storage().ref(`images/${this.selectedFile.name}`).put(this.selectedFile)
        await storageRef.on('state_changed', snapshot => {
          this.uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.showProgress = true
        }, error => {
          console.log(error)
        }, () => {
          this.uploadProgress = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.photoUrl = url;

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
            this.title = this.description = this.price = '';
            this.selectedFile = null
            this.uploadProgress = 0;
            this.showProgress = false;
          })
        })
      },
      editItem(item) {
        this.editedItem = item;
      },
      saveItemEdit(payload) {
        this.updateItem(payload);
        this.editedItem = false;
      },

    }
  }
</script>

<style lang="scss" scoped>
  .datetime {
    position: absolute;
    top: 0;
    right: 2px;
    font-size: 12px;
    color: #888;
  }

  $list-item-two-line-min-height: 80px !default;
</style>
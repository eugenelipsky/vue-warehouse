<template>
  <div>
    <BackButton />
    <v-alert
      class="mt-3"
      prominent
      type="error"
      v-show="adminAlert"
    >
      <v-row align="center">
        <v-col class="grow">
          Вы не можете покинуть группу, так как являетесь администратором.
          Перейдите в настройки и передайте права администоратора другому пользователю, перед тем как покинуть группу.
        </v-col>
        <v-col class="shrink">
          <v-btn
            :to="({ path: `/groups/${$route.params.id}/group-members/admins`})"
            @click="adminAlert = false"
          >Назначить администратора</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-speed-dial
      v-model="fab"
      style="z-index: 9999"
      @click="sheet = !sheet"
      color="success"
      dark
      fixed
      top
      right
      fab
      direction="bottom"
      transition="slide-y-transition"
    >
      <template v-slot:activator>
        <v-btn
          right
          top
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-btn
        @click="sheet = !sheet"
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        :to="({ path: `/groups/${$route.params.id}/group-members`})"
        v-show="groupOwner"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        :to="({ path: `/groups/${$route.params.id}/group-edit`})"
        v-show="groupOwner"

      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-container>
      <v-row v-for="group of groupInfo" class="indigo lighten-5">
        <v-col>
          <v-row class="mx-auto align-center">
            <v-icon class="mr-2 ml-2">mdi-account-group-outline</v-icon>
            Имя группы: <span class="font-weight-bold ml-2">{{ group.title }}</span>
            <v-spacer></v-spacer>
            Участников: <span class="font-weight-medium mr-2 ml-1">{{ getGroupMembers.length }}</span>
            Товаров: <span class="font-weight-medium mr-2 ml-1">{{ getProducts.length }}</span>
            <v-spacer></v-spacer>
            <v-btn
              class="mr-2"
              dark
              small
              color="red"
              @click="groupOwner ? adminAlert = true : leaveGroup($route.params.id)"
            >
              Покинуть группу
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col
            v-for="product of getProducts"
            :key="product.id"
            cols="12"
            md="4"
          >
            <v-card
              max-width="344"
            >
              <v-img
                :src="`${product.photoUrl}`"
                height="200px"
              ></v-img>

              <v-card-title v-show="product.id !== editMode">
                {{ product.title }}
              </v-card-title>
              <v-col cols="12" sm="12" md="12" v-show="product.id === editMode">
                <v-text-field
                  v-model="product.title"
                  label="Название"
                ></v-text-field>
              </v-col>

              <v-card-subtitle v-show="product.id !== editMode">
                {{ product.description }}
              </v-card-subtitle>
              <v-col cols="12" sm="12" md="12" v-show="product.id === editMode">
                <v-text-field
                  v-model="product.description"
                  label="Описание"
                ></v-text-field>
              </v-col>

              <v-card-title class="red--text text--darken-3" v-show="product.id !== editMode">
                {{ product.price }}
              </v-card-title>
              <v-col cols="12" sm="12" md="12" v-show="product.id === editMode">
                <v-text-field
                  v-model="product.price"
                  label="Цена"
                ></v-text-field>
              </v-col>

              <v-card-actions>
                <v-btn
                  color="blue"
                  text
                  v-show="product.id !== editMode"
                  @click="editItem(product.id)"
                >
                  Редактировать
                </v-btn>
                <v-btn
                  color="green"
                  text
                  v-show="product.id === editMode"
                  @click="saveItemEdit({
                  id: product.id,
                  routeId: $route.params.id,
                  title: product.title,
                  description: product.description,
                  price: product.price
                  })"
                >
                  Сохранить
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="deleteProduct({routeId: $route.params.id, id: product.id})"
                >
                  Удалить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
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
import {mapActions, mapGetters, mapMutations} from 'vuex';
import firebase from 'firebase';
import BackButton from '@/components/BackButton'

export default {
  name: "GroupInfo",
  components: {
    BackButton
  },
  data: () => ({
    fab: false,
    title: '',
    description: '',
    price: null,
    photoUrl: '',
    selectedFile: '',
    showProgress: false,
    uploadProgress: 0,
    sheet: false,
    rules: [v => !!v || 'Это поле обязательное'],
    editMode: false,
    groupOwner: null,
    adminAlert: false
  }),
  computed: {
    ...mapGetters(['getGroups', 'getProducts', 'getGroupMembers']),
    groupInfo() {
      return this.getGroups.filter(item => item.id === this.$route.params.id)
    },
  },
  mounted() {
    this.setProducts(this.$route.params.id)
    this.setMembers(this.$route.params.id)
    this.$store.dispatch('setGroups')
    this.ownerContains()
    console.log(this.groupOwner)
  },
  beforeDestroy() {
    this.clearGroupProducts()
  },
  methods: {
    ...mapMutations(['addGroupProduct', 'deleteProduct', 'updateProduct', 'deleteMember', 'clearGroupProducts']),
    ...mapActions(['setProducts', 'setMembers']),
    uniqueID() {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    async submitHandler() {
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
            this.addGroupProduct({
              id: this.uniqueID(),
              groupId: this.$route.params.id,
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
      this.editMode = item;
    },
    saveItemEdit(payload) {
      this.updateProduct(payload);
      this.editMode = false;
    },
    ownerContains() {
      return this.getGroups.map(group => {
        if (group.id === this.$route.params.id) {
          this.groupOwner = group.owner === firebase.auth().currentUser.uid
        }
      })
    },
    leaveGroup(groupId) {
      this.deleteMember({groupId, id: firebase.auth().currentUser.uid})
      this.$router.push('/groups')
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <div>
    <span class="back_btn indigo--text indigo-text" @click="goBack"><v-icon class="icon indigo--text">mdi-arrow-left</v-icon>Назад</span>
  </div>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .back_btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .icon {
    margin-right: 5px;
  }
</style>
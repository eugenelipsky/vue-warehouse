<template>
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Warehouse</router-link>
        <ul class="right hide-on-med-and-down">
          <router-link to="/"
                       exact
                       tag="li"
                       active-class="active">
            <a href="#">Главная</a>
          </router-link>
          <router-link to="/list"
                       exact
                       tag="li"
                       active-class="active">
            <a href="#">Список товаров</a>
          </router-link>
          <router-link to="/profile"
                       exact
                       tag="li"
                       active-class="active">
            <a href="#">Профиль</a>
          </router-link>
        </ul>
      </div>
    </nav>
</template>
<script>
  export default {
    name: 'navbar'
  }
</script>
<style scoped>
  nav {
    background-color: rgba(66, 178, 198, 0.8);
  }

  nav .brand-logo {
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 2.1rem;
    padding: 0;
    margin-left: 10px;
  }
</style>
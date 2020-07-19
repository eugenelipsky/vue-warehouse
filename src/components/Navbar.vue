<template>
    <nav class="nav-extended">
        <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Warehouse</a>
            <ul class="right hide-on-med-and-down">
                <router-link
                        v-for="link of links"
                        :key="link.url"
                        tag="li"
                        active-class="active"
                        :to="link.url"
                        :exact="link.exact">
                    <a href="#">{{link.title}}</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>
<script>
  export default {
    name: 'navbar',
    data: () => ({
      links: [
        {title: 'Главная', url: '/', exact: true},
        {title: 'Список товаров', url: '/list'},
        {title: 'Настройки', url: '/settings'}
      ]
    })
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
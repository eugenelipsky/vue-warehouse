import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/app',
    name: 'App',
    component: () => import('../App'),
    meta: {
      hideForAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth);

  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login');
  } else if (hideForAuth && await firebase.getCurrentUser()) {
    next('/');
  } else {
    next();
  }
});

export default router

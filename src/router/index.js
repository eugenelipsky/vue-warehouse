import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import * as firebase from "firebase/app";
import GroupInfo from '../views/GroupInfo';
import GroupsList from '../views/GroupsList';
import GroupMembers from '../views/GroupMembers';
import GroupEdit from '../views/GroupEdit';
import GroupAdmins from '@/views/GroupAdmins';

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
    path: '/groups',
    name: 'Groups',
    component: () => import('../views/Groups'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'GroupList',
        component: GroupsList
      },
      {
        path: ':id/group-info',
        component: GroupInfo
      },
      {
        path: ':id/group-members',
        component: GroupMembers,
        meta: {
          hideForNonAdmins: true
        }
      },
      {
        path: ':id/group-members/admins',
        component: GroupAdmins,
        meta: {
          hideForNonAdmins: true
        }
      },
      {
        path: ':id/group-edit',
        component: GroupEdit,
        meta: {
          hideForNonAdmins: true
        }
      },

    ]
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
  const hideForNonAdmins = to.matched.some(record => record.meta.hideForNonAdmins);

  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login');
  } else if (hideForAuth && await firebase.getCurrentUser()) {
    next('/');
  } else if (hideForNonAdmins) {
     store.state.groups.groups.forEach(group => {
      if (window.location.pathname.includes(group.id)) {
        if (group.owner !== firebase.auth().currentUser.uid) {
          next('/groups')
        } else {
          next()
        }
      }
    })
  } else {
    next()
  }
})


export default router
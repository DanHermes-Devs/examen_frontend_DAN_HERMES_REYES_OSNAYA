import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UsersList',
      component: () => import('../views/users/UsersList.vue')
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: () => import('../views/users/UserDetail.vue')
    },
    {
      path: '/user/:id/edit',
      name: 'UserEdit',
      component: () => import('../views/users/UserEdit.vue')
    }
  ]
})

export default router

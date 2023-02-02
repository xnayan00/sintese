import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '@/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: MainLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import("@/views/HomeView.vue")
        },
        {
          path: '/students',
          name: 'students',
          component: () => import("@/views/StudentsView.vue")
        },
        {
          path: '/teachers',
          name: 'teachers',
          component: () => import("@/views/TeachersView.vue")
        },
        {
          path: '/users',
          name: 'users',
          component: () => import("@/views/UsersView.vue")
        },
        {
          path: '/modalities',
          name: 'modalities',
          component: () => import("@/views/ModalitiesView.vue")
        },
        {
          path: '/teams',
          name: 'teams',
          component: () => import("@/views/TeamsView.vue")
        },
        {
          path: '/financial',
          name: 'financial',
          component: () => import("@/views/FinancialView.vue")
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router

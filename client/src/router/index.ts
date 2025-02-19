import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.ts'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue'),
      meta: {
        title: 'Main game room',
        requiresAuth: true
      },
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && auth.user === null) {
    return {
      path: '/',
      query: { redirect: to.fullPath },
    }
  }
})


export default router

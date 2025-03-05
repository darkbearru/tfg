import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.ts'
import RegisterView from '@/views/RegisterView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Authorization',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registration',
      }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue'),
      meta: {
        title: 'The Fool Game',
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
  const { title, description } = to.meta;
  const defaultTitle = 'TFG';
  const defaultDescription = 'The Fool Game Description';

  document.title = title as string || defaultTitle

  const descriptionElement = document.querySelector<HTMLHeadElement>('head meta[name="description"]')
  descriptionElement?.setAttribute('content', description as string || defaultDescription)
})


export default router

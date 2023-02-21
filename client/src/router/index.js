import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useTodoStore } from '../stores/todo'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue'),
      
    },
    
  ]
})

router.beforeEach((to, from, next) => {
 const store = useTodoStore()
  if (to.meta.requiresAuth) {
    console.log(store.user)
    if(!store.user){
      next({
        name:'login'
      });
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})
export default router

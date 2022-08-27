import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Pantry from '../components/Pantry.vue'
import Recipes from '../components/Recipes.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pantry',
    name: 'Pantry',
    component: Pantry
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  }
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router
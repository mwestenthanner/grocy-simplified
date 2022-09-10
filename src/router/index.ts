import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Pantry from '../components/Pantry.vue'
import ShoppingList from '../components/ShoppingList.vue'
import Recipes from '../components/Recipes.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/groceries',
    name: 'Groceries',
    component: Pantry
  },
  {
    path: '/shopping-list',
    name: 'Shopping List',
    component: ShoppingList
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
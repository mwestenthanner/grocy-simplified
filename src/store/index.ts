import { createStore } from 'vuex'
import { Product, Recipe } from '../types'

const productList = [

  {
      id: 1235,
      name: 'Banana',
      area: 'Pantry',
      quantity: 2,
      unit: 'pcs',
      expiry: new Date("2022-08-28"),
      mandatory: true,
      onShoppingList: false,
      status: 'In stock'
  } as Product

]

const recipeList = [
  {
      id: 1,
      name: 'Lentil Bolognese',
      description: 'A veganized Italian classic.',
      img: 'https://rainbowplantlife.com/wp-content/uploads/2020/04/red-lentil-bolognese-twirling-pasta-1.png',
      categories: ['Vegan', 'Pasta'],
      ingredients: ['Garlic', 'Onion', 'Tomato', 'Lentils'],
      instructions: ['Peel and cut garlic and onion.', 'Cook the sauce, serve with pasta.'],
  } as Recipe
]

const locationList = [
  {
    "id":"2",
    "name":"Speisekammer",
    "description":"",
    "row_created_timestamp":"2022-08-27 08:22:33",
    "is_freezer":"0"
 }
]

const stock = [

  {
      id: 1235,
      name: 'Banana',
      area: 'Pantry',
      quantity: 2,
      unit: 'pcs',
      expiry: new Date("2022-08-28"),
      mandatory: true,
      onShoppingList: false,
      status: 'In stock'
  } as Product

]

export default createStore({
  state: {
    productList,
    recipeList,
    locationList,
    stock
  }, 
  getters: {

    getLocationFromId: (state) => (id: string) => {
      return state.locationList.find(item => item.id === id);
    },

    getLocations: (state) => {
      return state.locationList;
    }

  },
  mutations: {

    setRecipeList(state, recipes:
      Array<Recipe>) {
     state.recipeList = recipes;
   },

   setProducts(state, products: Array<Product>) {
     state.productList = products;
   },

   setLocations(state, locations) {
     state.locationList = locations;
   },

   setStock(state, stock: Array<Product>) {
     state.stock = stock;
   },

  },
  actions: {},
  modules: {}
})
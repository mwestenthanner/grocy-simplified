import { createStore } from 'vuex'
import { Product, Recipe } from '../types'
import { filterByLocation, sortStockBy } from './filters'

const productList = [
    {
       "id":"1",
       "name":"Banane",
       "description":"Ein leckeres Obst.",
       "product_group_id":"",
       "active":"1",
       "location_id":"2",
       "shopping_location_id":"",
       "qu_id_purchase":"2",
       "qu_id_stock":"2",
       "qu_factor_purchase_to_stock":"1.0",
       "min_stock_amount":"1",
       "default_best_before_days":"0",
       "default_best_before_days_after_open":"0",
       "default_best_before_days_after_freezing":"0",
       "default_best_before_days_after_thawing":"0",
       "picture_file_name":"e5e298y04qvkt7r1eih5banane.jpg",
       "enable_tare_weight_handling":"0",
       "tare_weight":"0.0",
       "not_check_stock_fulfillment_for_recipes":"0",
       "parent_product_id":null,
       "calories":"120",
       "cumulate_min_stock_amount_of_sub_products":"0",
       "due_type":"1",
       "quick_consume_amount":"1.0",
       "hide_on_stock_overview":"0",
       "default_stock_label_type":"0",
       "should_not_be_frozen":"0",
       "row_created_timestamp":"2022-08-27 08:47:38",
       "treat_opened_as_out_of_stock":"1",
       "no_own_stock":"0",
       "default_consume_location_id":"",
       "move_on_open":"0"
    }
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

const stock: Product[] = []

export default createStore({
  state: {
    productList,
    recipeList,
    locationList,
    stock
  }, 
  getters: {

    getStock: (state => {
      return state.stock;
    }),

    getStockProductFromName: (state) => (name: string) => {
      return state.stock.find(item => item.name === name);
    },

    getStockFilteredAndSorted: (state) => (locationId: number, sortParameter: string, sortUp: boolean) => {
      return sortStockBy(filterByLocation(state.stock, locationId), sortParameter, sortUp);
    },

    getLocationForStockProduct: (state) => (productName: string) => {
      const product = state.stock.find(item => item.name === productName);
      return product?.location;
    },

    getLocationFromId: (state) => (id: string) => {
      return state.locationList.find(item => item.id === id);
    },

    getLocationFromName: (state) => (name: string) => {
      return state.locationList.find(item => item.name === name);
    },

    getLocationIdFromName: (state) => (name: string) => {
      const product = state.locationList.find(item => item.name === name);
      return product?.id;
    },

    getLocations: (state) => {
      return state.locationList;
    },

    getProducts: (state) => {
      return state.productList;
    },

    getProductFromName: (state) => (name: string) => {
      return state.productList.find(item => item.name === name);
    },

    getProductIdFromName: (state) => (name: string) => {
      const product = state.productList.find(item => item.name === name);
      return product?.id;
    }

  },
  mutations: {

    setRecipeList(state, recipes:
      Array<Recipe>) {
     state.recipeList = recipes;
    },

    setProducts(state, products) {
      state.productList = products;
    },

    setLocations(state, locations) {
      state.locationList = locations;
    },

    setStock(state, stock: Array<Product>) {
      state.stock = stock;
    },

    setStockIds(state, { productId, stockIds }) {
      const index = state.stock.findIndex(item => item.id = productId);
      state.stock[index].stockIds = stockIds;
    },

    setProductLocation(state, payload) {
      const index = state.stock.findIndex(item => item.id = payload.productId);
      state.stock[index].locationId = payload.productLocation;
      state.stock[index].location = payload.locationName;
    }

  },
  actions: {},
  modules: {}
})
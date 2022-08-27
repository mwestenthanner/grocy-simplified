import { createStore } from 'vuex'
import { Product, Recipe } from '../types'

export type State = {
  productList: Array<Product>,
  recipeList: Array<Recipe>
};

const state: State = {

  productList: [

      {
          id: 1235,
          name: 'Banana',
          area: 'Pantry',
          quantity: 2,
          unit: 'pcs',
          expiry: new Date("2022-04-16"),
          onShoppingList: false
      } as Product,

      {
          id: 1234,
          name: 'Yogurt',
          area: 'Fridge',
          quantity: 1,
          unit: 'pcs',
          expiry: new Date("2022-03-16"),
          onShoppingList: false
      } as Product,

      {
        id: 1236,
        name: 'Bread',
        area: 'Freezer',
        quantity: 1,
        unit: 'loaf',
        expiry: new Date("2022-07-01"),
        onShoppingList: false
      } as Product

  ],
  recipeList: [
    {
        id: 1,
        name: 'Lentil Bolognese',
        description: 'A veganized Italian classic.',
        img: 'https://rainbowplantlife.com/wp-content/uploads/2020/04/red-lentil-bolognese-twirling-pasta-1.png',
        categories: ['Vegan', 'Pasta'],
        ingredients: ['Garlic', 'Onion', 'Tomato', 'Lentils'],
        instructions: ['Peel and cut garlic and onion.', 'Cook the sauce, serve with pasta.'],
    } as Recipe,
    {
        id: 1,
        name: 'Miso Aubergine with some text in the title',
        description: 'Delicious smoky flavor directly produced in the oven.',
        img: 'https://schlaraffenwelt.de/wp-content/uploads/2020/08/auberginen.jpg',
        categories: ['Vegan', 'Rice'],
        ingredients: ['Aubergine', 'Miso', 'Soy sauce', 'Rice'],
        instructions: ['Cut aubergine into half, score and brush with miso.', 'Broil in the oven, serve with rice and sesame seeds.'],
    } as Recipe,
  ]

};

export const store = createStore({
  state
});
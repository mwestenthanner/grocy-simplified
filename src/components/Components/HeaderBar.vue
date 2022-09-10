<template>
<div class="header-bar" @click="popout=false;">
  <h2>{{ heading }}</h2>
  <div class="quick-menu">
    <SearchFilter />
    <div class="add">
      <button class="add-button" @click.stop="popout = !popout;">
        <svg height="16px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
      </button>
      <div class="popout" v-if="popout" @click.stop>
        <ul @click="popout = false">
          <li @click="addMode = true;">Add product to stock</li>
          <li @click="shoppingListMode = true;">Add product to shopping list</li>
          <li @click="createMode = true;">Create new product</li>
        </ul>
      </div>
    </div>
    
    <button @click="useUpMode = true;">
      <svg enable-background="new 0 0 48 48" height="16px" version="1.1" viewBox="0 0 48 48" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M31,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C32,47.553,31.553,48,31,48z"/></g><g><path d="M37,31h-6c-0.553,0-1-0.447-1-1s0.447-1,1-1h4.996c-0.133-16.802-3.585-26.66-5.014-27.002     c-0.552,0-0.991-0.446-0.991-0.999C29.991,0.447,30.447,0,31,0c4.188,0,7,15.512,7,30C38,30.553,37.553,31,37,31z"/></g><g><path d="M17,18c-3.859,0-7-3.141-7-7V1c0-0.553,0.447-1,1-1s1,0.447,1,1v10c0,2.757,2.243,5,5,5s5-2.243,5-5V1     c0-0.553,0.447-1,1-1s1,0.447,1,1v10C24,14.859,20.859,18,17,18z"/></g><g><path d="M17,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C18,47.553,17.553,48,17,48z"/></g></g></g></svg>
    </button>
  </div>
</div>

<AddProduct v-if="addMode" @close-modal="addMode = false" />
<UsedUpModal v-if="useUpMode" @close-modal="useUpMode = false" />
<ShoppingListModal v-if="shoppingListMode" @close-modal="shoppingListMode = false" />
<CreateProduct v-if="createMode" @close-modal="createMode = false" />
</template>

<script lang="ts" setup>
import SearchFilter from './SearchFilter.vue'
import Button from './Button.vue'
import AddProduct from '../Modals/AddProduct.vue'
import UsedUpModal from '../Modals/UsedUpModal.vue'
import ShoppingListModal from '../Modals/ShoppingListModal.vue'

import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import CreateProduct from '../Modals/CreateProduct.vue'

const route = useRoute();
let heading = ref();

const popout = ref(false);
const addMode = ref(false);
const useUpMode = ref(false);
const shoppingListMode = ref(false);
const createMode = ref(false);

watch(route, (from, to) => {
  heading.value = route.name;
});

</script>

<style scoped>

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--font-accent);
  padding: 2rem;
}

.quick-menu {
  display: flex;
  gap: 1rem;
}

.add {
  position: relative;
  height: auto;
}

.add-button {
  height: 100%;
}

.popout {
  position: absolute;
  top: 4rem;
  width: 15rem;
  right: 0rem;
  background-color: var(--background);
  border: 1px solid var(--font-accent);
  border-radius: 0.5rem;
}

.popout ul {
  list-style-type: none;
}

.popout ul li {
  padding: 1rem;
  cursor: pointer;
}

.popout ul li:not(:last-child) {
  border-bottom: 1px solid var(--font-accent);
}

button {
  padding: 1.2rem;
  font-weight: bold;
}

button > svg {
    fill: var(--font-main);
    vertical-align: middle;
}

</style>
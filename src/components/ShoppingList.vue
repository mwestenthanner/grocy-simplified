<template>
    <div class="container">

        <div class="shopping-item" v-for="listItem in shoppingList" :key="listItem.id">
            <div class="checkbox">
                <input type="checkbox" name="buy-item" :id="'list-item-' + listItem.id" :checked="listItem.done == 1" @change="checkItem(listItem)">
                <label :for="'list-item-' + listItem.id" :class="{ done: listItem.done == 1}">{{ listItem.name }}</label>
            </div>
            <button @click="deleteItem(listItem.id)">
                <svg enable-background="new 0 0 40 40" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>
            </button> 
        </div>

        <div class="default" v-if="shoppingList.length == 0">
            <p>Shopping list is empty. Add products via the main menu at the top right!</p>
        </div>

        <button class="clear" @click="clear()">Clear bought items</button> 

    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { editShoppingListDetails, addProductToStock, useUpProduct, removeProductFromShoppingList } from '../functions/grocy'

const model = ref(null);

const store = useStore();
const shoppingList = computed(() => store.state.shoppingList);

function checkItem(listItem: any) {

    // if done is 0:
    if (listItem.done == 0) {

        // set done to 1
        editShoppingListDetails(listItem.id, undefined, 1);

        // add to stock
        if(!store.getters.productIsInStock(listItem.name)) {
            addProductToStock(listItem.product_id, listItem.amount, listItem.location_id);    
        }

    }

    // if done is 1:
    else {

        // set done to 0
        editShoppingListDetails(listItem.id, undefined, 0);

        // remove from stock
        if(store.getters.productIsInStock(listItem.name)) {
            useUpProduct(listItem.product_id);
        }
    }

}

function clear() {

    // remove all done items from shopping list
    shoppingList.value.forEach((listItem: { done: number; id: number; amount: number; shopping_list_id: number; }) => {
        if (listItem.done == 1) {
            console.log(JSON.stringify(listItem) + ' is done')
            removeProductFromShoppingList(listItem.id)
        }
    });
}

function deleteItem(listItemId: number) {
    removeProductFromShoppingList(listItemId);
}

</script>

<style scoped>

.container {
    padding: 2rem;
}

.shopping-item {
    border-bottom: 1px solid var(--font-accent);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

label {
    margin-left: 1rem;
}

button {
    font-family: Inter;
    color: var(--font-main);
    padding: 0.7rem;
    border-radius: 10px;
    background-color: var(--accent-primary);
    border: none;
    cursor: pointer;
}

button svg {
    width: 15px;
    height: auto;
    vertical-align: middle;
}

.clear {
    display: block;
    margin-left: auto;
    margin-right: 0;
    margin-top: 2rem;
}

.done {
  text-decoration: line-through;
}

</style>
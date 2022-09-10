<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Add product to shopping list</h2>
        <div class="choose-product">
          <label for="shopping-select">Product</label>
            <Multiselect
                id="shopping-select"
                v-model="productValue"
                :options="getOptions(productList)"
                :searchable="true"
                />
        </div>
        <div class="remove" v-if="productInStock">
          <input v-model="removeFromStock" type="checkbox" name="toggle-stock" id="toggle-stock"><label for="toggle-stock">Remove product from stock</label>
        </div>
        <div class="buttons">
            <button type="submit" @click="saveChanges(removeFromStock); $emit('close-modal')">Confirm</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, computed, toRef } from 'vue'
import Multiselect from '@vueform/multiselect'
import { Product } from '../../types'
import { useStore } from 'vuex';
import { useUpProduct, addProductToShoppingList } from '../../functions/grocy'

const store = useStore();

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: false
        }
})

const productValue = ref('');
const removeFromStock = ref(true);

if (props.product) {
  const product = toRef(props, 'product');
  productValue.value = product.value?.name ?? '';
} 

const productList = computed(() => store.getters.getProducts);
const productInStock = computed(() => store.getters.productIsInStock(productValue.value));

function getOptions(property: {
[x: string]: any; value: any[]; 
}) {
    const options: any[] = [];

    property.forEach((element: any) => {
        options.push(element.name);
    });

    return options;
}

function saveChanges(useUp: boolean) {

  const productId = computed(() => store.getters.getProductIdFromName(productValue.value));

  addProductToShoppingList(productId.value, 999);

  if (useUp) {
    useUpProduct(productId.value);
  }

}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

#modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000b0;
  align-items: center;
  z-index: 1;
}

#modal {
  background-color: var(--background);
  width: 40vw;
  padding: 3rem;
  border-radius: 1rem;
}

h2, p {
  margin-bottom: 1rem;
}

.multiselect {
    margin: 1rem 0;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

label[for="toggle-stock"] {
    margin-left: 1rem;
}

</style>
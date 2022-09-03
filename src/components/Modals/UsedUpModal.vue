<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Use up product</h2>
        <div class="choose-product">
          <label for="product-select">Product</label>
            <Multiselect
                id="product-select"
                v-model="productValue"
                :options="getOptions(productsInStock)"
                :searchable="true"
                />
        </div>
        <p>Do you want to add it to your shopping list?</p>
        <div class="buttons">
            <button type="submit" @click="saveChanges(true); $emit('close-modal')">Yes</button>
            <button type="button" @click="saveChanges(false); $emit('close-modal')">No</button>
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

if (props.product) {
  const product = toRef(props, 'product');
  productValue.value = product.value?.name ?? '';
} 

const productsInStock = computed(() => store.getters.getStock);

function getOptions(property: {
[x: string]: any; value: any[]; 
}) {
    const options: any[] = [];

    property.forEach((element: any) => {
        options.push(element.name);
    });

    return options;
}

function saveChanges(shoppingList: boolean) {

  const productId = computed(() => store.getters.getProductIdFromName(productValue.value));

  useUpProduct(productId.value);

  if (shoppingList) {
    addProductToShoppingList(productId.value, 999);
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

</style>
<template>
  <div id="modal-overlay" @click="$emit('close-modal'); addProductToShoppingList(props.product.id, props.product.quantity ?? 999);">

    <div id="modal" @click.stop>
        <h2>Added {{ props.product.name }} to shopping list</h2>
        <p>Add any notes on the product here:</p>
        <input v-model="productNotes" type="text" name="notes" id="notes" placeholder="Only this brand...">
        <p>Do you want to remove it from stock?</p>
        <div class="buttons">
            <button type="submit" @click="useUpProduct(props.product.id, props.product.quantity ?? 0); addProductToShoppingList(props.product.id, props.product.quantity ?? 999, productNotes);">Yes</button>
            <button type="button" @click="addProductToShoppingList(props.product.id, props.product.quantity ?? 999, productNotes); $emit('close-modal')">No</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'
import { useUpProduct, addProductToShoppingList } from '../../functions/grocy'

const productNotes = ref('')

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: true
        }
})

</script>

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
}

#modal {
  background-color: var(--background);
  padding: 3rem;
  border-radius: 1rem;
}

h2 {
    margin-bottom: 2rem;
}

#notes {
    margin: 1rem 0;
    width: 90%;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

button {
    width: 100%;
}
</style>
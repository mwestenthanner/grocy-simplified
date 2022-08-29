<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>{{ props.product.name }} used up</h2>
        <p>Do you want to add it to your shopping list?</p>
        <div class="buttons">
            <button type="submit" @click="useUpProduct(props.product.id, props.product.quantity ?? 0); addProductToShoppingList(props.product.id, props.product.quantity ?? 999);">Yes</button>
            <button type="button" @click="useUpProduct(props.product.id, props.product.quantity ?? 0); $emit('close-modal')">No</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { Product } from '../../types'
import { useUpProduct, addProductToShoppingList } from '../../functions/grocy'

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
  width: 40vw;
  padding: 3rem;
  border-radius: 1rem;
}

</style>
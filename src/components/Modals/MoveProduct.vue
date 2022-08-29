<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Move {{ props.product.name }}</h2>
        <p>{{ props.product.name }} currently is in {{ props.product.location }}. Move to:</p>
        <select name="locations" id="locations" v-model="locationTo">
            <option v-for="location in locationList" :key="location.id" :value="location.id">{{ location.name }}</option>
        </select>
        <div class="buttons">
            <button type="submit" @click="moveProduct(props.product.id, props.product.quantity ?? 0, props.product.locationId, locationTo); $emit('close-modal')">Save</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, ref } from 'vue'
import { Product } from '../../types'
import { moveProduct } from '../../functions/grocy'
import { useStore } from 'vuex';

const store = useStore();
const locationList = computed(() => store.getters.getLocations) // Here the current location should be filtered out later

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: true
        }
})

const locationTo = ref(0)

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

#locations {
    width: 100%;
    margin: 1rem 0;
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
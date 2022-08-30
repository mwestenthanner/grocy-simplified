<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Add product to stock</h2>

            <label for="product-select">Product</label>
            <Multiselect
                id="product-select"
                v-model="productValue"
                :options="getOptions(productOptions)"
                :searchable="true"
                />

            <label for="location-select">Location</label>
            <Multiselect
                id="location-select"
                v-model="locationValue"
                :options="getOptions(locationOptions)"
                />

            <label for="expiry">Best Before Date</label>
            <input v-model="expiry" type="date" name="expiry" id="expiry" v-if="!noExpiry">
            <input v-model="noExpiry" type="checkbox" name="toggle-expiry" id="toggle-expiry"><label for="toggle-expiry">Don't set best before date</label>

            <div class="buttons">
              <button type="submit" @click="addProduct();">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
            </div>
            
      </div>
  
    </div>
  
</template>
  
<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import { computed, ref, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { addProductToStock } from '@/functions/grocy';

const store = useStore();

const productValue = ref('');
const locationValue = ref('');
const expiry = ref('');

const noExpiry= ref(false);

const productOptions = computed(() => store.getters.getProducts);
const locationOptions = computed(() => store.getters.getLocations);

const emit = defineEmits(['close-modal'])

function getOptions(property: {
[x: string]: any; value: any[]; 
}) {
    const options: any[] = [];

    property.forEach((element: any) => {
        options.push(element.name);
    });

    return options;
}

function addProduct() {

    // Fill expiry if box is checked
    if (noExpiry.value == true) {
        expiry.value = '2099-12-31';
    }

    // Check if all fields are filled 
    if (!productValue.value || !expiry.value || !locationValue.value) {
        alert('Please fill all values');
    } else {

        const productId = computed(() => store.getters.getProductIdFromName(productValue.value));
        const locationId = computed(() => store.getters.getLocationIdFromName(locationValue.value));

        addProductToStock(productId.value, 999, locationId.value, expiry.value);
        
        emit('close-modal');

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
}

#modal {
background-color: var(--background);
width: 40vw;
padding: 3rem;
border-radius: 1rem;
}

h2 {
    margin-bottom: 2rem;
}

input[type=date] {
  display: block;
  margin-bottom: 1rem;
  width: 95%;
}

.multiselect, input[type=date] {
    margin: 1rem 0;
}

select {
  width: 100%;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

label[for="expiry"] {
    display: block;
}

#toggle-expiry {
    margin-top: 1rem;
}

label[for="toggle-expiry"] {
    margin-left: 1rem;
}

</style>
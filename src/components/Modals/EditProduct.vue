<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Edit {{ props.product.name }}</h2>
        <div class="best-before-setting">
          <h4>Best Before Date</h4>
          <input v-show="!doesNotExpire" v-model="expiry" type="date" name="expiry" id="expiry">
          <input v-model="doesNotExpire" type="checkbox" name="toggle-expiry" id="toggle-expiry"><label for="toggle-expiry">No date set</label>
        </div>

        <div class="status-setting">
          <h4>Product status</h4>
          <select name="status" id="status">
            <option>In stock</option>
          </select>     
        </div>

        <div class="detail-setting">
          <h4>Other</h4>
          <input v-model="isMandatory" type="checkbox" name="toggle-mandatory" id="toggle-mandatory"><label for="toggle-mandatory">Product needs to be in stock</label>     
        </div>

        <div class="buttons">
              <button type="submit" @click="saveChanges(); $emit('close-modal')">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>

    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'
import { editProductDetails } from '../../functions/grocy'

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: true
        }
})

const expiry = ref(props.product.expiry.toISOString().split('T')[0]);
const doesNotExpire = ref(getExpiry(props.product.expiry));
const isMandatory = ref(props.product.mandatory);

function getExpiry(date: Date) {
  if (date.toISOString().split('T')[0] == '2999-12-31') {
    return true;
  } else return false;
}

function saveChanges() {

  let expiryDate = '';

  if (doesNotExpire.value == true) {
    expiryDate = '2999-12-31';
  } else {
    expiryDate = expiry.value; 
  }

  editProductDetails(props.product, expiryDate, isMandatory.value, undefined)

}

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
  z-index: 1;
}

#modal {
  background-color: var(--background);
  padding: 3rem;
  border-radius: 1rem;
}

h2 {
    margin-bottom: 1rem;
}

h4 {
  margin: 1rem 0;
}

input[type=date] {
  display: block;
  margin-bottom: 1rem;
  width: 90%;
}

label {
  padding-left: 1rem;
}

select {
  width: 100%;
}

#locations {
    width: 100%;
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
<template>
    <div class="list-item" @click="showControls = !showControls">
        <p>{{ props.product.name }}</p>
        <p class="tag">{{ props.product.area }}</p>
        <p>{{ props.product.quantity }}</p>
        <p>{{ getStatus(props.product) }}</p>
    </div>
    <div class="controls" v-show="showControls">
        <div class="item-controls">
            <button>Mark as used up</button>
            <button>Add to shopping list</button>
        </div>
        <div class="area-controls">
            <button>Change area</button>
        </div>
        <div class="quantity-controls">
            <button>+</button>
            <button>-</button>
        </div>
        <div class="expiry-controls">
            <button>Change expiry date</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'

let showControls = ref(false);

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: true
        }
})
        

function calculateExpiry (expiry: Date) {

    const dateToday = new Date;

    const diffTime = expiry.valueOf() - dateToday.valueOf();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays;

}

function getStatus(product: Product) {
    let status = '';

    if (product.quantity == 0) {
        status = 'Not in stock';
    } else status = 'In stock';

    if (product.onShoppingList == true) {
        status = 'On shopping list';
    }

    /* check expiry status */
    const expiry = calculateExpiry(product.expiry);

    if (expiry < 4 && expiry >= 0) {
        status = 'Use up in ' + expiry + ' days';   
    }

    if (expiry <= 0) {
        status = 'Expired ' + -expiry + ' days ago'
    }

    return status;
}

    
</script>

<style scoped>

.list-item {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 1rem 1rem 1rem 2rem;
    border: 1px solid #eee;
    grid-gap: 4rem;
    align-items: center;
}

.tag {
    padding: 7px 10px 7px 10px;
    border-radius: 8px;
    color: white;
    background-color: var(--yellow);
    text-align: center;
}

.list-item > p:not(:first-child) {
    text-align: center
}

.expired {
    color: rgb(165, 15, 15);
    font-weight: bold;
}

.expiring {
    color: var(--yellow);
    font-weight: bold;
}

.controls {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    margin-bottom: 1rem;
    padding: 1rem 1rem 1rem 2rem;
    grid-gap: 4rem;
}

.controls div:not(:first-child) {
    justify-self: center;
}

.controls button {
    font-family: Inter;
    color: white;
    padding: 0.7rem;
    border-radius: 10px;
    background-color: var(--lighter-green);
    border: none;
}

.controls button:not(:first-child) {
    margin-left: 0.5rem;
}

</style>
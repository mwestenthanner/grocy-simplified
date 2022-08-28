<template>
    <div class="list-item">
        <p>{{ props.product.name }}</p>
        <p class="tag">{{ props.product.area }}</p>
        <p class="status" :class="{ expiring : isExpiring, expired : isExpired }">{{ getStatus(props.product) }}</p>
        <div class="controls">
            <button>
                <svg enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M31,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C32,47.553,31.553,48,31,48z"/></g><g><path d="M37,31h-6c-0.553,0-1-0.447-1-1s0.447-1,1-1h4.996c-0.133-16.802-3.585-26.66-5.014-27.002     c-0.552,0-0.991-0.446-0.991-0.999C29.991,0.447,30.447,0,31,0c4.188,0,7,15.512,7,30C38,30.553,37.553,31,37,31z"/></g><g><path d="M17,18c-3.859,0-7-3.141-7-7V1c0-0.553,0.447-1,1-1s1,0.447,1,1v10c0,2.757,2.243,5,5,5s5-2.243,5-5V1     c0-0.553,0.447-1,1-1s1,0.447,1,1v10C24,14.859,20.859,18,17,18z"/></g><g><path d="M17,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C18,47.553,17.553,48,17,48z"/></g></g></g></svg>
            </button>
            <p class="tooltip">Mark as used up</p>

            <button>
                <svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="st0" id="grid_system"/><g id="_icons"><g><path d="M12,6h8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-8c-0.6,0-1,0.4-1,1S11.4,6,12,6z"/><path d="M20,11h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,11,20,11z"/><path d="M20,18h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,18,20,18z"/><path d="M7.2,3.2L5.5,5.7L5,5.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,8c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6C9.1,3.8,9,3.2,8.6,2.9C8.1,2.6,7.5,2.7,7.2,3.2z"/><path d="M7.2,10.2l-1.7,2.5L5,12.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,15c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,9.6,7.5,9.7,7.2,10.2z"/><path d="M7.2,17.2l-1.7,2.5L5,19.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,22c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,16.6,7.5,16.7,7.2,17.2z"/></g></g></svg>
            </button>
            <p class="tooltip">Add to shopping list</p>

            <button>
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M121,10.3H107.2V3a3,3,0,0,0-6,0v7.3H80.4V3a3,3,0,0,0-6,0v7.3H53.6V3a3,3,0,0,0-6,0v7.3H26.8V3a3,3,0,0,0-6,0v7.3H7a7,7,0,0,0-7,7V121a7,7,0,0,0,7,7H95a3,3,0,0,0,.59-.06l.26-.08a1.76,1.76,0,0,0,.59-.25l.23-.12a3,3,0,0,0,.46-.38l30-30a3,3,0,0,0,.38-.46c0-.07.07-.14.11-.21a1.78,1.78,0,0,0,.25-.6c0-.09.06-.17.08-.27A3,3,0,0,0,128,95h0V17.3A7,7,0,0,0,121,10.3ZM98,98h19.76L98,117.76ZM7,16.3H20.8v7.3a3,3,0,0,0,6,0V16.3H47.6v7.3a3,3,0,1,0,6,0V16.3H74.4v7.3a3,3,0,1,0,6,0V16.3h20.8v7.3a3,3,0,1,0,6,0V16.3H121a1,1,0,0,1,1,1V31.6H6V17.3A1,1,0,0,1,7,16.3ZM6,121V37.6H122V92H95a3,3,0,0,0-3,3v27H7A1,1,0,0,1,6,121Z"/></svg>
            </button>
            <p class="tooltip">Change expiry date</p>

            <button>
                <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M22.477,5.969l-0,0.028c-0.003,0.147 -0.034,0.287 -0.086,0.415l-0.004,0.009c-0.057,0.139 -0.142,0.269 -0.255,0.382l-3.538,3.537c-0.46,0.461 -1.207,0.461 -1.667,0c-0.461,-0.46 -0.461,-1.207 -0,-1.667l1.524,-1.525l-8.945,-0c-0.651,-0 -1.179,-0.528 -1.179,-1.179c0,-0.651 0.528,-1.179 1.179,-1.179l8.945,-0l-1.524,-1.525c-0.461,-0.46 -0.461,-1.207 -0,-1.668c0.46,-0.46 1.207,-0.46 1.667,0l3.538,3.538c0.113,0.113 0.198,0.242 0.255,0.381l0.004,0.009c0.052,0.129 0.083,0.269 0.086,0.415l0,0.029Z"/><path d="M5.278,16.581l8.945,0c0.651,0 1.179,0.528 1.179,1.18c0,0.651 -0.528,1.179 -1.179,1.179l-8.945,-0l1.525,1.524c0.46,0.461 0.46,1.207 -0,1.668c-0.461,0.46 -1.208,0.46 -1.668,-0l-3.533,-3.533c-0.016,-0.015 -0.031,-0.031 -0.046,-0.048l-0.008,-0.009c-0.08,-0.09 -0.144,-0.19 -0.192,-0.296l-0.004,-0.009c-0.064,-0.145 -0.1,-0.307 -0.1,-0.476c0,-0.17 0.036,-0.331 0.1,-0.477l0.004,-0.009c0.048,-0.106 0.112,-0.205 0.192,-0.296l0.008,-0.009c0.015,-0.016 0.03,-0.032 0.046,-0.048l3.533,-3.533c0.46,-0.46 1.207,-0.46 1.668,0c0.46,0.461 0.46,1.207 -0,1.668l-1.525,1.524Z"/></svg>
            </button>   
            <p class="tooltip">Move item</p>   
        </div>

    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'

const isExpired = ref(false);
const isExpiring = ref(false);

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

    if (expiry < 5 && expiry > 0) {
        isExpiring.value = true;
        status = 'Use up in ' + expiry + ' days';  
    }

    if (expiry == 0) {
        isExpiring.value = true;
        status = 'Use up today';  
    }

    if (expiry < 0) {
        isExpired.value = true;
        status = 'Expired ' + -expiry + ' days ago';
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
    border-bottom: 1px solid var(--font-accent);
    grid-gap: 4rem;
    align-items: center;
}

.tag {
    padding: 7px 10px 7px 10px;
    border-radius: 8px;
    color: var(--font-main);
    background-color: var(--accent-primary);
    text-align: center;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
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
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.tooltip {
    display: none;
}

.controls button, .quantity button {
    font-family: Inter;
    color: var(--font-main);
    padding: 0.7rem;
    border-radius: 10px;
    background-color: var(--accent-primary);
    border: none;
}

button svg {
    width: 15px;
    height: auto;
    vertical-align: middle;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
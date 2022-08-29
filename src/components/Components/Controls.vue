<template>
<div class="controls">
    <button @click="usedUpMode = true;" @mouseenter="showTooltip('Mark as used up')" @mouseleave="tooltip = false">
        <svg enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M31,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C32,47.553,31.553,48,31,48z"/></g><g><path d="M37,31h-6c-0.553,0-1-0.447-1-1s0.447-1,1-1h4.996c-0.133-16.802-3.585-26.66-5.014-27.002     c-0.552,0-0.991-0.446-0.991-0.999C29.991,0.447,30.447,0,31,0c4.188,0,7,15.512,7,30C38,30.553,37.553,31,37,31z"/></g><g><path d="M17,18c-3.859,0-7-3.141-7-7V1c0-0.553,0.447-1,1-1s1,0.447,1,1v10c0,2.757,2.243,5,5,5s5-2.243,5-5V1     c0-0.553,0.447-1,1-1s1,0.447,1,1v10C24,14.859,20.859,18,17,18z"/></g><g><path d="M17,48c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v46C18,47.553,17.553,48,17,48z"/></g></g></g></svg>
    </button>

    <button @click="addToShopping = true" @mouseenter="showTooltip('Add to shopping list')" @mouseleave="tooltip = false">
        <svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="st0" id="grid_system"/><g id="_icons"><g><path d="M12,6h8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-8c-0.6,0-1,0.4-1,1S11.4,6,12,6z"/><path d="M20,11h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,11,20,11z"/><path d="M20,18h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,18,20,18z"/><path d="M7.2,3.2L5.5,5.7L5,5.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,8c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6C9.1,3.8,9,3.2,8.6,2.9C8.1,2.6,7.5,2.7,7.2,3.2z"/><path d="M7.2,10.2l-1.7,2.5L5,12.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,15c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,9.6,7.5,9.7,7.2,10.2z"/><path d="M7.2,17.2l-1.7,2.5L5,19.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,22c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,16.6,7.5,16.7,7.2,17.2z"/></g></g></svg>
    </button>

    <button @click="moveMode = true" @mouseenter="showTooltip('Move item')" @mouseleave="tooltip = false">
        <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M22.477,5.969l-0,0.028c-0.003,0.147 -0.034,0.287 -0.086,0.415l-0.004,0.009c-0.057,0.139 -0.142,0.269 -0.255,0.382l-3.538,3.537c-0.46,0.461 -1.207,0.461 -1.667,0c-0.461,-0.46 -0.461,-1.207 -0,-1.667l1.524,-1.525l-8.945,-0c-0.651,-0 -1.179,-0.528 -1.179,-1.179c0,-0.651 0.528,-1.179 1.179,-1.179l8.945,-0l-1.524,-1.525c-0.461,-0.46 -0.461,-1.207 -0,-1.668c0.46,-0.46 1.207,-0.46 1.667,0l3.538,3.538c0.113,0.113 0.198,0.242 0.255,0.381l0.004,0.009c0.052,0.129 0.083,0.269 0.086,0.415l0,0.029Z"/><path d="M5.278,16.581l8.945,0c0.651,0 1.179,0.528 1.179,1.18c0,0.651 -0.528,1.179 -1.179,1.179l-8.945,-0l1.525,1.524c0.46,0.461 0.46,1.207 -0,1.668c-0.461,0.46 -1.208,0.46 -1.668,-0l-3.533,-3.533c-0.016,-0.015 -0.031,-0.031 -0.046,-0.048l-0.008,-0.009c-0.08,-0.09 -0.144,-0.19 -0.192,-0.296l-0.004,-0.009c-0.064,-0.145 -0.1,-0.307 -0.1,-0.476c0,-0.17 0.036,-0.331 0.1,-0.477l0.004,-0.009c0.048,-0.106 0.112,-0.205 0.192,-0.296l0.008,-0.009c0.015,-0.016 0.03,-0.032 0.046,-0.048l3.533,-3.533c0.46,-0.46 1.207,-0.46 1.668,0c0.46,0.461 0.46,1.207 -0,1.668l-1.525,1.524Z"/></svg>
    </button> 

    <button @click="editMode = true" @mouseenter="showTooltip('Edit product details')" @mouseleave="tooltip = false">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 42" id="Layer_42"><path class="cls-1" d="M2,29a1,1,0,0,1-1-1.11l.77-7a1,1,0,0,1,.29-.59L18.42,3.94a3.2,3.2,0,0,1,4.53,0l3.11,3.11a3.2,3.2,0,0,1,0,4.53L9.71,27.93a1,1,0,0,1-.59.29l-7,.77Zm7-1.78H9ZM3.73,21.45l-.6,5.42,5.42-.6,16.1-16.1a1.2,1.2,0,0,0,0-1.7L21.53,5.35a1.2,1.2,0,0,0-1.7,0Z"/><path class="cls-1" d="M23,14.21a1,1,0,0,1-.71-.29L16.08,7.69A1,1,0,0,1,17.5,6.27l6.23,6.23a1,1,0,0,1,0,1.42A1,1,0,0,1,23,14.21Z"/><rect class="cls-1" height="2" transform="translate(-8.31 14.13) rotate(-45)" width="11.01" x="7.39" y="16.1"/><path class="cls-1" d="M30,29H14a1,1,0,0,1,0-2H30a1,1,0,0,1,0,2Z"/></g></svg>
    </button>  
    
    <div class="tooltip-field" v-if="tooltip">
        <p>{{ tooltipText }}</p>
    </div>
</div>

<EditProduct :product="props.product" v-if="editMode" @close-modal="editMode = false" />
<MoveProduct :product="props.product" v-if="moveMode" @close-modal="moveMode = false" />
<UsedUpModal :product="props.product" v-if="usedUpMode" @close-modal="usedUpMode = false" />
<ShoppingListModal :product="props.product" v-if="addToShopping" @close-modal="addToShopping = false" />

</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'
import EditProduct from '../Modals/EditProduct.vue'
import MoveProduct from '../Modals/MoveProduct.vue'
import UsedUpModal from '../Modals/UsedUpModal.vue'
import ShoppingListModal from '../Modals/ShoppingListModal.vue'

const props = defineProps({
    product:  {
            type: Object as PropType<Product>,
            required: true
        }
})

const editMode = ref(false);
const moveMode = ref(false);
const usedUpMode = ref(false);
const addToShopping = ref(false);

const tooltip = ref(false);
const tooltipText = ref('');

function showTooltip(buttonText: string) {
    tooltipText.value = buttonText
    tooltip.value = true;
}

</script>

<style scoped>
.controls {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.tooltip {
    display: none;
}

.tooltip-field {
    color: white;
    background-color: black;
    position: absolute;
    margin-top: 3.7rem;
    min-width: 12rem;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

button:hover::after {
    position: absolute;
    content: " ";
    background-color: transparent;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid black;
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    margin-top: 2rem;
    margin-left: -1rem;
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

</style>
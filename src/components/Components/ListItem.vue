<template>
    <div class="list-item">
        <p>{{ props.product.name }}</p>
        <p class="tag">{{ props.product.location }}</p>
        <p class="status" :class="{ expiring : isExpiring, expired : isExpired }">{{ setClass(product) }}</p>
        <Controls :product="props.product" />

    </div>
   
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { Product } from '../../types'
import Controls from './Controls.vue';

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

function setClass(product: Product) {

    const expiry = calculateExpiry(product.expiry);

    if (expiry < 5 && expiry > 0) {
        isExpiring.value = true;
    }

    if (expiry == 0) {
        isExpiring.value = true;
    }

    if (expiry < 0) {
        isExpired.value = true;
    }

    return product.status;
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

</style>
<template>
    <div class="list-item" @click="showControls = !showControls">
        <p>{{ product.name }}</p>
        <p class="tag">{{ product.area }}</p>
        <p>{{ product.quantity }}</p>
        <p :class="{ expiring : isExpiring, expired : isExpired }">{{ calculateExpiry(product.expiry) }}</p>
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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Product } from '../../types'

export default defineComponent({
    props: {
        product:  {
            type: Object as PropType<Product>,
            required: true
        }
    },
    setup() {

        let isExpiring = ref(false)
        let isExpired = ref(false)
        let showControls = ref(false);

        const calculateExpiry = (expiry: Date) => {

            const dateToday = new Date;

            const diffTime = expiry.valueOf() - dateToday.valueOf();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            if (diffDays < 4 && diffDays >= 0) {
                isExpiring.value = true;
            }

            if (diffDays > 0) {
                return diffDays + " days";
            } 
            else if (diffDays == 0) {
                return "Expiring today";
            } 
            else 
                isExpired.value = true;
                return "Expired since " + Math.abs(diffDays) + " days";

        }

        return {
            isExpiring,
            isExpired,
            showControls,
            calculateExpiry
        }

    }
})
</script>

<style scoped>

.list-item {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.2);
    padding: 1rem 1rem 1rem 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
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
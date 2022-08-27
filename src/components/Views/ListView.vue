<template>
    <div class="list-view">
        <div class="list-heading">
            <div class="heading-item">
                <h3>Item</h3><svg class="chevron" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z"/></g><g id="frame"><rect class="cls-1" height="32" width="32"/></g></svg>
            </div>
            <h3 class="tag-heading">Area</h3>
            <h3>Quantity</h3>
            <h3>Expires in</h3>
        </div>
        <ListItem v-for="item in productList" :key="item.name" :product="item" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ListItem from '../Items/ListItem.vue'
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        ListItem
    },
    setup() {

        const store = useStore();
        const productList = ref(store.state.productList)

        return {
            productList
        }

    }
})
</script>

<style scoped>

.list-heading {
    margin: 2rem 0 1rem 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 1rem 1rem 1rem 2rem;
    border-radius: 10px;
    grid-gap: 4rem;
    align-items: center;
}

.list-heading > h3:not(:first-child) {
    text-align: center
}

.heading-item {
    display: flex;
    flex-direction: row;
}

.chevron {
    height: 1.5rem;
    margin-left: 0.5rem;
    fill: var(--dark-green);
}

.chevron .cls-1 {
    fill:none;
}

</style>
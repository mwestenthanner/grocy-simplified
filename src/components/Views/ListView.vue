<template>
    <div class="categories">
        <span :class="{ 'active-category': locationFilter == 0 }" @click="locationFilter = 0">All locations</span>
        <span v-for="item in locationList" :key="item.id" :class="{ 'active-category': locationFilter == item.id }" @click="locationFilter = item.id">{{ item.name }}</span>
    </div>
    <div class="list-view">
        <div class="filter-bar">
            <Multiselect
                id="status-select"
                v-model="statusFilter"
                placeholder="Status"
                :options="statusOptions"
                :searchable="true"
                />
            <SearchFilter v-model="searchText" />
        </div>
        <div class="list-heading">
            <div class="heading-item">
                <h3 class="sort-up" id="name" @click="setSort($event)">Item</h3>
            </div>
            <h3 id="location" @click="setSort($event)" class="tag-heading">Location</h3>
            <h3 id="status" @click="setSort($event)">Status</h3>
            <h3>Modify</h3>
        </div>
        <div class="list">
            <ListItem v-for="item in stock" :key="item.name" :product="item" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import ListItem from '../Components/ListItem.vue'
import SearchFilter from '../Components/SearchFilter.vue'
import { useStore } from 'vuex';

const store = useStore();

const locationFilter = ref(0);
const statusFilter = ref('');
const sortUp = ref(true);
const sortParam = ref('name');
const searchText = ref(null);

// these are copied from setStatus in functions/grocy
const statusOptions = [
    'In stock',
    'On shopping list',
    'Use up in < 5 days',
    'Use up today',
    'Expired'
];

const stock = computed(() => store.getters.getStockFilteredAndSorted(locationFilter.value, statusFilter.value, sortParam.value, sortUp.value, searchText.value));
const locationList = computed(() => store.getters.getLocations);

function setSort(event: Event) {

    if (event.target instanceof Element) { 

        // if parameter changes, set default sort direction, else invert sort direction
        if (sortParam.value == event.target.id) {
            sortUp.value = !sortUp.value;
        } else {
            sortParam.value = event.target.id;
            sortUp.value = true;
        }

        // remove any chevrons
        const elementsUp = document.getElementsByClassName("sort-up");
        while (elementsUp.length) {
            elementsUp[0].classList.remove("sort-up");
        }

        const elementsDown = document.getElementsByClassName("sort-down");
        while (elementsDown.length) {
            elementsDown[0].classList.remove("sort-down");
        }

        // show chevron on correct element
        if (sortUp.value == true) {
            event.target.classList.add("sort-up");
        } else {
            event.target.classList.add("sort-down");
        }
        
    }
    
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

.categories {
    margin: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--font-accent);
}

.categories span {
    font-family: 'Jost';
    font-weight: medium;
    font-size: 120%;
    color: var(--font-accent);
    margin-right: 3rem;
    cursor: pointer;
}

.active-category {
    color: var(--font-main) !important;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--font-main);
}

.filter-bar {
    padding: 0 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.multiselect {
    max-width: 15rem;
    margin: 0;
    height: auto;
    font-family: 'Inter';
}

.list-heading {
    margin: 2rem 0 1rem 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 1rem 1rem 1rem 2rem;
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

#status {
    text-align: left !important;
}

.list {
    border-top: 1px solid var(--font-accent);
}

.sort-up:after {
    display: inline-block;
    content: ' ';
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle/%3E%3Cg data-name='Layer 2' id='Layer_2'%3E%3Cpath d='M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z'/%3E%3C/g%3E%3Cg id='frame'%3E%3Crect class='cls-1' height='32' width='32'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 1.5rem 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 1rem;
}

.sort-down:after {
    display: inline-block;
    content: ' ';
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle/%3E%3Cg data-name='Layer 2' id='Layer_2'%3E%3Cpath d='M24,21a1,1,0,0,1-.71-.29L16,13.41l-7.29,7.3a1,1,0,1,1-1.42-1.42l8-8a1,1,0,0,1,1.42,0l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,24,21Z'/%3E%3C/g%3E%3Cg id='frame'%3E%3Crect class='cls-1' height='32' width='32'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 1.5rem 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 1rem;
}

</style>
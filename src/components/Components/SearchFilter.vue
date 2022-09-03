<template>
    <div class="search-box">
        <svg enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><line fill="none" id="XMLID_44_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="27" x2="20.366" y1="27" y2="20.366"/></svg>
        <input v-model="searchText" @input="$emit('update:modelValue', searchText)" type="text" name="search" id="search" placeholder="Search...">
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchText = ref(null);

</script>

<style scoped>
.search-box {
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    padding: 0 1rem;
    border: 1px solid var(--font-accent);
}

.search-box > svg {
    height: 1rem;
    width: auto;
}

svg > circle, svg > line {
    stroke: var(--font-accent);
}

#search {
    border: none;
    margin-left: 0.5rem;
    font-family: Inter;
    font-size: 100%;
    color: var(--font-accent);
}

#search:focus {
    outline: none;
}

::placeholder {
  color: var(--font-accent);
}

</style>
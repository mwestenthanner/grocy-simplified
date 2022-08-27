<template>
    <button>
        <svg enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z" fill="none" id="XMLID_6_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
        <span>{{ props.heading }}</span>
    </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  heading: String
})


</script>

<style scoped>

button {
    padding: 1rem 1.5rem;
    border: 1px solid var(--font-accent);
    border-radius: 10px;
    font-size: 100%;
    color: var(--font-accent);
    background-color: var(--background);
}

button > svg {
    vertical-align: middle;
    padding-right: 0.75rem;
    height: 20px;
    width: auto;
}

svg path {
    stroke: var(--font-accent);   
}

</style>
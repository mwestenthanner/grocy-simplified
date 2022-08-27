<template>
    <button>
        <svg height="16px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
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
    border: none;
    background-color: var(--accent-primary);
    border-radius: 10px;
    font-size: 105%;
    font-weight: bold;
    color: var(--font-main);
}
button > svg {
    fill: var(--font-main);
    vertical-align: middle;
    padding-right: 0.75rem;
}

</style>
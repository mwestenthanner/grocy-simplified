<template>
    <button>
        
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



</style>
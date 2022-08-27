<template>
    <div class="popover-view">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {

        const store = useStore();
        const recipeList = ref(store.state.recipeList)

        return {
            recipeList
        }
    }
})
</script>

<style scoped>

</style>
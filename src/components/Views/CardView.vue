<template>
    <div class="card-view">
        <div class="card-grid">
            <CardItem v-for="recipe in recipeList" :key="recipe.name" :recipe="recipe" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CardItem from '../Items/CardItem.vue'
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        CardItem
    },
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

.card-grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
}

</style>
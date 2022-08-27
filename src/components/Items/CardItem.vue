<template>
    <div class="recipe-card">
        <div class="image-wrapper">
            <img :src="recipe.img" :alt="recipe.name">
        </div>
        <div class="text-wrapper">
            <h3>{{ recipe.name }}</h3>
            <div class="recipe-tags">
                <span class="tag" v-for="tag in recipe.categories" :key="tag">{{ tag }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Recipe } from '../../types'

export default defineComponent({
    props: {
        recipe: {
            type: Object as PropType<Recipe>,
            required: true
        }
    },
})
</script>

<style scoped>

.recipe-card {
    max-width: 25rem;
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.2);
    border-radius: 10px;
}

.image-wrapper {
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
}

.image-wrapper > img {
    position: absolute;
    width: 100%;
    max-height: auto;
    left: 50%;
    top: 50%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
}

.text-wrapper {
    padding: 1rem 1rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.recipe-tags {
    margin: 1rem 0 1rem 0;
}

.tag {
    padding: 7px 10px 7px 10px;
    border-radius: 8px;
    color: white;
    background-color: var(--yellow);
    text-align: center;
    font-size: 90%;
}

.tag:not(:first-child) {
    margin-left: 0.5rem;
}
</style>
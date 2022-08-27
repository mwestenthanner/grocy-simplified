<template>
    <div class="container">
        <h1>Recipes</h1>
            <div class="search-filter-add">
      <SearchFilter />
      <Add />
    </div>
        <CardView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardView from './Views/CardView.vue'
import SearchFilter from './Items/SearchFilter.vue'
import Add from './Items/Add.vue'

export default defineComponent({
    name: 'Pantry',
    components: {
        CardView,
        SearchFilter,
        Add
    }
})
</script>
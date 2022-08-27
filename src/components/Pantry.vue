<template>
    <div class="container">
        <h1>Pantry</h1>
            <div class="search-filter-add">
      <SearchFilter />
      <Add />
    </div>
        <ListView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListView from './Views/ListView.vue'
import SearchFilter from './Items/SearchFilter.vue'
import Add from './Items/Add.vue'

export default defineComponent({
    name: 'Pantry',
    components: {
        ListView,
        SearchFilter,
        Add
    }
})
</script>
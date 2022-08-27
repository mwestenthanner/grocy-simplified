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

<script lang="ts" setup>
import ListView from './Views/ListView.vue'
import SearchFilter from './Components/SearchFilter.vue'
import Add from './Components/Add.vue'

</script>
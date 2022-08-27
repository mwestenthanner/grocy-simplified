<template>
  <div class="container">

    <h1>Hello, Marianne 🥕</h1>

    <h2>Favorite Recipes</h2>

    <CardView />

    <h2>Pantry</h2>
    <div class="search-filter-add">
      <SearchFilter />
      <Add />
    </div>

    <ListView />

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchFilter from './Items/SearchFilter.vue'
import Add from './Items/Add.vue'
import ListView from './Views/ListView.vue'
import CardView from './Views/CardView.vue'

export default defineComponent({
  name: 'App',
  components: {
    SearchFilter,
    Add,
    ListView,
    CardView
  }
})
</script>

<style scoped>

h2 {
  margin-top: 2rem;
}

h1 {
  margin-top: 3rem;
}

</style>
<template>
<div class="header-bar">
  <h2>{{ heading }}</h2>
  <div class="quick-menu">
    <SearchFilter />
    <Button heading="Use up" />
    <Button heading="Move" />
  </div>
</div>
</template>

<script lang="ts" setup>
import SearchFilter from './SearchFilter.vue'
import Button from './Button.vue'
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
let heading = ref();

watch(route, (from, to) => {
  heading.value = route.name;
});

</script>

<style scoped>

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--font-accent);
  padding: 2rem;
}

.quick-menu {
  display: flex;
  gap: 2rem;
}

</style>
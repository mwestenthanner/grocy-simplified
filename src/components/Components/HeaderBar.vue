<template>
<div class="header-bar">
  <h2>{{ heading }}</h2>
  <div class="quick-menu">
    <SearchFilter />
    <Button heading="Add" @click="addMode = true;" />
    <Button heading="Use up" @click="useUpMode = true;" />
    <Button heading="Move" />
  </div>
</div>

<AddProduct v-if="addMode" @close-modal="addMode = false" />
<UsedUpModal v-if="useUpMode" @close-modal="useUpMode = false" />
</template>

<script lang="ts" setup>
import SearchFilter from './SearchFilter.vue'
import Button from './Button.vue'
import AddProduct from '../Modals/AddProduct.vue'
import UsedUpModal from '../Modals/UsedUpModal.vue'

import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
let heading = ref();

const addMode = ref(false);
const useUpMode = ref(false);

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
  gap: 1rem;
}

</style>
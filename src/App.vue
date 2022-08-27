<template>
  <div class="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './components/Sidebar.vue'; 

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
}
});
</script>

<style>

.app {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

</style>

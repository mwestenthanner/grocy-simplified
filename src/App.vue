<template>
  <div class="app">
    <Sidebar />
    <main>
      <HeaderBar />
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'; 
import HeaderBar from './components/Components/HeaderBar.vue';

</script>

<style>

.app {
  display: grid;
  grid-template-columns: 15% 1fr;
}

</style>

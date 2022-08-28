<template>
  <div class="app">
    {{ result }}
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
import { ref } from 'vue';
import dotenv from 'dotenv';

dotenv.config();

let result = ref();

const headers = new Headers();
const apiKey = process.env.VUE_APP_GROCY_APIKEY ?? '';
headers.append("GROCY-API-KEY", apiKey);

fetch("http://192.168.178.222:9080/api/objects/locations", {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

</script>

<style>

.app {
  display: grid;
  grid-template-columns: 15% 1fr;
}

</style>

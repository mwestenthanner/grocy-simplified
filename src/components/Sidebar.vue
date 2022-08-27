<template>
    <div class="sidebar">
        <router-link to="/">
            <img class="logo" src="../assets/Logo.svg" alt="Frigo - grocery management">
        </router-link>
        <nav>
            <ul>
                <router-link to="/pantry"><li>Pantry</li></router-link>
                <router-link to="/recipes"><li>Recipes</li></router-link>
                <li>Meal Plan (tbd)</li>
                <li>Shopping List (tbd)</li>
                <li>Unit Converter (tbd)</li>
            </ul>
        </nav>
        <img class="bg-pattern" src="../assets/bg.svg" alt="Frigo - grocery management">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style scoped>

.sidebar {
    background-color: var(--light-green);
    color: var(--white);
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 3fr 2fr;
    position: sticky;
    top: 0;
}

.logo {
    width: 40%;
    margin: 3rem auto 3rem 10%;
}

.sidebar a {
    text-decoration: none;
    color: white;
}

.sidebar ul {
    margin-left: 2rem;
    list-style-type: none;
}

.sidebar ul li {
    margin-bottom: 1rem;
    padding: 1rem 1rem 1rem 1.5rem;
    border-radius: 2rem 0 0 2rem;
}

.sidebar ul li:hover {
    background-color:white;
    color: var(--dark-green);
}


</style>
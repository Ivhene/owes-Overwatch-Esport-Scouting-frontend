<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="app-root">
    <header>
      <AppNavbar />
    </header>

    <main><RouterView /></main>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

header {
  height: 64px;
  background-color: var(--color-background-2);
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid var(--color-border);
  margin: 1rem;
  border-radius: 8px;
}

main {
  padding: 1rem;
  flex: 1 1 auto;
  overflow: auto;
  width: 100%;
}
</style>

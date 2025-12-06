<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlayersStore } from '@/stores/players'

const playersStore = usePlayersStore()

onMounted(async () => {
  await playersStore.fetchPlayers()
  // Log the fetched list to the console as requested
  console.log('players:', playersStore.players)
})
</script>

<template>
  <div class="players-page">
    <h1>Players Page</h1>
  </div>
</template>

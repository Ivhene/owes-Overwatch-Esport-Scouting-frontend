import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/assets/types'

const API_URL = (import.meta.env.VITE_API_URL as string) ?? ''

export const usePlayersStore = defineStore('players', () => {
  const players = ref<Player[]>([])
  const initialized = ref(false)

  // Fetch all players. By default this is cached after the first successful load.
  async function fetchPlayers(force = false) {
    if (initialized.value && !force && players.value.length > 0) {
      return players.value
    }
    try {
      const res = await fetch(`${API_URL}/players`)
      if (!res.ok) throw new Error(`Failed fetching players: ${res.status}`)
      const data = await res.json()
      players.value = Array.isArray(data) ? data : []
      initialized.value = true
      return players.value
    } catch (err) {
      console.error('fetchPlayers error:', err)
      players.value = []
      return players.value
    }
  }

  // Get single player. Uses local cache first, otherwise fetches from API.
  async function findPlayer(playerID: number) {
    const cached = players.value.find((p) => p.player_id === playerID)
    if (cached) return cached

    try {
      const res = await fetch(`${API_URL}/players/${playerID}`)
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`Failed fetching player ${playerID}: ${res.status}`)
      const data = await res.json()
      // Cache the fetched player
      players.value.push(data)
      return data as Player
    } catch (err) {
      console.error('findPlayer error:', err)
      return null
    }
  }

  // Create a player via POST and cache the created player
  async function addPlayer(p: Player) {
    try {
      const res = await fetch(`${API_URL}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      if (!res.ok) throw new Error(`Failed creating player: ${res.status}`)
      const created = await res.json()
      players.value.push(created)
      return created as Player
    } catch (err) {
      console.error('addPlayer error:', err)
      throw err
    }
  }

  // Update a player via PUT and update local cache
  async function updatePlayer(playerID: number, updates: Partial<Player>) {
    try {
      const res = await fetch(`${API_URL}/players/${playerID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`Failed updating player ${playerID}: ${res.status}`)
      const updated = await res.json()
      const idx = players.value.findIndex((p) => p.player_id === playerID)
      if (idx !== -1) players.value[idx] = updated
      else players.value.push(updated)
      return updated as Player
    } catch (err) {
      console.error('updatePlayer error:', err)
      return null
    }
  }

  // Delete a player via DELETE and update local cache
  async function removePlayer(playerID: number) {
    try {
      const res = await fetch(`${API_URL}/players/${playerID}`, { method: 'DELETE' })
      if (res.status === 404) return false
      if (!res.ok) throw new Error(`Failed deleting player ${playerID}: ${res.status}`)
      players.value = players.value.filter((p) => p.player_id !== playerID)
      return true
    } catch (err) {
      console.error('removePlayer error:', err)
      return false
    }
  }

  return { players, fetchPlayers, findPlayer, addPlayer, updatePlayer, removePlayer }
})

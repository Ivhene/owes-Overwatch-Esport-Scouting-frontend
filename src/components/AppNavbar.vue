<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import logoLight from '@/assets/images/ow_esports_logo.png'
import logoDark from '@/assets/images/ow_esports_logo_dark.png'

const prefersDark = ref<boolean>(false)
let mql: MediaQueryList | null = null
let handleEvent: ((e: MediaQueryListEvent) => void) | null = null
let handleLegacy: (() => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined' || !('matchMedia' in window)) return
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  prefersDark.value = mql.matches

  if (typeof mql.addEventListener === 'function') {
    handleEvent = (e: MediaQueryListEvent) => {
      prefersDark.value = e.matches
    }
    mql.addEventListener('change', handleEvent)
  } else if ('addListener' in mql) {
    handleLegacy = () => {
      prefersDark.value = !!mql?.matches
    }
    ;(mql as unknown as { addListener: (cb: () => void) => void }).addListener(handleLegacy)
  }
})

onBeforeUnmount(() => {
  if (!mql) return
  if (handleEvent && typeof mql.removeEventListener === 'function') {
    mql.removeEventListener('change', handleEvent)
  }
  if (handleLegacy && 'removeListener' in mql) {
    ;(mql as unknown as { removeListener: (cb: () => void) => void }).removeListener(handleLegacy)
  }
})

const logoSrc = computed(() => (prefersDark.value ? logoDark : logoLight))
</script>

<template>
  <div class="logo-container">
    <RouterLink to="/"><img class="logo-img" :src="logoSrc" alt="Logo" /></RouterLink>
  </div>
  <nav>
    <RouterLink to="/"><div class="link-container">Home</div></RouterLink>
    <RouterLink to="/about"><div class="link-container">About</div></RouterLink>
  </nav>
  <div class="user-container">USER</div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  margin-left: 5rem;
  height: 100%;
}

a {
  text-decoration: none;
  color: var(--color-text-2);
}

.user-container {
  margin-left: auto;
  margin-right: 0.75rem;
}

.link-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.link-container {
  padding: 0 1.2rem;
  cursor: pointer;
}

.link-container:hover {
  background-color: var(--color-background-1);
  border-bottom: 2px solid var(--color-border);
}

.logo-img {
  max-height: 100%;
  height: auto;
  width: auto;
}

.logo-container {
  height: 100%;
  max-height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
}

.logo-container > a {
  display: inline-flex;
  align-items: center;
  height: 75%;
}
</style>

<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts"
import { useAuthStore } from "~/stores/auth.client"

const authStore = useAuthStore()
const currentLayout: LayoutKey = "default"
function enableCustomLayout(layoutName: LayoutKey = currentLayout) {
  setPageLayout(layoutName)
}
definePageMeta({
  layout: false,
})
</script>

<template>
  <ClientOnly>
    <div class="p-4 bg-red-100 rounded-lg">
      <DevOnly>
        <p>Auth: {{ authStore.expiredAt }}</p>

        <h1 class="text-2xl font-bold mb-4">
          {{ formatNumber(12345) }} Khu vực dành cho thử nghiệm code của Dev
        </h1>
        <p>This is the about page of the Nuxt 3 application.</p>
        <button @click="enableCustomLayout('simple')">
          Update layout simple
        </button>
        <button @click="enableCustomLayout('default')">
          Update layout default
        </button>
        <button @click="authStore.setExpiredAt(1)">
          Set authStore expiredAt
        </button>
        <div class="bg-blend-overlay">var-neutral-500</div>
      </DevOnly>
    </div>
  </ClientOnly>
</template>

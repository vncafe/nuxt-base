<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in visibleToasts"
        :key="toast.id"
        class="min-w-[220px] px-4 py-3 rounded-lg shadow-lg text-white flex items-center justify-between"
        :class="getColor(toast.type)"
      >
        <span>{{ toast.message }}</span>

        <button
          class="ml-3 opacity-70 hover:opacity-100"
          @click="hide(toast.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import {
  useCustomToast,
  type ToastType,
} from "~/composables/common/useCustomToast"

const { toasts, hide } = useCustomToast()

const visibleToasts = computed(() => toasts.value.filter((t) => t.visible))

const getColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "bg-green-600"
    case "error":
      return "bg-red-600"
    case "warning":
      return "bg-yellow-600"
    default:
      return "bg-blue-800"
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.25s ease;
}
</style>

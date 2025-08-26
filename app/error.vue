<!-- app/error.vue để custom UI lỗi đẹp hơn và có nút “reset/redirect”. -->
<template>
    <div class="flex flex-col items-center justify-center h-screen text-center">
        <h1>{{ error?.statusCode }}</h1>
      <h1 class="text-4xl font-bold text-red-600">⚠️ Lỗi xảy ra</h1>
      <p class="mt-2 text-gray-700">
        {{ error?.message || 'Đã có sự cố, vui lòng thử lại sau.' }} 
      </p>
      <DevOnly>
        {{  error.stack }}
      </DevOnly>
  
      <button
        class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        @click="handleError"
      >
        Quay lại trang chủ
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
import type { NuxtError } from '#app'

  const props = defineProps<{ error: NuxtError }>()
  
  // Dùng để reset hoặc chuyển trang khác
  const handleError = () => {
    clearError({ redirect: '/' }) 
  }
  </script>
  
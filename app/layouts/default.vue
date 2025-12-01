<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 shadow">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">My Nuxt App</h1>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1 container mx-auto p-6">
      <slot />
      <!-- nơi hiển thị nội dung trang -->
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t">
      © 2025 My Nuxt App. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
// Đây là layout mặc định, Nuxt sẽ dùng cho mọi page
// trừ khi page đó chỉ định layout khác (vd: layout: 'auth')
</script>

<style scoped>
/* Có thể thêm style riêng cho layout này */
</style>

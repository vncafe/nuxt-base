<template>
  <!-- NuxtLayout sẽ tự chọn layout (default, auth, ...) -->
  <NuxtLayout>
    <!-- NuxtPage render nội dung trang -->
    <NuxtPage />
    <CustomToast />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Nếu muốn ép layout mặc định toàn app, có thể set layout ở đây.
// Nhưng thường thì mỗi page sẽ chọn layout qua definePageMeta.
</script>

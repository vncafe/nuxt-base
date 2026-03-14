<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
    <!-- Header -->
    <AppHeader
      app-name="My Nuxt App"
      :nav-items="headerNavItems"
      :action-items="headerActionItems"
      variant="standard"
      size="md"
      show-theme-toggle
      :is-dark-mode="isDark"
      @update:is-dark-mode="isDark = $event"
    />

    <!-- Main Layout: Sidebar + Content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <AppSidebar
        brand-name="My Nuxt App"
        brand-initial="MNA"
        :nav-items="sidebarNavItems"
        size="md"
        variant="dark"
        collapsible
        @toggle-collapse="handleSidebarToggle"
      >
        <template #footer>
          <button
            class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            @click="handleLogout"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </template>
      </AppSidebar>

      <!-- Content Area -->
      <main class="flex-1 overflow-auto">
        <div class="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <slot>
            <!-- Page content goes here -->
          </slot>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer
      class="bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-auto"
    >
      © {{ new Date().getFullYear() }} My Nuxt App. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface NavItem {
  label: string
  href: string
}

interface ActionItem {
  id: string
  label: string
  variant?: "primary" | "secondary" | "danger" | "outline"
  size?: "xs" | "sm" | "md" | "lg"
  onClick: () => void
}

interface SidebarNavItem {
  id: string
  label: string
  href?: string
  icon?: string
  badge?: {
    label: string
    color?: "red" | "green" | "blue" | "yellow" | "gray"
  }
  active?: boolean
  disabled?: boolean
  type: "item" | "group"
}

const isDark = ref(false)

// Header Navigation Items
const headerNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact-us" },
]

// Header Action Items
const headerActionItems: ActionItem[] = [
  {
    id: "login",
    label: "Login",
    variant: "primary",
    size: "md",
    onClick: () => {
      navigateTo("/login")
    },
  },
]

// Sidebar Navigation Items
const sidebarNavItems: SidebarNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4h4",
    type: "item",
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    type: "item",
  },
  {
    id: "reports",
    label: "Reports",
    href: "/reports",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    badge: { label: "3", color: "blue" },
    type: "item",
  },
  {
    id: "divider-1",
    label: "Settings",
    type: "group",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    type: "item",
  },
  {
    id: "preferences",
    label: "Preferences",
    href: "/preferences",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    type: "item",
  },
  {
    id: "security",
    label: "Security",
    href: "/security",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    badge: { label: "!", color: "red" },
    type: "item",
  },
]

// Handle sidebar toggle
const handleSidebarToggle = (collapsed: boolean) => {
  console.log("Sidebar collapsed:", collapsed)
}

// Handle logout
const handleLogout = () => {
  console.log("Logout clicked")
  navigateTo("/login")
}
</script>

<style scoped>
/* Custom layout styles */
</style>

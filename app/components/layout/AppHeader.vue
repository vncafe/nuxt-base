<template>
  <header :class="headerClasses" :style="headerStyles" role="banner">
    <div :class="containerClasses">
      <!-- Left Section: Logo + Nav -->
      <div class="flex items-center space-x-6">
        <!-- Logo -->
        <div :class="logoClasses">
          <slot name="logo">
            <span class="font-bold">{{ appName }}</span>
          </slot>
        </div>

        <!-- Desktop Navigation -->
        <nav
          v-if="showNav"
          class="hidden md:flex items-center"
          :class="`space-x-${navSpacing}`"
          role="navigation"
        >
          <slot name="nav">
            <template v-if="navItems.length">
              <NuxtLink
                v-for="item in navItems"
                :key="item.label"
                :to="item.href"
                :class="navLinkClasses"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </template>
          </slot>
        </nav>
      </div>

      <!-- Right Section: Actions + Mobile Menu Button -->
      <div class="flex items-center space-x-4">
        <!-- Custom Actions -->
        <slot name="actions">
          <template v-if="actionItems.length">
            <button
              v-for="action in actionItems"
              :key="action.label"
              :class="[getActionButtonClasses(action), 'transition-all']"
              @click="action.onClick"
            >
              <slot :name="`action-${action.id}`">
                {{ action.label }}
              </slot>
            </button>
          </template>
        </slot>

        <!-- Theme Toggle (optional) -->
        <button
          v-if="showThemeToggle"
          :class="themeToggleClasses"
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          @click="toggleTheme"
        >
          <slot name="theme-toggle">
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.232 4.232a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.536 0a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 10a1 1 0 110-2 1 1 0 010 2zm12 0a1 1 0 110-2 1 1 0 010 2zm-11.536 6.536a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm11.536 0a1 1 0 011.414-1.414l.707.707a1 1 0 11-1.414 1.414l-.707-.707zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </slot>
        </button>

        <!-- Mobile Menu Button -->
        <button
          v-if="showMobileMenu"
          :class="mobileMenuButtonClasses"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <transition :name="mobileMenuTransition">
      <div
        v-if="menuOpen && showMobileMenu"
        :class="mobileMenuOverlayClasses"
        @click="toggleMenu"
      >
        <div :class="mobileMenuPanelClasses" @click.stop>
          <!-- Mobile Nav -->
          <nav
            v-if="showNav"
            class="flex flex-col space-y-2 mb-6 pb-6 border-b"
            :class="mobileBorderColor"
            role="navigation"
          >
            <slot name="mobile-nav">
              <template v-if="navItems.length">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.label"
                  :to="item.href"
                  :class="mobileNavLinkClasses"
                  @click="menuOpen = false"
                >
                  {{ item.label }}
                </NuxtLink>
              </template>
            </slot>
          </nav>

          <!-- Mobile Actions -->
          <slot name="mobile-actions">
            <template v-if="actionItems.length">
              <button
                v-for="action in actionItems"
                :key="action.label"
                :class="mobileActionButtonClasses(action)"
                @click="handleMobileActionClick(action)"
              >
                {{ action.label }}
              </button>
            </template>
          </slot>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

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

type HeaderVariant = "standard" | "sticky" | "transparent"
type HeaderSize = "sm" | "md" | "lg"
type NavSpacing = "4" | "6" | "8"

const props = withDefaults(
  defineProps<{
    appName?: string
    navItems?: NavItem[]
    actionItems?: ActionItem[]
    variant?: HeaderVariant
    size?: HeaderSize
    navSpacing?: NavSpacing
    showNav?: boolean
    showMobileMenu?: boolean
    showThemeToggle?: boolean
    isDarkMode?: boolean
    bgColor?: string
    textColor?: string
    borderColor?: string
    mobileMenuPosition?: "left" | "right"
    mobileMenuTransition?: "slide" | "fade"
  }>(),
  {
    appName: "App",
    navItems: () => [],
    actionItems: () => [],
    variant: "standard",
    size: "md",
    navSpacing: "6",
    showNav: true,
    showMobileMenu: true,
    showThemeToggle: false,
    isDarkMode: false,
    bgColor: "bg-white dark:bg-gray-900",
    textColor: "text-gray-900 dark:text-white",
    borderColor: "border-gray-200 dark:border-gray-800",
    mobileMenuPosition: "right",
    mobileMenuTransition: "slide",
  },
)

const emit = defineEmits<{
  "update:isDarkMode": [value: boolean]
  "menu-toggle": [open: boolean]
}>()

const menuOpen = ref(false)
const isDark = ref(props.isDarkMode)

// Size mappings
const sizeConfig = computed(() => {
  const config: Record<HeaderSize, { px: string; py: string; text: string }> = {
    sm: { px: "px-4", py: "py-2", text: "text-sm" },
    md: { px: "px-6", py: "py-4", text: "text-base" },
    lg: { px: "px-8", py: "py-6", text: "text-lg" },
  }
  return config[props.size]
})

// Header classes
const headerClasses = computed(() => {
  const base = [
    "w-full",
    props.bgColor,
    props.textColor,
    "transition-all duration-200",
    sizeConfig.value.px,
    sizeConfig.value.py,
  ]

  if (props.variant === "sticky") {
    base.push("sticky top-0 z-40")
  }

  if (props.variant === "transparent") {
    base.push("bg-transparent")
  } else {
    base.push("shadow-md")
  }

  return base.join(" ")
})

const headerStyles = computed(() => ({
  "--nav-spacing": `${props.navSpacing}`,
}))

const containerClasses =
  "flex items-center justify-between w-full max-w-7xl mx-auto"

const logoClasses = computed(() =>
  [sizeConfig.value.text, "font-bold flex items-center"].join(" "),
)

const navLinkClasses =
  "hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"

const mobileNavLinkClasses =
  "block py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"

const themeToggleClasses =
  "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"

const mobileMenuButtonClasses =
  "md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"

const mobileMenuOverlayClasses = computed(() => [
  "fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity",
  props.mobileMenuTransition === "fade" ? "" : "",
])

const mobileMenuPanelClasses = computed(() => [
  "absolute top-0 w-3/4 max-w-xs bg-white dark:bg-gray-900 h-full shadow-lg p-6 transition-all",
  props.mobileMenuPosition === "right" ? "right-0" : "left-0",
  props.mobileMenuTransition === "slide"
    ? props.mobileMenuPosition === "right"
      ? "transform translate-x-0"
      : "transform -translate-x-0"
    : "",
])

const mobileBorderColor = props.borderColor

// Get action button classes
const getActionButtonClasses = (action: ActionItem) => {
  const sizeMap: Record<string, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }

  const variantMap: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  }

  const size = sizeMap[action.size || "md"]
  const variant = variantMap[action.variant || "primary"]

  return [
    size,
    variant,
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
  ].join(" ")
}

// Get mobile action button classes
const mobileActionButtonClasses = (action: ActionItem) =>
  [getActionButtonClasses(action), "w-full text-center"].join(" ")

// Navigation helpers
const isActive = (href: string): boolean => {
  if (import.meta.client) {
    return window.location.pathname === href
  }
  return false
}

// Toggle mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  emit("menu-toggle", menuOpen.value)
}

// Toggle dark mode
const toggleTheme = () => {
  isDark.value = !isDark.value
  emit("update:isDarkMode", isDark.value)
}

// Handle mobile action click
const handleMobileActionClick = (action: ActionItem) => {
  action.onClick()
  menuOpen.value = false
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

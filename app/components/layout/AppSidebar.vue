<template>
  <aside
    :class="sidebarClasses"
    :style="sidebarStyles"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <!-- Toggle Button -->
    <button
      v-if="collapsible"
      :class="toggleButtonClasses"
      :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="toggleCollapse"
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
          :d="isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'"
        />
      </svg>
    </button>

    <!-- Logo / Brand -->
    <div :class="logoContainerClasses">
      <slot name="logo">
        <div :class="logoClasses">
          <span v-if="!isCollapsed" class="font-bold">{{ brandName }}</span>
          <span v-else class="font-bold text-xs">{{ brandInitial }}</span>
        </div>
      </slot>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto" :class="navClasses" role="menu">
      <!-- Default or Custom Navigation -->
      <ul class="space-y-1">
        <slot name="nav">
          <!-- Render nav items if provided -->
          <template v-if="navItems.length">
            <template v-for="item in navItems" :key="item.id">
              <!-- Group Header -->
              <li v-if="item.type === 'group'" :class="groupHeaderClasses">
                <span
                  v-if="!isCollapsed"
                  class="text-xs font-semibold uppercase"
                >
                  {{ item.label }}
                </span>
              </li>

              <!-- Navigation Item -->
              <li v-else-if="item.type === 'item'">
                <NuxtLink
                  :to="item.href || '#'"
                  :class="getItemClasses(item)"
                  role="menuitem"
                  :aria-disabled="item.disabled"
                  :aria-current="item.active ? 'page' : undefined"
                >
                  <!-- Icon -->
                  <span v-if="item.icon" :class="itemIconClasses">
                    <slot :name="`icon-${item.id}`">
                      <img
                        v-if="item.icon.startsWith('/')"
                        :src="item.icon"
                        :alt="item.label"
                        class="w-5 h-5"
                      />
                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          :d="item.icon"
                        />
                      </svg>
                    </slot>
                  </span>

                  <!-- Label -->
                  <span v-if="!isCollapsed" class="flex-1">
                    {{ item.label }}
                  </span>

                  <!-- Badge -->
                  <span
                    v-if="item.badge && !isCollapsed"
                    :class="getBadgeClasses(item.badge)"
                  >
                    {{ item.badge.label }}
                  </span>
                </NuxtLink>
              </li>
            </template>
          </template>
        </slot>
      </ul>
    </nav>

    <!-- Divider -->
    <div v-if="$slots.footer" :class="dividerClasses" />

    <!-- Footer / Actions -->
    <div :class="footerClasses">
      <slot name="footer">
        <button :class="footerButtonClasses" @click="$emit('logout')">
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
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { ref, computed } from "vue"

interface NavItem {
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

type SidebarSize = "sm" | "md" | "lg"
type SidebarVariant = "light" | "dark" | "colored"

const props = withDefaults(
  defineProps<{
    brandName?: string
    brandInitial?: string
    navItems?: NavItem[]
    size?: SidebarSize
    variant?: SidebarVariant
    collapsible?: boolean
    collapsedByDefault?: boolean
    ariaLabel?: string
    bgColor?: string
    textColor?: string
    borderColor?: string
    accentColor?: string
  }>(),
  {
    brandName: "MyApp",
    brandInitial: "MA",
    navItems: () => [],
    size: "md",
    variant: "dark",
    collapsible: true,
    collapsedByDefault: false,
    ariaLabel: "Main navigation sidebar",
    bgColor: "bg-gray-800 dark:bg-gray-900",
    textColor: "text-gray-100 dark:text-gray-100",
    borderColor: "border-gray-700 dark:border-gray-800",
    accentColor: "bg-blue-600 hover:bg-blue-700",
  },
)

const emit = defineEmits<{
  "toggle-collapse": [collapsed: boolean]
  logout: []
}>()

const isCollapsed = ref(props.collapsedByDefault)

// Size configuration
const sizeConfig = computed(() => {
  const config: Record<SidebarSize, { width: string; px: string; py: string }> =
    {
      sm: { width: "w-48", px: "px-3", py: "py-2" },
      md: { width: "w-64", px: "px-4", py: "py-3" },
      lg: { width: "w-80", px: "px-6", py: "py-4" },
    }
  return config[props.size]
})

// Sidebar classes
const sidebarClasses = computed(() => {
  const base = [
    "flex flex-col h-full",
    !isCollapsed.value ? sizeConfig.value.width : "w-20",
    props.bgColor,
    props.textColor,
    "shadow-lg transition-all duration-300 ease-in-out",
  ]

  if (props.variant === "light") {
    base.push("bg-gray-50 dark:bg-gray-100 text-gray-900")
  }

  return base.join(" ")
})

const sidebarStyles = computed(() => {
  return {
    "--accent-color": props.accentColor,
  } as CSSProperties
})

const toggleButtonClasses =
  "absolute top-4 -right-3 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 rounded-full p-1 transition-colors z-10"

const logoContainerClasses = computed(() =>
  [
    "flex items-center justify-center border-b",
    props.borderColor,
    `h-${isCollapsed.value ? "16" : "20"}`,
    "transition-all duration-300",
  ]
    .filter(Boolean)
    .join(" "),
)

const logoClasses = "text-lg"

const navClasses = computed(() =>
  [sizeConfig.value.px, "pt-4 pb-2", "transition-all duration-300"].join(" "),
)

const groupHeaderClasses = computed(() =>
  [
    sizeConfig.value.px,
    "pt-6 first:pt-0 pb-2",
    "text-gray-400 dark:text-gray-500",
  ].join(" "),
)

const itemIconClasses = "flex-shrink-0 text-gray-400 dark:text-gray-500"

const dividerClasses = computed(() =>
  ["border-t", props.borderColor, "my-2"].join(" "),
)

const footerClasses = computed(() => [sizeConfig.value.px, "pb-4"].join(" "))

const footerButtonClasses = computed(() =>
  [
    "w-full flex items-center justify-center gap-2",
    sizeConfig.value.py,
    props.accentColor,
    "rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    props.variant === "light" ? "text-gray-900" : "text-white",
  ].join(" "),
)

// Get item classes
const getItemClasses = (item: NavItem): string => {
  const disabled = item.disabled
  const active = item.active

  const baseClasses = [
    "flex items-center gap-3 px-3 py-2 rounded-lg",
    "transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
    sizeConfig.value.px,
    sizeConfig.value.py,
  ]

  if (disabled) {
    baseClasses.push("opacity-50 cursor-not-allowed")
  } else if (active) {
    baseClasses.push(props.accentColor, "text-white")
  } else {
    baseClasses.push("hover:bg-gray-700 dark:hover:bg-gray-800")
  }

  return baseClasses.join(" ")
}

// Get badge classes
const getBadgeClasses = (badge: NavItem["badge"]): string => {
  const colorMap: Record<string, string> = {
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-gray-900",
    gray: "bg-gray-600 text-white",
  }

  const color = badge?.color || "gray"

  return ["px-2 py-1 rounded-full text-xs font-semibold", colorMap[color]].join(
    " ",
  )
}

// Toggle collapse
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit("toggle-collapse", isCollapsed.value)
}
</script>

<style scoped>
aside {
  position: relative;
}

/* Custom scrollbar styling */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.5);
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}

/* Smooth transitions for collapse animation */
.w-20 {
  transition: width 0.3s ease-in-out;
}
</style>

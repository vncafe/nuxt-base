<template>
  <div class="relative inline-block w-full" @keydown.esc="close">
    <!-- Trigger Button -->
    <button
      :id="`dropdown-button-${dropdownId}`"
      :class="buttonClasses"
      type="button"
      :aria-expanded="open"
      :aria-haspopup="true"
      :aria-controls="`dropdown-menu-${dropdownId}`"
      :disabled="disabled"
      @click="toggle"
      @keydown.arrow-down="handleKeyDown"
      @keydown.arrow-up="handleKeyUp"
    >
      <slot name="button">
        <span class="flex-1 text-left">{{ buttonLabel }}</span>
      </slot>

      <!-- Dropdown Icon -->
      <slot name="icon">
        <svg
          :class="[
            'w-4 h-4 ml-2 shrink-0 transition-transform duration-200',
            open ? 'rotate-180' : '',
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div
        v-if="open"
        :id="`dropdown-menu-${dropdownId}`"
        :class="menuClasses"
        role="menu"
        :aria-labelledby="`dropdown-button-${dropdownId}`"
        @click.stop
        @keydown.esc="close"
      >
        <slot name="menu">
          <ul class="py-1" role="none">
            <li
              v-for="(item, idx) in items"
              :key="idx"
              :class="getItemClasses(item)"
              role="none"
              @click="select(item)"
              @keydown.enter="select(item)"
              @keydown.space="select(item)"
            >
              <button
                type="button"
                role="menuitem"
                :aria-selected="isSelected(item)"
                class="w-full text-left px-4 py-2 focus:outline-none focus:bg-gray-100"
              >
                <slot name="item" :item="item">
                  {{ item.label }}
                </slot>
              </button>
            </li>
          </ul>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue"

interface DropdownItem {
  label: string
  value?: unknown
  disabled?: boolean
  [key: string]: unknown
}

type DropdownSize = "xs" | "sm" | "md" | "lg" | "xl"
type DropdownPlacement = "bottom" | "top"

const props = withDefaults(
  defineProps<{
    items?: DropdownItem[]
    modelValue?: unknown
    buttonLabel?: string
    size?: DropdownSize
    placement?: DropdownPlacement
    disabled?: boolean
  }>(),
  {
    items: () => [],
    modelValue: undefined,
    buttonLabel: "Dropdown",
    size: "md",
    placement: "bottom",
    disabled: false,
  },
)

const emit = defineEmits<{
  "update:modelValue": [value: unknown]
  select: [item: DropdownItem]
  open: []
  close: []
}>()

const open = ref(false)
const dropdownId = `${Math.random().toString(36).substr(2, 9)}`
let focusedIndex = -1

// Size classes
const sizeClasses = computed(() => {
  const sizeMap: Record<DropdownSize, string> = {
    xs: "px-3 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-3 text-lg",
    xl: "px-5 py-3 text-xl",
  }
  return sizeMap[props.size]
})

// Button classes
const buttonClasses = computed(() =>
  [
    sizeClasses.value,
    "w-full flex items-center justify-between",
    "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600",
    "rounded-lg shadow-sm",
    "text-gray-900 dark:text-gray-100",
    "font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400",
    !props.disabled
      ? "hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      : "opacity-50 cursor-not-allowed",
  ].join(" "),
)

// Menu classes
const menuClasses = computed(() => {
  const placementMap: Record<DropdownPlacement, string> = {
    bottom: "top-full mt-1",
    top: "bottom-full mb-1",
  }
  return [
    "absolute z-50 w-full",
    placementMap[props.placement],
    "bg-white dark:bg-gray-800",
    "border border-gray-300 dark:border-gray-600",
    "rounded-lg shadow-lg",
  ].join(" ")
})

// Get item-specific classes
const getItemClasses = (item: DropdownItem) =>
  [
    "first:rounded-t-lg last:rounded-b-lg",
    isSelected(item) ? "bg-blue-50 dark:bg-blue-900" : "",
    item.disabled
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ")

// Check if item is selected
const isSelected = (item: DropdownItem): boolean => {
  if (item.value !== undefined) {
    return item.value === props.modelValue
  }
  return item === props.modelValue
}

// Toggle dropdown open/close
const toggle = () => {
  if (props.disabled) return
  open.value = !open.value
  focusedIndex = -1
  if (open.value) {
    emit("open")
    nextTick(() => {
      focusedIndex = props.items.findIndex(
        (item) => !item.disabled && isSelected(item),
      )
      if (focusedIndex === -1) {
        focusedIndex = 0
      }
    })
  } else {
    emit("close")
  }
}

// Close dropdown
const close = () => {
  open.value = false
  focusedIndex = -1
  emit("close")
}

// Handle outside clicks
const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdownEl = document.getElementById(`dropdown-menu-${dropdownId}`)
  const buttonEl = document.getElementById(`dropdown-button-${dropdownId}`)

  if (
    dropdownEl &&
    buttonEl &&
    !dropdownEl.contains(target) &&
    !buttonEl.contains(target)
  ) {
    close()
  }
}

// Manage outside click listener
const manageClickListener = (shouldAdd: boolean) => {
  if (shouldAdd) {
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick)
    }, 0)
  } else {
    document.removeEventListener("click", handleOutsideClick)
  }
}

// Watch for open state changes
watch(open, (newOpen) => {
  manageClickListener(newOpen)
})

// Select item
const select = (item: DropdownItem) => {
  if (item.disabled) return
  const value = item.value !== undefined ? item.value : item
  emit("update:modelValue", value)
  emit("select", item)
  close()
}

// Keyboard navigation: arrow down
const handleKeyDown = () => {
  if (!open.value) {
    open.value = true
    focusedIndex = 0
    emit("open")
  } else {
    focusedIndex = Math.min(focusedIndex + 1, props.items.length - 1)
  }
}

// Keyboard navigation: arrow up
const handleKeyUp = () => {
  if (open.value) {
    focusedIndex = Math.max(focusedIndex - 1, 0)
  }
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

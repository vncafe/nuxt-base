<template>
  <button
    :class="[
      // Base styles
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
      // Size
      sizeClasses,
      // Variants
      variantClasses,
      // Full width
      fullWidth && 'w-full',
      // Custom classes
      className,
    ]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
    @keydown.enter="handleKeydown"
    @keydown.space="handleKeydown"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Icon Before -->
    <slot v-if="!loading" name="icon-before" />

    <!-- Text Content -->
    <span v-if="!loading || !hideTextOnLoad">
      <slot />
    </span>

    <!-- Icon After -->
    <slot v-if="!loading" name="icon-after" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

type ButtonType = "button" | "submit" | "reset"
type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline"
  | "ghost"
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  hideTextOnLoad?: boolean
  fullWidth?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  hideTextOnLoad: false,
  fullWidth: false,
  className: "",
})

const emit = defineEmits<{
  click: [event?: MouseEvent | KeyboardEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.disabled && !props.loading) {
    event.preventDefault()
    emit("click", event)
  }
}

const sizeClasses = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
    xl: "px-10 py-4 text-xl",
  }

  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-300 active:bg-gray-200",
  }

  return variants[props.variant]
})
</script>

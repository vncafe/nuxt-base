<template>
  <Teleport to="body">
    <Transition
      :name="transitionName"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <!-- Backdrop -->
      <div
        v-show="modelValue"
        :class="backdropClasses"
        tabindex="-1"
        @click="handleBackdropClick"
        @keydown.escape="handleEscape"
      >
        <!-- Modal Content -->
        <div
          :class="modalClasses"
          role="dialog"
          :aria-modal="modelValue"
          :aria-labelledby="headerId"
          :aria-hidden="!modelValue"
        >
          <!-- Header -->
          <div
            v-if="showHeader"
            :id="headerId"
            class="flex items-center justify-between border-b border-gray-200 pb-4"
          >
            <h2 class="text-lg font-semibold text-gray-900">
              <slot name="header">
                {{ title }}
              </slot>
            </h2>
            <button
              type="button"
              class="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              :aria-label="`Close ${title || 'modal'}`"
              @click="close"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div :class="contentClasses">
            <slot>
              <p class="text-gray-500">Modal content goes here.</p>
            </slot>
          </div>

          <!-- Footer -->
          <div
            v-if="showFooter"
            class="flex items-center justify-end gap-3 border-t border-gray-200 pt-4"
          >
            <slot name="footer">
              <button
                type="button"
                class="px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                @click="close"
              >
                {{ cancelText }}
              </button>
              <button
                v-if="showConfirm"
                type="button"
                :class="confirmButtonClasses"
                :disabled="isLoading || confirmDisabled"
                @click="handleConfirm"
              >
                <svg
                  v-if="isLoading"
                  class="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
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
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { nanoid } from "nanoid"

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl"
type ModalPosition = "center" | "top"
type TransitionVariant = "fade" | "scale" | "slide"

interface Props {
  modelValue?: boolean
  title?: string
  size?: ModalSize
  position?: ModalPosition
  transition?: TransitionVariant
  scrollable?: boolean
  showHeader?: boolean
  showFooter?: boolean
  showConfirm?: boolean
  dismissOnBackdrop?: boolean
  dismissOnEscape?: boolean
  confirmText?: string
  cancelText?: string
  confirmDisabled?: boolean
  isLoading?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: "",
  size: "md",
  position: "center",
  transition: "fade",
  scrollable: false,
  showHeader: true,
  showFooter: true,
  showConfirm: false,
  dismissOnBackdrop: true,
  dismissOnEscape: true,
  confirmText: "Confirm",
  cancelText: "Cancel",
  confirmDisabled: false,
  isLoading: false,
  className: "",
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
  confirm: []
  opened: []
  closed: []
}>()

const mainElement = ref<HTMLElement | null>(null)
const headerId = computed(() => `modal-header-${nanoid(8)}`)

// ============================================================================
// Computed Properties
// ============================================================================

const transitionName = computed(() => {
  const transitions: Record<TransitionVariant, string> = {
    fade: "modal-fade",
    scale: "modal-scale",
    slide: "modal-slide",
  }
  return transitions[props.transition]
})

const sizeClasses = computed(() => {
  const sizes: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  }
  return sizes[props.size]
})

const positionClasses = computed(() => {
  return props.position === "center"
    ? "items-center justify-center min-h-screen"
    : "items-start justify-center pt-20"
})

const backdropClasses = computed(() => {
  return [
    "fixed inset-0 z-50 flex",
    positionClasses.value,
    "bg-black/50 transition-opacity duration-200",
    props.className,
  ]
})

const modalClasses = computed(() => {
  return [
    "relative w-full rounded-lg bg-white shadow-xl",
    sizeClasses.value,
    "p-6 max-h-[90vh] transition-all duration-200",
    props.scrollable && "overflow-y-auto",
    "focus:outline-none",
  ]
})

const contentClasses = computed(() => {
  return [
    "py-4",
    props.showHeader && "border-t border-gray-200",
    props.showFooter && "border-b border-gray-200",
  ]
})

const confirmButtonClasses = computed(() => {
  return [
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    props.isLoading || props.confirmDisabled
      ? "cursor-not-allowed bg-blue-400 text-white opacity-70"
      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  ]
})

// ============================================================================
// Methods
// ============================================================================

const close = () => {
  emit("update:modelValue", false)
  emit("closed")
}

const handleBackdropClick = () => {
  if (props.dismissOnBackdrop) {
    close()
  }
}

const handleEscape = () => {
  if (props.dismissOnEscape) {
    close()
  }
}

const handleConfirm = () => {
  if (!props.isLoading && !props.confirmDisabled) {
    emit("confirm")
  }
}

const handleEnter = () => {
  emit("opened")
  // Focus trap: focus the first focusable element or the modal itself
  if (mainElement.value) {
    const focusableElements = mainElement.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    if (firstElement) {
      firstElement.focus()
    } else {
      mainElement.value.focus()
    }
  }
}

const handleLeave = () => {
  // Optional: Focus back to trigger element if needed
}

// ============================================================================
// Watchers
// ============================================================================

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && typeof document !== "undefined") {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    } else if (typeof document !== "undefined") {
      document.body.style.overflow = ""
    }
  },
)
</script>

<style scoped>
/* Fade Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Scale Transition */
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Slide Transition */
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

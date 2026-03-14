<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="mb-2 block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="required">*</span>
    </label>

    <!-- Input Wrapper -->
    <div class="relative">
      <!-- Icon Before -->
      <div
        v-if="$slots['icon-before']"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <span class="text-gray-500">
          <slot name="icon-before" />
        </span>
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :minlength="minlength"
        :pattern="pattern"
        :aria-label="label || placeholder"
        :aria-invalid="!!error"
        :aria-describedby="
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        "
        :class="inputClasses"
        class="transition-colors"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Icon After -->
      <div
        v-if="$slots['icon-after']"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <span :class="iconAfterClasses">
          <slot name="icon-after" />
        </span>
      </div>

      <!-- Clear Button (for text inputs) -->
      <button
        v-if="showClear && isFilled && !disabled && !readonly"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
        :aria-label="`Clear ${label || 'input'}`"
        @click="handleClear"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
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

    <!-- Error Message -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1 text-sm font-medium text-red-600"
      role="alert"
    >
      {{ error }}
    </p>

    <!-- Helper Text -->
    <p
      v-if="helper && !error"
      :id="`${inputId}-helper`"
      class="mt-1 text-xs text-gray-500"
    >
      {{ helper }}
    </p>

    <!-- Validation Counter (for max length) -->
    <p v-if="showCounter && maxlength" class="mt-1 text-xs text-gray-500">
      {{ currentLength }} / {{ maxlength }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"
import { nanoid } from "nanoid"

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
type InputSize = "xs" | "sm" | "md" | "lg" | "xl"

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: InputType
  size?: InputSize
  id?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  helper?: string
  autocomplete?: string
  maxlength?: number
  minlength?: number
  pattern?: string
  showClear?: boolean
  showCounter?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  type: "text",
  size: "md",
  id: "",
  disabled: false,
  readonly: false,
  required: false,
  error: "",
  helper: "",
  autocomplete: "",
  maxlength: undefined,
  minlength: undefined,
  pattern: "",
  showClear: false,
  showCounter: false,
  className: "",
})

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const slots = useSlots()

// ============================================================================
// Computed Properties
// ============================================================================

// Generate unique ID if not provided
const inputId = computed(() => props.id || `input-${nanoid(8)}`)

const containerClasses = computed(() => "w-full")

const sizeClasses = computed(() => {
  const sizes: Record<InputSize, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-3 text-lg",
    xl: "px-5 py-3.5 text-xl",
  }
  return sizes[props.size]
})

const baseInputClasses = [
  "block w-full rounded-lg border-2 transition-colors focus:outline-none",
]

const borderColorClasses = computed(() => {
  return props.error
    ? "border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
    : "border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
})

const stateClasses = computed(() => {
  return [
    props.disabled && "cursor-not-allowed bg-gray-100 text-gray-500",
    props.readonly && "bg-gray-50 text-gray-600 cursor-default",
  ]
})

const inputClasses = computed(() => {
  return [
    ...baseInputClasses,
    sizeClasses.value,
    borderColorClasses.value,
    ...stateClasses.value,
    slots["icon-before"] && "pl-10",
    (slots["icon-after"] || props.showClear) && "pr-10",
    props.className,
  ]
})

const iconAfterClasses = computed(() => {
  return props.error ? "text-red-500" : "text-gray-500"
})

const currentLength = computed(() => {
  return props.modelValue?.toString().length || 0
})

const isFilled = computed(() => {
  return props.modelValue !== undefined && props.modelValue !== ""
})

// ============================================================================
// Event Handlers
// ============================================================================

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit("focus", event)
}

const handleBlur = (event: FocusEvent) => {
  emit("blur", event)
}

const handleClear = () => {
  emit("update:modelValue", "")
  emit("clear")
}
</script>

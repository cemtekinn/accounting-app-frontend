<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  help: {
    type: String,
    default: null,
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  required: {
    type: Boolean,
    default: true,
  },
  mask: {
    type: [String, Array],
    default: '',
  },
  className: {
    type: String,
    default: 'mb-4',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  inputProps: {
    type: Object,
    default: () => ({}),
  },
})

const inputValue = ref(props.form.fields?.[props.name] || '')

watch(
  () => props.form.fields?.[props.name],
  (newVal) => {
    if (newVal !== inputValue.value) inputValue.value = newVal
  }
)

watch(inputValue, (newVal) => {
  if (props.form.fields) props.form.fields[props.name] = newVal
})

function clearInput() {
  inputValue.value = ''
  const inputEl = document.getElementById(props.name)
  if (inputEl) inputEl.focus()
}
</script>

<template>
  <div :class="className">
    <label v-if="showLabel" :for="name" class="form-label fw-semibold text-dark mb-1">
      {{ placeholder }} <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="input-wrapper position-relative">
      <input
        v-if="!!mask"
        v-mask="mask"
        :type="type"
        class="form-control rounded-3 shadow-sm px-3 py-2 border"
        :class="{ 'is-invalid border-danger': !!form.errors[name] }"
        :id="name"
        v-model="inputValue"
        :required="required"
        v-bind="inputProps"
        :placeholder="placeholder"
      />

      <input
        v-else
        :type="type"
        class="form-control rounded-3 shadow-sm px-3 py-2 border"
        :class="{ 'is-invalid border-danger': !!form.errors[name] }"
        :id="name"
        v-model="inputValue"
        :required="required"
        v-bind="inputProps"
        :placeholder="placeholder"
      />

      <button
        v-if="inputValue"
        type="button"
        class="btn-clear"
        @click="clearInput"
        aria-label="Clear input"
      >
        ×
      </button>
    </div>

    <div class="form-text text-muted mt-1" v-if="help">
      {{ help }}
    </div>

    <div class="invalid-feedback d-block mt-1 fw-medium" v-if="!!form.errors[name]">
      {{ form.errors[name].join(', ') }}
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
}

.btn-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #888;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 0;
}

.btn-clear:hover {
  color: #000;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

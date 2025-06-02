<script setup>
defineProps({
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
</script>

<template>
  <div :class="className">
    <!-- Etiket -->
    <label v-if="showLabel" :for="name" class="form-label fw-semibold text-secondary mb-1">
      {{ placeholder }} <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- Input alanı -->
    <input
      v-if="!!mask"
      v-mask="mask"
      :type="type"
      class="form-control rounded-3 shadow-sm px-3 py-2 border"
      :class="{ 'is-invalid border-danger': !!form.errors[name] }"
      :id="name"
      v-model="form.fields[name]"
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
      v-model="form.fields[name]"
      :required="required"
      v-bind="inputProps"
      :placeholder="placeholder"
    />

    <!-- Yardımcı açıklama -->
    <div class="form-text text-muted mt-1" v-if="help">
      {{ help }}
    </div>

    <!-- Hata mesajı -->
    <div class="invalid-feedback d-block mt-1 fw-medium" v-if="!!form.errors[name]">
      {{ form.errors[name].join(', ') }}
    </div>
  </div>
</template>

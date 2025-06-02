<script setup>
import { reactive, watch } from 'vue'
import Modal from '@/components/Common/Modals/Modal.vue'
import AppInput from '@/components/Form/AppInput.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Ekleme ve Düzenleme Modalı',
  },
  isOpen: Boolean,
  inputs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['close', 'update:modelValue', 'submit'])

const formData = reactive({})

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      props.inputs.forEach((input) => {
        formData[input.key] = props.modelValue?.[input.key] ?? ''
      })
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('update:modelValue', { ...formData })
  emit('submit', { ...formData })
  emit('close')
}
</script>

<template>
  <Modal :modal-open="isOpen" :close-modal="() => emit('close')" :title="title">
    <form @submit.prevent="handleSubmit">
      <AppInput
        v-for="input in inputs"
        :key="input.key"
        :name="input.key"
        :placeholder="input.placeholder || input.label || ''"
        :type="input.type || 'text'"
        :form="{ fields: formData, errors: {} }"
        :required="input.required ?? true"
        :mask="input.mask || ''"
        :className="'mb-3'"
        :showLabel="true"
        :inputProps="input.inputProps || {}"
      />

      <button type="submit" class="btn btn-success">Kaydet</button>
    </form>
  </Modal>
</template>

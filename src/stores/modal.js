import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const createModal = () => {
    const modal = ref({
      if_open: false,
      is_open: false,
      close: () => (modal.value.is_open = false),
      open: () => (modal.value.if_open = true),
    })

    watch(
      () => modal.value.if_open,
      (val) => {
        setTimeout(() => (modal.value.is_open = val), 100)
      },
    )

    watch(
      () => modal.value.is_open,
      (val) => {
        setTimeout(() => (modal.value.if_open = val), 300)
      },
    )

    return modal
  }

  const defaultModalNames = [
    // Add modal names here
    'numpad'
  ]

  const defaultModals = {}
  defaultModalNames.forEach((name) => {
    defaultModals[name] = createModal()
  })

  return defaultModals
})

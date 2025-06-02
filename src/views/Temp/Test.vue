<script setup>
import { ref } from 'vue'
import CreateEditModal from '@/components/Modals/CreateEditModal.vue'
import Layout from '@/layouts/Main.vue'

const showNumpad = ref(false)

const inputs = [
  {
    key: 'name',
    label: 'Ürün Adı',
    placeholder: 'Ürün adını girin',
    type: 'text',
    required: true,
  },
  {
    key: 'price',
    label: 'Fiyat',
    placeholder: 'Fiyat girin',
    type: 'number',
    required: true,
  },
  {
    key: 'barcode',
    label: 'Barkod',
    placeholder: 'Barkod numarası',
    type: 'text',
    mask: '####-####-####',
  },
]
</script>

<template>
  <Layout>
    <button @click="showNumpad = true">Dinamik Modal</button>
  </Layout>
  <CreateEditModal :is-open="showNumpad" @close="showNumpad = false" :inputs="inputs" />
</template>

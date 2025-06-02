<script setup>
import Layout from '@/layouts/Main.vue'
import { ref, computed } from 'vue'
import ProductShortcuts from '@/components/Quicksale/ProductShortcuts.vue'
import CustomTable from '@/components/CustomTable.vue'

const barcodeInput = ref('')
const products = ref([
  { id: 1, name: 'Cola', price: 20 },
  { id: 2, name: 'Cips', price: 30 },
  { id: 3, name: 'Sandviç', price: 45 },
  { id: 4, name: 'Kahve', price: 35 },
])

const cart = ref([])

const addToCart = (product) => {
  const existing = cart.value.find((p) => p.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const handleBarcodeEnter = () => {
  const found = products.value.find((p) => p.id === parseInt(barcodeInput.value))
  if (found) addToCart(found)
  barcodeInput.value = ''
}

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

const removeFromCart = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id)
}

const completeSale = () => {
  alert('Satış tamamlandı.')
  cart.value = []
}

const tableConfig = {
  name: 'Ürün',
  quantity: 'Adet',
  unit: 'Birim',
  total: 'Toplam',
  action: 'İşlem',
}

const data = [
  {
    name: 'Tükenmez Kalem',
    quantity: 10,
    unit: 'Adet',
    total: 50,
    action: 'Sil',
  },
  {
    name: 'Spiral Defter',
    quantity: 5,
    unit: 'Adet',
    total: 75,
    action: 'Sil',
  },
  {
    name: 'A4 Kağıt (500\'lü)',
    quantity: 2,
    unit: 'Kutu',
    total: 120,
    action: 'Sil',
  },
  {
    name: 'Zımba Makinesi',
    quantity: 1,
    unit: 'Adet',
    total: 45,
    action: 'Sil',
  },
  {
    name: 'Karton Klasör',
    quantity: 4,
    unit: 'Adet',
    total: 60,
    action: 'Sil',
  },
  {
    name: 'Yapışkan Not Kağıdı',
    quantity: 6,
    unit: 'Adet',
    total: 30,
    action: 'Sil',
  },
  {
    name: 'Silgi',
    quantity: 8,
    unit: 'Adet',
    total: 16,
    action: 'Sil',
  },
  {
    name: 'Cetvel (30 cm)',
    quantity: 3,
    unit: 'Adet',
    total: 15,
    action: 'Sil',
  },
  {
    name: 'Kurşun Kalem',
    quantity: 12,
    unit: 'Adet',
    total: 36,
    action: 'Sil',
  },
  {
    name: 'Yapıştırıcı',
    quantity: 2,
    unit: 'Tüp',
    total: 18,
    action: 'Sil',
  },
];


</script>

<template>
  <Layout>
    <div class="container-fluid p-3">
      <div class="row" style="min-height: 80vh">

        <div class="col-md-7 border-end">


          <div class="mb-3">
            <label class="form-label fw-bold">Barkod:</label>
            <input
              v-model="barcodeInput"
              @keyup.enter="handleBarcodeEnter"
              class="form-control form-control-lg"
              placeholder="Barkodu okutun veya yazın"
              autofocus
            />
          </div>

          <CustomTable title="Sepetteki Ürünler" :config="tableConfig" :data="data" />
        </div>

        <ProductShortcuts />
      </div>

      <!-- ALT PANEL - Toplam ve Satışı Tamamla -->
      <div class="border-top pt-3 mt-4 d-flex justify-content-between align-items-center">
        <h4 class="m-0">
          Toplam: <span class="text-success">₺{{ total }}</span>
        </h4>
        <button
          class="btn btn-lg btn-success px-5"
          :disabled="cart.length === 0"
          @click="completeSale"
        >
          ✅ Satışı Tamamla
        </button>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
input::placeholder {
  font-size: 1.1rem;
}
</style>

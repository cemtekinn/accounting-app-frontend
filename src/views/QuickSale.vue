<script setup>
import Layout from '@/layouts/Main.vue'
import { ref, computed } from 'vue'
import ProductShortcuts from '@/components/QuickSale/ProductShortcuts.vue'

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
</script>

<template>
  <Layout>
    <div class="container-fluid p-3">
      <div class="row" style="min-height: 80vh">
        <!-- SOL PANEL -->
        <div class="col-md-7 border-end">
          <!-- Barkod Girişi -->
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

          <!-- DataTable -->
          <div class="table-responsive mt-4">
            <table class="table table-bordered align-middle text-center">
              <thead class="table-light">
                <tr>
                  <th>Ürün</th>
                  <th>Adet</th>
                  <th>Birim</th>
                  <th>Toplam</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>₺{{ item.price }}</td>
                  <td>₺{{ item.price * item.quantity }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">
                      ✖
                    </button>
                  </td>
                </tr>
                <tr v-if="cart.length === 0">
                  <td colspan="5" class="text-muted">Sepet boş</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ürün kısayolları -->
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

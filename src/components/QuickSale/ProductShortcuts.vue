<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Kola', price: 25, category: 'İçecekler' },
  { id: 2, name: 'Su', price: 10, category: 'İçecekler' },
  { id: 3, name: 'Cips', price: 30, category: 'Atıştırmalıklar' },
  { id: 4, name: 'Sandviç', price: 45, category: 'Yemekler' },
  { id: 5, name: 'Çay', price: 15, category: 'İçecekler' },
  { id: 6, name: 'Kahve', price: 20, category: 'İçecekler' },
])

const categories = ref([
  'Tümü',
  'İçecekler',
  'Atıştırmalıklar',
  'Yemekler',
  'Tatlılar',
  'Kahvaltılıklar',
  'Salatalar',
  'Çorbalar',
  'Sandviçler',
  'Süt Ürünleri',
  'Unlu Mamuller',
  'Dondurmalar',
  'Meyveler',
  'Sebzeler',
  'Kuruyemişler',
  'Sağlıklı Atıştırmalıklar',
  'Hazır Yemekler',
  'Enerji İçecekleri',
])

const selectedCategory = ref('Tümü')

const filteredProducts = computed(() =>
  selectedCategory.value === 'Tümü'
    ? products.value
    : products.value.filter((p) => p.category === selectedCategory.value),
)

const addToCart = (product) => {
  alert(`${product.name} sepete eklendi!`)
}

const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="col-md-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-bold">Hızlı Ürünler</h5>

      <button
        class="btn btn-outline-dark d-flex align-items-center gap-2 dashed-border"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasCategories"
        aria-controls="offcanvasCategories"
      >
        <i class="fa-solid fa-bars"></i>

        Kategoriler
      </button>

    </div>

    <div class="row g-3">
      <div class="col-6 col-sm-4 col-md-4" v-for="product in filteredProducts" :key="product.id">
        <button class="btn btn-outline-primary w-100 py-3" @click="addToCart(product)">
          {{ product.name }}<br />
          <small>₺{{ product.price }}</small>
        </button>
      </div>
    </div>

    <div
      class="offcanvas offcanvas-end custom-offcanvas"
      id="offcanvasCategories"
      tabindex="-1"
      aria-labelledby="offcanvasCategoriesLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasCategoriesLabel">Kategoriler</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category"
            :class="['category-item', { active: selectedCategory === category }]"
            @click="selectCategory(category)"
            data-bs-dismiss="offcanvas"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashed-border {
  border-style: dashed !important;
}

.custom-offcanvas {
  background-color: #f5f6fa;
  border-left: 1px solid #dee2e6;

  .offcanvas-header {
    padding: 1rem 1.25rem;
    background-color: #e9ecef;
    border-bottom: 1px solid #dee2e6;

    .offcanvas-title {
      font-weight: 600;
      font-size: 1.25rem;
      color: #2a3042;
    }
  }

  .offcanvas-body {
    padding: 1.25rem;

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;

      .category-item {
        background-color: white;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        color: #2a3042;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        user-select: none;

        &:hover {
          background-color: #2a3042;
          color: white;
        }

        &.active {
          background-color: #2a3042;
          color: white;
          font-weight: 600;
        }
      }
    }
  }
}
</style>

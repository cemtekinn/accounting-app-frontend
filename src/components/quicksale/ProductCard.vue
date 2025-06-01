<script setup>
import { computed } from 'vue'

const props = defineProps({
  imageSrc: String,
  title: {
    type: String,
    default: 'Ürün',
  },
  price: [String, Number],
  altText: {
    type: String,
    default: 'Product Image',
  },
})

const isImageAvailable = computed(() => !!props.imageSrc?.trim())
const shortTitle = computed(() => props.title.slice(0, 5).toUpperCase())
</script>

<template>
  <div class="product-card">
    <div class="product-card__image">
      <template v-if="isImageAvailable">
        <img :src="imageSrc" :alt="altText" />
      </template>
      <template v-else>
        <div class="placeholder-image">{{ shortTitle }}</div>
      </template>
    </div>
    <div class="product-card__info">
      <div class="product-card__info__title">{{ title }}</div>
      <div class="product-card__info__price">{{ price }} TL</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  width: 150px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgb(13 110 253 / 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  user-select: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgb(13 110 253 / 0.4);
    border-color: #0a58ca;
  }

  &__image {
    width: 100%;
    height: 150px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      background-color: #dee2e6;
      color: #0d6efd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  &__info {
    padding: 0.5rem 1rem 1rem;
    text-align: left;

    &__title {
      font-size: 1rem;
      font-weight: 600;
      color: #0d6efd;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__price {
      font-size: 0.95rem;
      font-weight: 700;
      color: #198754;
    }
  }
}
</style>

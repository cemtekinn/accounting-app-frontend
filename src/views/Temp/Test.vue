<script setup>
import Layout from '@/layouts/Main.vue'
</script>

<template>
  <Layout>
    <button class="minimalist-btn">Kategoriler</button>
  </Layout>
</template>



<style>
.minimalist-btn {
  background-color: #2A3042;
  color: #E6E8F0; /* Açık, soft metin rengi */
  border: 1.5px solid transparent;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  box-shadow: none;
  user-select: none;
  display: inline-block;
  text-align: center;
}

.minimalist-btn:hover {
  background-color: transparent;
  border-color: #2A3042;
  color: #2A3042;
}

.minimalist-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(42, 48, 66, 0.3);
}

.minimalist-btn:active {
  background-color: #1F2433;
  color: #B0B3C7;
  border-color: #1F2433;
}
</style>

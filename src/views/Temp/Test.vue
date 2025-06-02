<script setup>
import Layout from '@/layouts/Main.vue'
</script>

<template>
  <Layout>
    <div class="container py-5">
      <h2 class="mb-4 text-center">Zaman Çizelgesi</h2>
      <ul class="timeline">
        <!-- Örnek 1. madde -->
        <li class="timeline-item">
          <div class="timeline-point"></div>
          <div class="timeline-content card shadow-sm">
            <div class="card-body">
              <span class="fw-bold text-primary">01 Ocak 2020</span>
              <h5 class="mt-2">Proje Başlangıcı</h5>
              <p class="mb-0">
                Bu tarihte projenin ilk planlama aşamasına başlandı.
              </p>
            </div>
          </div>
        </li>

        <!-- Örnek 2. madde -->
        <li class="timeline-item">
          <div class="timeline-point"></div>
          <div class="timeline-content card shadow-sm">
            <div class="card-body">
              <span class="fw-bold text-primary">15 Mart 2020</span>
              <h5 class="mt-2">Tasarım Tamamlandı</h5>
              <p class="mb-0">
                UI/UX tasarım ekibi, ana wireframe ve mockup’ları bu tarihte teslim etti.
              </p>
            </div>
          </div>
        </li>

        <!-- Örnek 3. madde -->
        <li class="timeline-item">
          <div class="timeline-point"></div>
          <div class="timeline-content card shadow-sm">
            <div class="card-body">
              <span class="fw-bold text-primary">30 Haziran 2020</span>
              <h5 class="mt-2">Geliştirme Aşaması</h5>
              <p class="mb-0">
                Geliştirici ekibi ana modülleri kodlamaya başladı.
              </p>
            </div>
          </div>
        </li>

        <!-- Örnek 4. madde -->
        <li class="timeline-item">
          <div class="timeline-point"></div>
          <div class="timeline-content card shadow-sm">
            <div class="card-body">
              <span class="fw-bold text-primary">10 Eylül 2020</span>
              <h5 class="mt-2">İlk Versiyon Yayınlandı</h5>
              <p class="mb-0">
                Ürün, dahili test ortamında test kullanıcılarına açıldı.
              </p>
            </div>
          </div>
        </li>

        <!-- Örnek 5. madde -->
        <li class="timeline-item">
          <div class="timeline-point"></div>
          <div class="timeline-content card shadow-sm">
            <div class="card-body">
              <span class="fw-bold text-primary">01 Aralık 2020</span>
              <h5 class="mt-2">Resmi Lansman</h5>
              <p class="mb-0">
                Projenin birinci versiyonu tüm kullanıcılara açıldı.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.container {
  max-width: 800px;
}

/* Timeline ana kabı */
.timeline {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Ortadaki dikey çizgi */
.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px; /* Timeline noktasının yatay konumu */
  width: 4px;
  background-color: #dee2e6; /* Bootstrap’ın gri tonu */
  border-radius: 2px;
}

/* Her bir madde (item) */
.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 60px; /* İçeriği timeline çizgisinden ayırmak için */
}

/* Madde noktası (küçük daire) */
.timeline-point {
  position: absolute;
  left: 12px; /* Çizgiye ortalayacak şekilde ayarlandı */
  top: 0;
  width: 16px;
  height: 16px;
  background-color: #0d6efd; /* Bootstrap’ın mavi rengi */
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #dee2e6;
}

/* Kart içeriğin stili */
.timeline-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  transition: transform 0.3s ease;
}

/* Hover efekti (isteğe bağlı, daha canlı görünsün) */
.timeline-content:hover {
  transform: translateY(-4px);
}

/* Kart içerisindeki metin düzenlemeleri */
.timeline-content .card-body {
  padding: 1rem;
}

.timeline-content h5 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.timeline-content p {
  font-size: 0.95rem;
  color: #495057;
}
</style>

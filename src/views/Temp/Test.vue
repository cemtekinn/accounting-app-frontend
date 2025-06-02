<script setup>
import Layout from '@/layouts/Main.vue'

import Timeline from '@/components/Timeline.vue'

const timelineItems = [
  {
    date: '01 Ocak 2023',
    title: 'Proje Başladı',
    description: 'İlk fikir aşamasına geçildi ve ekip kuruldu.',
  },
  {
    date: '15 Şubat 2023',
    title: 'Tasarım Tamamlandı',
    description: 'UI/UX tasarımları hazırlandı ve onaylandı.',
  },
  {
    date: '10 Nisan 2023',
    title: 'Kodlama Başladı',
    description: 'Frontend ve backend geliştiricileri işe başladı.',
  },
  {
    date: '20 Temmuz 2023',
    title: 'Beta Yayın',
    description: 'Kısıtlı kullanıcıya açık beta yayına geçildi.',
  },
  {
    date: '01 Eylül 2023',
    title: 'Final Sürüm',
    description: 'Ürün yayına alındı ve pazarlama başladı.',
  },
]
</script>

<template>
  <Layout>
    <Timeline title="Proje Süreci" :items="timelineItems" />
  </Layout>
</template>

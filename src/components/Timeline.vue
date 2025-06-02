<script setup>
defineProps({
  title: {
    type: String,
    default: "Zaman Çizelgesi",
  },
  items: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div class="timeline-wrapper py-5">
    <h2 class="text-center text-dark mb-5 timeline-header">{{ title}}</h2>
    <ul class="timeline">
      <li class="timeline-item" v-for="(item, index) in items" :key="index">
        <div class="timeline-point"></div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
          <span class="timeline-date">{{ item.date }}</span>
          <h5 class="timeline-title">{{ item.title }}</h5>
          <p class="timeline-description">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
$primary-bg: #2a3042;
$card-bg: #2a3042;
$hover-bg: #232838;
$accent: #ff8c00;
$line-color: #495067;
$text-white: #ffffff;
$text-muted: #ced4da;

.timeline-header {
  font-size: 2rem;
  font-weight: 700;
  color: $text-white;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;

  &::after {
    content: "";
    position: absolute;
    width: 60%;
    height: 3px;
    background-color: $accent;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    border-radius: 2px;
  }
}

.timeline-wrapper {
  padding: 2rem;
  color: $text-white;
}

.timeline {
  position: relative;
  list-style: none;
  padding: 0;

  .timeline-item {
    position: relative;
    padding-left: 40px;
    margin-bottom: 2rem;
    min-height: 60px;

    .timeline-point {
      position: absolute;
      top: 0;
      left: 14px;
      width: 12px;
      height: 12px;
      background-color: $text-white;
      border: 3px solid $accent;
      border-radius: 50%;
      z-index: 2;
    }

    .timeline-line {
      position: absolute;
      top: 12px;
      left: 19px;
      width: 2px;
      height: 100%;
      background-color: $line-color;
      z-index: 1;
    }

    .timeline-content {
      background-color: $card-bg;
      padding: 0.75rem 1rem;
      margin-left: 40px;
      border-radius: 6px;
      font-size: 0.9rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transition:
        transform 0.2s ease,
        background-color 0.3s;

      &:hover {
        transform: translateY(-2px);
        background-color: $hover-bg;
      }

      .timeline-date {
        color: $accent;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .timeline-title {
        font-size: 1rem;
        margin: 0.25rem 0;
        color: $text-white;
      }

      .timeline-description {
        font-size: 0.85rem;
        color: $text-muted;
        margin: 0;
      }
    }
  }
}
</style>

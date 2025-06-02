<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    required: true,
  },
  config: {
    type: Object,
    required: true,
    // Örnek: { title: 'Başlık', voice_records_count: 'Ses Sayısı' }
  },
})

const columns = Object.entries(props.config)
</script>

<template>
  <div class="mini-table-wrapper">
    <div class="mini-table-box">
      <div v-if="title" class="mini-table-title">{{ title }}</div>

      <table class="mini-table">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="([key, name], idx) in columns" :key="idx">{{ name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td data-label="#">{{ index + 1 }}</td>
            <td v-for="([key, name], idx) in columns" :key="idx" :data-label="name">
              {{ item[key] ?? 0 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mini-table-wrapper {
  max-width: 100%;
  margin: 20px auto;
  font-family: system-ui, sans-serif;
  color: #2c3e50;
}

.mini-table-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mini-table-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  padding: 16px;
  background-color: #2a3042;
  color: #ffffff;
  border-bottom: 4px solid darkgrey;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead {
    background-color: #2a3042;

    th {
      text-align: left;
      padding: 10px;
      font-weight: 600;
      color: #ffffff;
    }
  }

  tbody {
    tr {
      border-top: 1px solid #eee;

      &:hover {
        background-color: aliceblue;
      }

      td {
        padding: 10px;
      }
    }
  }
}

@media (max-width: 600px) {
  .mini-table thead {
    display: none;
  }

  .mini-table tbody tr {
    display: block;
    margin-bottom: 12px;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 10px;
    background: #fff;
  }

  .mini-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 6px;
    font-size: 0.85rem;
    border: none;
  }

  .mini-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #888;
    flex-basis: 45%;
    text-transform: uppercase;
    font-size: 0.75rem;
  }
}
</style>

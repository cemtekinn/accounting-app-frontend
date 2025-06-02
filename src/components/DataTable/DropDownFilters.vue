<script setup>
defineProps({
    filters: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="dropdown">
        <button class="btn btn-sm btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
            <i class="fas fa-filter"></i>
            Filtreler
        </button>
        <ul class="dropdown-menu">
            <li v-for="filter in filters" :key="filter.name">
                <button type="button"
                        class="dropdown-item"
                        :class="{ 'active': !filter.hidden}"
                        @click.prevent="filter.hidden = !filter.hidden">
                    {{ filter.title }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    cols: {
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
            <i class="fas fa-table-columns"></i>
            Kolonlar
        </button>
        <ul class="dropdown-menu">
            <li v-for="col in cols" :key="col.name">
                <button class="dropdown-item"
                        :class="{ 'active': !col.hidden}"
                        @click="col.hidden = !col.hidden">
                    {{ col.title }}
                </button>
            </li>
        </ul>
    </div>
</template>

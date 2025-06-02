<script setup>
defineProps({
    meta: {
        type: Object,
        required: true
    },
    initDataTable: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <nav aria-label="Page navigation" class="mt-3 p-1" style="overflow-x: auto">
        <ul class="pagination">
            <li class="page-item" v-for="(el,ix) in meta.links" :key="ix">
                <a href="javascript:void(0);" class="page-link"
                   :class="{ 'active': el.active }"
                   @click.prevent="initDataTable(el)" v-html="el.label"/>
            </li>
        </ul>
    </nav>
</template>

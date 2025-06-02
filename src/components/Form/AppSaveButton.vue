<script setup>
defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    text: {
        type: [String, Number, Object],
        default: 'Kaydet'
    },
    btnClass: {
        type: String,
        default: 'btn-primary'
    },
    btnIcon: {
        type: String,
        default: 'fas fa-save'
    }
});
</script>

<template>
    <button class="btn"
            :class="btnClass"
            type="submit"
            :disabled="loading">
        <i class="fas" :class="btnIcon" v-if="!loading"></i>
        <i class="fas fa-spinner fa-spin" v-else></i>
        {{ text }}
    </button>
</template>

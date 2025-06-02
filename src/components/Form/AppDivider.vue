<script setup>

const props = defineProps({
    customClass: {
        type: String,
        default: ''
    },
    titleClass: {
        type: String,
        default: ''
    },
    lineClass: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div :class="`divider ${customClass}`">
        <span :class="`divider--line ${lineClass}`"></span>
        <span :class="`divider--title ${titleClass}`">
            <slot/>
        </span>
    </div>
</template>


<style scoped>

.divider {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    padding: 0.75rem 0;
}

.divider--title {
    position: absolute;
    background-color: #fff;
    padding: 0 0.5rem;
    font-weight: 600;
    font-size: 14px;
}

.divider--line {
    flex: 1;
    border-bottom: 1px solid #c1c1c1;
}

</style>

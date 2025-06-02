<script setup>
import {computed} from "vue";

const props = defineProps({
    status: {
        type: [String, Boolean,Number],
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
})

const statusClass = computed(() =>
    (props.status === 'active' || props.status) ? 'custom-badge--active' : 'custom-badge--inactive'
)

const iconClass = computed(() =>
    (props.status === 'active' || props.status) ? 'fas fa-check-circle' : 'fas fa-times-circle'
)
</script>

<template>
  <span :class="['custom-badge', statusClass]">
    <i :class="iconClass" class="badge-icon"/>
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped lang="scss">
.custom-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25em 0.7em;
    font-size: 0.85em;
    font-weight: 500;
    border-radius: 0.75em;
    letter-spacing: 0.01em;
    transition: background 0.2s, color 0.2s;
    background-color: #2a2a2a;
    color: #ffffff;

    .badge-icon {
        margin-right: 4px;
        font-size: 1em;
        color: #ffffff;
    }

    &--active {
        background-color: #057146;
    }

    &--inactive {
        background-color: #9a0505;
    }
}
</style>



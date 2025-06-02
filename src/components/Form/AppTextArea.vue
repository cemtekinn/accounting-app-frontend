<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    rows: {
        type: Number,
        default: 3
    },
    form: {
        type: Object,
        default: () => ({})
    },
    required: {
        type: Boolean,
        default: true
    },
})
</script>

<template>
    <div class="mb-3">
        <label :for="name" class="form-label">
            {{ placeholder }}
        </label>
        <textarea
            class="form-control"
            :class="{ 'is-invalid': !!form.errors[name] }"
            :id="name"
            v-model="form.fields[name]"
            :rows="rows"
            :required="required"
            :placeholder="placeholder"></textarea>
        <div class="invalid-feedback" v-if="!!form.errors[name]">
            {{ form.errors[name].join(', ') }}
        </div>
    </div>
</template>

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
    type: {
        type: String,
        default: 'text'
    },
    help: {
        type: String,
        default: null
    },
    form: {
        type: Object,
        default: () => ({})
    },
    required: {
        type: Boolean,
        default: true
    },
    mask: {
        type: [String, Array],
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    selectProps: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <div class="mb-3">
        <label :for="name" class="form-label">
            {{ placeholder }}
        </label>

        <v-select
            :options="options"
            v-model="form.fields[name]"
            :placeholder="placeholder"
            v-bind="selectProps"
        />

        <div :id="name+'Help'" class="form-text" v-if="help">
            {{ help }}
        </div>

        <div class="invalid-feedback" v-if="!!form.errors[name]">
            {{ form.errors[name].join(', ') }}
        </div>
    </div>
</template>

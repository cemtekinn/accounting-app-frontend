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
    className: {
        type: String,
        default: 'mb-3'
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    inputProps: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <div :class="className">
        <label v-if="showLabel" :for="name" class="form-label">
            {{ placeholder }}
        </label>
        <input
            v-if="!!mask"
            v-mask="mask"
            :type="type"
            class="form-control"
            :class="{ 'is-invalid': !!form.errors[name] }"
            :id="name"
            v-model="form.fields[name]"
            :required="required"
            v-bind="inputProps"
            :placeholder="placeholder"/>

        <input
            v-else
            :type="type"
            class="form-control"
            :class="{ 'is-invalid': !!form.errors[name] }"
            :id="name"
            v-model="form.fields[name]"
            :required="required"
            v-bind="inputProps"
            :placeholder="placeholder"/>

        <div :id="name+'Help'" class="form-text" v-if="help">
            {{ help }}
        </div>

        <div class="invalid-feedback" v-if="!!form.errors[name]">
            {{ form.errors[name].join(', ') }}
        </div>
    </div>
</template>

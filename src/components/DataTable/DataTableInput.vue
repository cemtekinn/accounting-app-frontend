<script setup>
import {computed, onMounted} from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    opts: {
        type: Array,
        default: () => []
    },
    type: {
        type: String,
        default: 'text'
    },
    filter: {
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
    }
})

const cpr = computed(() => {
    let obj = {};
    props.opts.forEach((opt) => {
        obj[opt] = true;
    });
    return obj;
})

onMounted(() => {
    props.filter[props.name] = props.filter[props.name] || null;
})
</script>

<template>
    <div class="app-wf">
        <date-picker
            v-if="['date','datetime','daterange'].includes(type)"
            v-model="filter[name]"
            locale="tr"
            cancel-text="İptal"
            select-text="Seç"
            :placeholder="placeholder"
            :enable-time-picker="false"
            tz="Europe/Istanbul"
            :format="'dd.MM.yyyy'"
            :action-row="{ showNow: true }"
            now-button-label="Şimdi"
            v-bind="cpr"
        />

        <v-select
            v-else-if="['select','multiselect'].includes(type)"
            :options="opts"
            :multiple="type === 'multiselect'"
            label="title"
            :reduce="el => el.value"
            v-model="filter[name]"
            :placeholder="placeholder"/>

        <input
            v-else
            :type="type"
            class="form-control"
            :id="'filter_'+name"
            v-model="filter[name]"
            :required="required"
            :placeholder="placeholder"/>
    </div>
</template>

<style scoped lang="scss">
.app-wf {
    width: 100%;
    min-width: 100px;
    max-width: 200px;
}

@media (max-width: 767px) {
    .app-wf {
        width: calc(50% - 4px);
    }
}
</style>

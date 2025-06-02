<script setup>

import {onMounted, ref, watch} from "vue";
import Navigation from "@/components/DataTable/Navigation.vue";
import DropDownFilters from "@/components/DataTable/DropDownFilters.vue";
import DropDownCols from "@/components/DataTable/DropDownCols.vue";
import moment from "moment";
import DataTableInput from "@/components/DataTable/DataTableInput.vue";

const props = defineProps({
    url: {
        type: String,
        required: true
    },
    params: {
        type: Object,
        default: () => ({})
    },
    pageSize: {
        type: Number,
        default: 10
    },
    actions: {
        type: Array,
        default: () => []
    },
    customCols: {
        type: Array,
        default: () => []
    },
    addButton: {
        type: Boolean,
        default: false
    },
    permissionName: {
        type: String,
        default: null
    },
    slotPrefix: {
        type: String,
        default: 'col_'
    },
    invisibleCols: {
        type: [Array],
        default: () => []
    },
    invisibleFilters: {
        type: [Array],
        default: () => []
    }
})

const table_name = ref('');
const loading = ref(false);
const cols = ref([]);
const filters = ref([]);
const filter = ref({});
const sort = ref([]);
const data = ref([]);
const meta = ref({});
const timer = ref(0);
const pageSize = ref(props.pageSize);
const isInit = ref(false);

const convert = (data, col_name, col) => {
    if (typeof data[col_name] !== 'undefined') {
        data = data[col_name];
    } else {
        let keys = col_name.split('.');
        for (let key of keys) {
            if (!data[key])
                return '-';
            data = data[key];
        }
    }

    if (!col.format)
        return !data ? '-' : data;

    switch (col.format) {
        case 'date':
            return data ? moment(data).format('DD.MM.YYYY') : '-';
        case 'datetime':
            return data ? moment(data).format('DD.MM.YYYY HH:mm:ss') : '-';
        case 'money':
            return data ? new Intl.NumberFormat('tr-TR', {style: 'currency', currency: 'TRY'}).format(data) : '-';
        case 'phone':
            return data ? `<a href="tel:${data}" target="_blank"><i class="fas fa-phone"></i></a> ${data.replace(/\+90(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4')}` : '-';
        case 'email':
            return data ? `<a href="mailto:${data}" target="_blank"><i class="fas fa-envelope"></i></a> ${data}` : '-';
        case 'url':
            return data ? `<a href="${data}" target="_blank">${data}</a>` : '-';
        case 'image':
            return data ? `<img src="${data}" alt="${data}" style="max-width: 100px; max-height: 100px; object-fit: contain">` : '-';
    }
}

const init = (el = null) => {
    let page = 1;

    if (!!el) {
        if (el.label.endsWith('Previous') || el.label.endsWith('Önceki')) {
            page = parseInt(meta.value.current_page) - 1;
        } else if (el.label.startsWith('Next') || el.label.startsWith('Sonraki')) {
            page = parseInt(meta.value.current_page) + 1;
        } else if (!!el.url) {
            let url = new URL(el.url);
            page = url.searchParams.get('page');
        }
    }

    let scoped = filters.value.filter(f => f.name !== f.scope);

    let reqFilters = {};

    // boş olan filtreleri temizle
    for (let key in filter.value) {
        if (typeof filter.value[key] !== 'undefined' && filter.value[key] !== '') {
            reqFilters[key] = filter.value[key];
        }
    }

    const filter_data = JSON.parse(JSON.stringify(filter.value));

    // eğer scoped filtre varsa, onları scoped olanla değiştir
    scoped.forEach(f => {
        if (filter_data[f.name]) {
            reqFilters[f.scope] = filter_data[f.name];
            delete reqFilters[f.name];
        }
    });

    loading.value = true;
    api.get(`dt/${props.url}`, {
        params: {
            page: {size: pageSize.value, page: page},
            sort: sort.value,
            filter: reqFilters,
            ...props.params
        }
    })
        .then(({data: {data: ds, meta: m}}) => {
            data.value = ds;
            meta.value = m;
        })
        .finally(() => {
            loading.value = false;
            isInit.value = true;
        });
}

const changeSort = (col) => {
    if (!col.sortable) return;

    let index = sort.value.findIndex(s => s.endsWith(col.name));
    if (index === -1) {
        sort.value = [col.name];
    } else {
        if (sort.value[index].startsWith('-')) {
            sort.value.splice(index, 1);
        } else {
            sort.value[index] = `-${col.name}`;
        }
    }

    init();
}

watch(filter, () => {
    if (!isInit.value) return;
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => init(), 300);
}, {deep: true});


watch(() => props.url, () => init());

defineExpose({init})
const emits = defineEmits(['add'])

onMounted(() => {
    loading.value = true;
    api.get(`dt/${props.url}/config`, {params: props.params})
        .then(({data: {cols: c, filters: f, table_name: tn}}) => {
            cols.value = c.filter(col => !props.invisibleCols.includes(col.name));
            table_name.value = tn;
            filters.value = f.filter(f => !props.invisibleFilters.includes(f.name));
            init();
        })
        .finally(() => {
            loading.value = false;
        });
})
</script>

<template>
    <div class="card app-card" :class="{'loading': loading}">
        <div class="d-flex card-header flex-column flex-md-row align-items-start align-items-md-center">
            <h5 class="mb-3 mb-md-0" v-show="table_name !== ''">{{ table_name }}</h5>
            <div class="d-flex gap-1 ms-auto">
                <DropDownCols :cols="cols"/>
                <DropDownFilters :filters="filters"/>
                <button v-if="props.addButton"
                        class="btn btn-sm btn-success"
                        @click="emits('add',true)">
                    <i class="fas fa-plus"></i> Yeni
                </button>
                <slot name="custom-buttons"/>
            </div>
        </div>
        <div class="d-flex gap-2 bg-light border-bottom p-2 flex-row flex-wrap flex-md-nowrap">
            <DataTableInput v-for="f in filters"
                            v-show="!f.hidden"
                            :name="f.name"
                            :opts="f.opts"
                            :filter="filter"
                            :placeholder="f.title"
                            :type="f.type"/>
        </div>
        <div class="card-body">
            <div class="table-responsive" style="min-height: 200px">
                <table class="table table-bordered">
                    <thead>
                    <draggable v-model="cols" tag="tr" :item-key="key => key.name">
                        <template #item="{ element: col }">
                            <th scope="col"
                                :class="{'d-none': col.hidden, 'sorting': col.sortable, 'sorting-asc': sort.includes(col.name), 'sorting-desc': sort.includes(`-${col.name}`)}"
                                @click="changeSort(col)"
                            >
                                {{ col.title }}
                            </th>
                        </template>
                    </draggable>
                    </thead>
                    <tbody>
                    <tr v-for="d in data" :key="d.id">
                        <td v-for="col in cols"
                            :key="col.name"
                            :data-title="col.title"
                            :class="{'d-none': col.hidden}"
                        >
                            <slot v-if="$slots[slotPrefix + col.name.replace('.','_')]"
                                  :name="slotPrefix + col.name.replace('.','_')"
                                  :data="d"
                                  :meta="meta"
                                  :init="init"
                                  :loading="loading"
                                  :slotPrefix="slotPrefix"
                            />

                            <slot name="default" v-else>
                                <span v-if="customCols.find(c => c.name === col.name)"
                                      v-html="customCols.find(c => c.name === col.name).render(d)"/>
                                <div class="dropdown" v-else-if="col.name === 'actions'">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <i class="fas fa-gear"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li v-for="(action, i) in actions"
                                            :key="i"
                                            v-html="action.content"
                                            @click="action.action(d)"/>
                                    </ul>
                                </div>
                                <span v-else v-html="convert(d, col.name, col)"></span>
                            </slot>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="!data.length">
                <div class="alert alert-warning text-center">Kayıt bulunamadı</div>
            </div>
            <div v-if="meta.total > 0" class="mt-4">
                <div class="text-secondary small">
                    Toplam {{ meta.total }}
                    kayıttan {{ meta.from }} - {{ meta.to }} arası gösteriliyor. Sayfa:
                    {{ meta.current_page }} / {{ meta.last_page }}
                </div>

                Sayfada
                <select v-model="pageSize"
                        @change="init(null)"
                        class="form-select mx-1 d-inline-block form-select-sm"
                        style="max-width: 5rem">
                    <option v-for="size in [10, 25, 50, 100, 250]" :key="size" :value="size">{{ size }}</option>
                </select>

                kayıt göster
            </div>
            <Navigation :init-data-table="init" :meta="meta"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
td, th {
    white-space: nowrap;
    padding: .5rem 1rem;
}

th.sorting {
    position: relative;
    padding-right: 2rem;

    &:after, &:before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #ccc;
    }

    &:after {
        content: '↑';
        right: .5rem;
    }

    &:before {
        content: '↓';
        right: 1rem;
    }

    &.sorting-asc:after {
        color: black;
    }

    &.sorting-desc:before {
        color: black;
    }
}

@media (max-width: 767px) {
    thead {
        display: none;
    }

    tr {
        display: flex;
        margin-bottom: .5rem;
        flex-direction: column;
        padding: .5rem 1rem;
        border: 0;
        border-bottom: 1px solid #ccc;
        position: relative;

        td {
            background-color: transparent;
            border: 0;
            position: relative;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0;
            justify-content: flex-start;
            align-items: center;

            &[data-title="Fotoğraf"] {
                display: none;
            }

            &[data-title="İşlemler"] {
                position: absolute;
                top: 0;
                right: 0;
            }

            &:not([data-title="İşlemler"],[data-title="Fotoğraf"]):before {
                content: attr(data-title);
                font-weight: bold;
                margin-right: 1rem;
            }
        }
    }
}
</style>

<script setup>
import Layout from '@/layouts/Main.vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import PageHeader from '@/components/PageHeader.vue'

const _edit = (data) => {
  // packageId.value = data.id;
  // ms.package_ce.open();
}

const _create = () => {
  alert('Fatura olusturma modalı açılacak')
}

const title = 'Faturalarım'
const subtitle = 'Geçmiş ve mevcut faturalarınızı buradan takip edebilir, ödeme durumlarını kontrol edebilirsiniz.'

const actions = [
  {
    content:
      '<a class="dropdown-item" href="javascript:void(0);"><i class="fas fa-edit text-warning"></i> Düzenle</a>',
    action: _edit,
    permission: 'update packages',
  },
]
</script>
<template>
  <Layout>
    <PageHeader :title="title" :subtitle="subtitle" />

    <DataTable ref="table" url="packages" :actions="actions" :add-button="true" @add="_create">
    </DataTable>
  </Layout>

  <!--  <CreateEdit-->
  <!--    :id="packageId"-->
  <!--    :is-open="ms.package_ce.is_open"-->
  <!--    @close="()=> modalClose()"-->
  <!--    v-if="ms.package_ce.if_open"/>-->
</template>

<style scoped lang="scss"></style>

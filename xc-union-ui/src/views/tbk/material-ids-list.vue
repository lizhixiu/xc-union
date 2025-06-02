<template>

  <div class="xc-list">

    <n-card :bordered="true" title="商品列表" class="mt-4 proCard" size="small">
      <div class="xc-toolbar">
        <n-space>
        </n-space>
      </div>
      <div class="xc-table" style="height: 580px">
        <xc-table ref="table" v-bind="tableOptions"/>
      </div>
    </n-card>
    <n-modal v-model:show="showModal" >
      <material-ids-item-list :materialId="materialId"/>
    </n-modal>
  </div>
</template>
<script setup>


import {formatDate} from '@/scripts/utils/dateFormat.js';
import MaterialIdsItemList from "@/views/tbk/material-ids-item-list.vue";

// 定义接收的属性
const props = defineProps({
  subject: {
    type: String,
    required: true
  },
  materialType: {
    type: String,
    required: true
  }
});

const showModal = ref(false)
const table = ref()
const searchValue = ref('')
const materialId = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/tbk/optimusTouMaterialIdsGet',
  page: true,
  limit: 20,
  where: {
    "adzoneId": "109281650216"
    , "materialQuery": {
      "subject": props.subject
      , "material_type": props.materialType
    }
  },
  cols: [
    {
      label: '操作',
      type: 'buttons',
      width: 50,
      fixed: 'right',
      buttons: [
        {
          key: 'goUrl',
          label: '访问',
          link: true,
          click: (row) => {
            materialId.value = row.materialId;
            showModal.value = true;
          }
        }
      ]
    },
    {
      field: 'materialName',
      label: '物料集合名称'
    },
    {
      field: 'materialId',
      label: '物料id',
      width: 100
    }, {
      field: 'materialType',
      label: '物料类型',
      width: 180,
      render: (row) => {
        switch (row.materialType) {
          case 1:
            return h('b', {style: {color: '#409EFF'}}, {default: () => '商品'});
          case 2:
            return h('b', {style: {color: 'red'}}, {default: () => '权益'});
          default :
            return '';
        }
      }
    }, {
      field: 'subject',
      label: '物料主题类型',
      width: 180,
      render: (row) => {
        switch (row.subject) {
          case 1:
            return h('b', {style: {color: '#409EFF'}}, {default: () => '促销活动'});
          case 2:
            return h('b', {style: {color: 'red'}}, {default: () => '热门主题'});
          case 3:
            return h('b', {style: {color: 'red'}}, {default: () => '精选榜单'});
          case 4:
            return h('b', {style: {color: 'red'}}, {default: () => '行业频道等'});
          case 5:
            return h('b', {style: {color: 'red'}}, {default: () => '其他'});
          default :
            return '';
        }
      }
    },
    {
      field: 'promotionList',
      label: '时间',
      width: 240,
      render: (row) => {

        let msg = '';

        msg = msg + '始:' + formatDate(row.startTime*1000, "YYYY-MM-DD") + ' 止:' + formatDate(row.endTime*1000, "YYYY-MM-DD");

        return h('b', {style: {color: 'blue'}}, {default: () => msg})
      }
    },
    {
      label: '操作',
      type: 'buttons',
      width: 50,
      fixed: 'right',
      buttons: [
        {
          key: 'goUrl',
          label: '访问',
          link: true,
          click: (row) => {
            materialId.value = row.materialId;
            showModal.value = true;
          }
        }
      ]
    }
  ]
})

function search() {
  tableOptions.where.q = searchValue.value
  table.value.reload()
}

onMounted(() => {
  table.value.reload()
})
</script>
<style scoped>

</style>
<script setup lang="ts">
</script>
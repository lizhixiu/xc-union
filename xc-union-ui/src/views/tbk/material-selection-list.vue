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
  </div>
</template>
<script setup>


import { formatDate } from '@/scripts/utils/dateFormat.js';

// 定义接收的属性
const props = defineProps({
  promotionId: {
    type: String,
    required: true
  }
});

const table = ref()
const searchValue = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/tbk/dgOptimusPromotion',
  page: true,
  limit: 20,
  where: {
    "adzoneId": "109281650216"
    , "promotionId": props.promotionId
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
            const url = row.promotionExtend.promotionUrl;
            window.open(url, '_blank');
          }
        }
      ]
    },
    {
      field: 'shopPictureUrl',
      label: '图片',
      type: 'image',
      width: 50
    },
    {
      field: 'nick',
      label: '卖家昵称',
      width: 180
    }, {
      field: 'shopTitle',
      label: '店铺名称',
      width: 180
    },

    {
      field: 'promotionType',
      label: '权益类型',
      width: 100
    },
    {
      field: 'promotionList',
      label: '权益信息',
      width: 180,
      render: (row) => {
        if (row.promotionList.length == 0) {
          return ''
        }
        let msg = '';
        row.promotionList.forEach((item, index) => {
          // 判断是否为最后一项
          if (index === row.promotionList.length - 1) {
            // 最后一项不添加逗号
            msg = msg + '满' + item.entryCondition + '减' + item.entryDiscount;
          } else {
            msg = msg + '满' + item.entryCondition + '减' + item.entryDiscount + ' , ';
          }
        });
        return h('b', {style: {color: 'red'}}, {default: () => msg})
      }
    },
    {
      field: 'promotionList',
      label: '权益信息时间',
      width: 200,
      render: (row) => {
        if (row.promotionList.length == 0) {
          return ''
        }
        let msg = '';
        row.promotionList.forEach((item, index) => {
          // 判断是否为最后一项
          if (index === row.promotionList.length - 1) {
            // 最后一项不添加逗号
            msg = msg + '始:' + formatDate(item.entryUsedStartTime,"YYYY-MM-DD") + ' 止:' + formatDate(item.entryUsedEndTime,"YYYY-MM-DD");
          } else {
            msg = msg + '始:' + formatDate(item.entryUsedStartTime,"YYYY-MM-DD") + ' 止:' + formatDate(item.entryUsedEndTime,"YYYY-MM-DD") + ' , ';
          }
        });
        return h('b', {style: {color: 'blue'}}, {default: () => msg})
      }
    },
    {
      field: 'remainCount',
      label: '剩余库存',
      width: 150
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
            const url = row.promotionExtend.promotionUrl;
            window.open(url, '_blank');
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
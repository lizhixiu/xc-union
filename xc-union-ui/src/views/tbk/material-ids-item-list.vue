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


import {formatDate} from '@/scripts/utils/dateFormat.js';
import MaterialIdsItemList from "@/views/tbk/material-ids-item-list.vue";

// 定义接收的属性
const props = defineProps({
  materialId: {
    type: String,
    required: true
  }
});

const showModal = ref(false)
const table = ref()
const searchValue = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/tbk/dgMaterialRecommend',
  page: true,
  limit: 20,
  where: {
    "adzoneId": "109281650216"
    , "materialId": props.materialId
  },
  cols: [
    {
      label: '操作',
      type: 'buttons',
      width: 50,
      fixed: 'right',
      buttons: [
        {
          key: 'buy',
          label: '购买',
          link: true,
          click: (row) => {
            let url = row.clickUrl;
            if(row.couponShareUrl!=null){
              url = row.couponShareUrl;
            }
            window.open(url, '_blank');
          }
        }
      ]
    },
    {
      field: 'pictUrl',
      label: '图片',
      type: 'image',
      width: 50
    },
    {
      field: 'title',
      label: '标题',
      width: 280
    },
    {
      field: 'shopTitle',
      label: '商家',
      width: 100
    }, {
      field: 'categoryName',
      label: '分类',
      width: 100
    },
    {
      field: 'brandName',
      label: '品牌',
      type: 'tag',
      width: 150
    },
    {
      field: 'finalPromotionPathList',
      label: '优惠信息',
      width: 180,
      render: (row) => {
        if (row.finalPromotionPathList==null || row.finalPromotionPathList.length == 0) {
          return ''
        }
        let msg = '';
        row.finalPromotionPathList.forEach((item, index) => {
          // 判断是否为最后一项
          if (index === row.finalPromotionPathList.length - 1) {
            // 最后一项不添加逗号
            msg = msg + item.promotionDesc;
          } else {
            msg = msg + item.promotionDesc + ' , ';
          }
        });
        return h('b', {style: {color: 'red'}}, {default: () => msg})
      }
    },
    {
      field: 'zkFinalPrice',
      label: '现价',
      width: 100
    }
    ,
    {
      field: 'finalPromotionPrice',
      label: '到手价',
      width: 100,
      render: (row) => {
        return h('b', {style: {color: '#FF5722'}}, {default: () => row.finalPromotionPrice})
      }
    }
    ,
    {
      field: 'commissionAmount',
      label: '佣金',
      width: 100,
      render: (row) => {
        return h('b', {style: {color: 'green'}}, {default: () => row.commissionAmount})
      }
    }
    ,
    {
      field: 'annualVol',
      label: '销量',
      width: 100
    },
    {
      label: '操作',
      type: 'buttons',
      width: 50,
      fixed: 'right',
      buttons: [
        {
          key: 'buy',
          label: '购买',
          link: true,
          click: (row) => {
            let url = row.clickUrl;
            if(row.couponShareUrl!=null){
              url = row.couponShareUrl;
            }
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
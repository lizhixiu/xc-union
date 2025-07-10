<template>

  <div class="xc-list">
    <n-card :bordered="true" title="查询条件" class="mt-4 proCard" size="small">
      <div class="xc-search">
        <n-space>
          <n-input v-model:value="searchValue"
                   placeholder=""
                   style="width: 200px"></n-input>
          <n-button type="primary" @click="search">
            <xc--icon icon="Search"/>
            搜索
          </n-button>
          <n-button @click="() => { searchValue = ''; search() }">
            <xc--icon icon="TrashOutline"/>
            清空
          </n-button>
        </n-space>
      </div>
    </n-card>
    <div class="gap" style="height: 5px;"></div>
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
import { useMessage } from 'naive-ui'
import {postJson} from '@/scripts/common.js';

// 定义接收的属性
const props = defineProps({
  rankId: {
    type: String,
    required: true
  }
});


const message = useMessage()

const table = ref()
const searchValue = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/jd/goodsRankQuery',
  page: true,
  limit: 20,
  where: {
       "RankGoodsReq": {
         "rankId": props.rankId
         , "sortType": 2
       }
  },
  cols: [
    // {
    //   label: '操作',
    //   type: 'buttons',
    //   width: 50,
    //   fixed: 'right',
    //   buttons: [
    //     {
    //       key: 'buy',
    //       label: '购买',
    //       link: true,
    //       click: (row) => {
    //         const url = row.couponShareUrl;
    //         window.open(url, '_blank');
    //       }
    //     }
    //   ]
    // },
    {
      field: 'imageUrl',
      label: '图片',
      type: 'image',
      width: 50
    },
    {
      field: 'skuName',
      label: '标题',
      width: 280
    },
    // {
    //   field: 'shopTitle',
    //   label: '商家',
    //   width: 100
    // }, {
    //   field: 'categoryName',
    //   label: '分类',
    //   width: 100
    // },
    // {
    //   field: 'brandName',
    //   label: '品牌',
    //   type: 'tag',
    //   width: 150
    // },
    {
      field: 'skuTagList',
      label: '优惠信息',
      width: 180,
      render: (row) => {
        if (row.skuTagList==null || row.skuTagList.length == 0) {
          return ''
        }
        let msg = '';
        row.skuTagList.forEach((item, index) => {
          // 判断是否为最后一项
          if (index === row.skuTagList.length - 1) {
            // 最后一项不添加逗号
            msg = msg + item.name;
          } else {
            msg = msg + item.name + ' , ';
          }
        });
        return h('b', {style: {color: 'red'}}, {default: () => msg})
      }
    },
    {
      field: 'wlprice',
      label: '现价',
      width: 100
    }
    ,
    {
      field: 'finalPromotionPrice',
      label: '到手价',
      width: 100,
      render: (row) => {
        return h('b', {style: {color: '#FF5722'}}, {default: () => row.purchasePriceInfo.purchasePrice})
      }
    }
    ,
    {
      field: 'commissionShare',
      label: '佣金比例',
      width: 100,
      render: (row) => {
        return h('b', {style: {color: 'green'}}, {default: () => row.commissionShare})
      }
    }
    ,
    {
      field: 'goodComments',
      label: '好评数',
      width: 100
    },
    // {
    //   label: '操作',
    //   type: 'buttons',
    //   width: 50,
    //   fixed: 'right',
    //   buttons: [
    //     {
    //       key: 'tpwdCreate',
    //       label: '淘口令',
    //       link: true,
    //       click: (row) => {
    //         const url = '/union/naiveui/tbk/tpwdCreate';
    //         let itemUrl = row.clickUrl;
    //         if(row.couponShareUrl!=null){
    //           itemUrl = row.couponShareUrl;
    //         }
    //         var params = {
    //           "text": row.title,
    //           "url": "https:"+itemUrl,
    //           "logo": row.pictUrl
    //         }
    //         postJson(url,params ).then((res) => {
    //           message.info(
    //               res.data.model,
    //               {
    //                 showIcon: false,
    //                 closable: true,
    //                 duration: 50000
    //               }
    //           )
    //         })
    //       }
    //     }
    //   ]
    // }
  ]
})

function search() {
  tableOptions.where.q = searchValue.value
  table.value.reload()
}

onMounted(() => {
  // searchValue.value = '天猫超市粽子'
  tableOptions.where.q = searchValue.value
  table.value.reload()
})
</script>
<style scoped>

</style>
<script setup lang="ts">
</script>
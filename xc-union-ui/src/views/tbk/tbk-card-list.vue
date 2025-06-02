<template>
  <div class="content">
    <n-card :bordered="false" title="查询条件" class="mt-4 proCard" size="small">
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
    <xc-card-list ref="table" v-bind="tableOptions"/>
  </div>

</template>

<script setup>

import XcCardList from "@/components/xc/data/xc-card-list.vue";

const table = ref()
const searchValue = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/tbk/dgMaterialOptionalUpgrade',
  page: true,
  limit: 10,
  where: {
    "adzoneId": "109281650216"
    , "sort": "total_sales_asc"
    , "hasCoupon": true
  },
  cols: [

  ]
  ,// 处理卡片点击事件
  cardClickHandler: (product) => {
    let url = product.clickUrl;
    if(product.couponShareUrl!=null){
      url = product.couponShareUrl;
    }
    window.open(url, '_blank');
  }
})

function search() {
  tableOptions.where.q = searchValue.value
  table.value.reload()
}

onMounted(() => {
  searchValue.value = '天猫超市粽子'
  tableOptions.where.q = searchValue.value
  table.value.reload()
})
</script>

<style scoped>
.content {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
}
</style>
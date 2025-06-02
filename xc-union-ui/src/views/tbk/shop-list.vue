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


const table = ref()
const searchValue = ref('')
const tableOptions = reactive({
  id: 'list',
  autoload: false,
  loading: false,
  url: '/union/naiveui/tbk/shopGet',
  page: true,
  limit: 20,
  where: {
    "adzoneId": "109281650216"
    ,"isTmall": true
    ,"sort":"commission_rate_desc"
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
            const url = row.shopUrl;
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
      field: 'sellerNick',
      label: '卖家昵称',
      width: 280
    },
    {
      field: 'shopType',
      label: '店铺类型',
      width: 100,
      render: (row) => {
        switch (row.shopType){
          case 'B':return h('b', {style: {color: '#409EFF'}}, {default: () => '天猫'});
          case 'C':return h('b', {style: {color: 'red'}}, {default: () => '淘宝'});
          default : return '';
        }
      }
    }, {
      field: 'shopTitle',
      label: '店铺名称',
      width: 100
    },
    {
      field: 'userId',
      label: '卖家ID',
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
            const url = row.shopUrl;
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
  searchValue.value = '官方旗舰店'
  tableOptions.where.q = searchValue.value
  table.value.reload()
})
</script>
<style scoped>

</style>
<script setup lang="ts">
</script>
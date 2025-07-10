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
import {formatDate} from "@/scripts/utils/dateFormat.js";

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
  url: '/union/naiveui/jd/activityQuery',
  page: true,
  limit: 20,
  where: {
       "activityReq": {
         "poolId": 1
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
            const url = row.urlPC;
            window.open(url, '_blank');
          }
        }
      ]
    },
    {
      field: 'imgUrl',
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
      field: 'advantage',
      label: '活动利益点',
      width: 240
    },
    {
      field: 'startTime',
      label: '活动时间',
      width: 200,
      render: (row) => {
        let msg = '';
        msg = msg + '始:' + formatDate(row.startTime,"YYYY-MM-DD") + ' 止:' + formatDate(row.endTime,"YYYY-MM-DD");
        return msg;
      }
    }
    ,
    {
      field: 'tag',
      label: '活动标签',
      width: 200,
      render: (row) => {
        let msg = '';
        switch (row.tag) {
          case "1":
            msg = '大促活动';
            break;
          case "2":
            msg = '佣金提升活动';
            break;
          case "3":
            msg = '常规活动';
            break;
          default:
            msg = '未知';
        }
        return msg;
      }
    }
    ,
    {
      field: 'actStatus',
      label: '活动状态',
      width: 200,
      render: (row) => {
        let msg = '';
        switch (row.actStatus) {
          case 1:
            msg = '未开始';
            break;
          case 2:
            msg = '进行中';
            break;
          case 3:
            msg = '已结束';
            break;
          default:
            msg = '未知';
        }
        return msg;
      }
    }
    // {
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
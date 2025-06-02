<template>
  <n-config-provider >
    <n-layout>
      <n-layout-content class="content">
        <n-grid :x-gap="16" :y-gap="16" cols="5">
          <!-- 使用 v-if 确保数据加载完成后再渲染 -->
          <n-grid-item v-for="product in bindProps.data" :key="product.id" v-if="!bindProps.loading">
            <xcCardListItem :product="product" @card-click="handleCardClick"/>
          </n-grid-item>
          <!-- 加载状态提示 -->
          <div v-else>加载中...</div>
        </n-grid>
      </n-layout-content>
      <div style="flex: 1" v-if="props.page">
        <xc-pagination style="float: right" v-bind="paginationParams" @updatePage="paginationUpdatePage"
                       @updatePageSize="paginationUpdatePageSize"/>
      </div>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import {nextTick, reactive, ref} from 'vue'
import xcCardListItem from './xc-card-list-item.vue'
import {postJson, renderWhere} from "@/scripts/common.js";
import {cloneDeep} from "lodash-es";
import componentProperties from "@/components/xc-component-properties.js";


const props = defineProps({
  props: {
    type: Object,
    default: () => {
    }
  },
  id: {
    type: String,
    default: ''
  },
  autoload: {
    type: Boolean,
    default: () => true
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  nowrap: {
    type: Boolean,
    default: undefined
  },
  virtualScroll: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: ''
  },
  where: {
    type: Object,
    default: () => {
    }
  },
  cols: {
    type: Array,
    default: () => []
  },
  method: {
    type: String,
    default: 'post'
  },
  limit: {
    type: Number,
    default: 10
  },
  page: {
    type: Boolean,
    default: true
  },
  data: {
    type: Array,
    default: () => null
  },
  done: {
    type: Function,
    default: () => {
    }
  },
  loading: {
    type: Boolean,
    default: () => true
  },
  showNo: {
    type: Boolean,
    default: true
  },
  selection: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: true
  },
  selectedRowEnable: {
    type: Boolean,
    default: true
  },
  contextmenuEnable: {
    type: Boolean,
    default: false
  },
  defaultSelectedRow: {
    type: Boolean,
    default: false
  },
  defaultColWidth: {
    type: Number,
    default: 100
  },
  checkedRowKeys: {
    type: Array,
    default: () => []
  },
  keepCurrentPage: {
    type: Boolean,
    default: false
  },
  summary: {
    type: Object,
    default: undefined
  },
  onScroll: {
    type: Function,
    default: () => {
    }
  },
  onContextmenu: {
    type: Function,
    default: () => {
    }
  },
  onDynamicSettingContextmenu: {
    type: Function,
    default: () => {
      return []
    }
  },
  onContextmenuSelect: {
    type: Function,
    default: () => {
    }
  },
  onDblclick: {
    type: Function,
    default: () => {
    }
  },cardClickHandler: {
    type: Function,
    default: (product) => {}
  }
})


const products = ref([])
const loading = ref(true)
const bindProps = reactive(props.props || {})
const sourceData = ref([])

const paginationParams = reactive({
  page: 1,
  pageSize: props.limit
})

function reload(options) {
  options = options || {}
  options.reload = true
  loadData(options)
}


function loadData(options) {
  if (props.url) {
    let where = renderWhere(props.where)
    if (options) {
      if (options.reload && !options.keepCurrentPage && !props.keepCurrentPage) {
        paginationParams.page = 1
      }
      if (options.page) {
        paginationParams.page = options.page
      }
    }
    requestData({where, loading: options && options.loading})
  } else if (props.data) {
    handlerData()
  }

}


function requestData({where, loading}) {
  loading = loading == undefined ? true : loading
  if (loading) {
    bindProps.loading = true
  }
  if (props.page) {
    where.current = paginationParams.page
    where.size = paginationParams.pageSize
  } else {
    where.size = 99999999
  }
  let processData = (res) => {
    if (res.code !== 200) {
      bindProps.loading = false
      bindProps.data = []
      return
    }
    const {data} = res
    bindProps.data = data.list || []

    sourceData.value = cloneDeep(data.resultList) || []
    if (loading) {
      bindProps.loading = false
    }
    if (props.page) {
      paginationParams.itemCount = data.total
    }
    dataDone()
  }
  // 使用 postJson 方法
  postJson(props.url, where).then(processData)
}



function handlerData() {
  let currPageData = []
  let size = paginationParams.pageSize
  let current = paginationParams.page
  if (props.page) {
    props.data.forEach((it, i) => {
      if (i >= ((current - 1) * size) && i < (current * size) && currPageData.length < size) {
        currPageData.push(it)
      }
    })
  } else {
    currPageData = props.data
  }
  paginationParams.itemCount = props.data.length
  bindProps.data = currPageData
  sourceData.value = cloneDeep(currPageData)
  bindProps.loading = false
  dataDone()
}

function dataDone() {
  props.done(bindProps.data)
  if (props.defaultSelectedRow && props.selectedRowEnable && bindProps.data.length > 0) {
    nextTick(() => {
      tableRef.value.$el.querySelector('.n-data-table-base-table-body tr').click()
    })
  }
}

function paginationUpdatePage(page) {
  paginationParams.page = page
  loadData()
}

function paginationUpdatePageSize(pageSize) {
  componentProperties.table.savePage && componentProperties.table.savePage(pageSize, props.id)
  paginationParams.pageSize = pageSize
  paginationParams.page = 1
  loadData()
}


// 其他代码保持不变
const handleCardClick = (product) => {
  props.cardClickHandler(product);
}


defineExpose({reload})

</script>

<style scoped>
.content {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  /* 设置固定高度，这里使用 800px，可按需调整 */
  height: 880px;
}
</style>
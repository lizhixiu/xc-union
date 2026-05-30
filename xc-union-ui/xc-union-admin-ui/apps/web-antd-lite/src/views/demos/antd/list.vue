<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { requestClient } from '#/api/request';

// 统一的表格数据查询接口
async function fetchTableData(params: any) {
  // 这里可以替换为实际的API端点
  return await requestClient.post('/vben/public/security/config/page', params);
}

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

// 获取路由和路由参数
const route = useRoute();
const router = useRouter();

// 从URL参数中解析分页和排序信息
const getPageParamsFromUrl = () => {
  const query = route.query;
  return {
    page: query.page ? Number.parseInt(query.page as string) : 1,
    pageSize: query.pageSize ? Number.parseInt(query.pageSize as string) : 10,
    sortBy: query.sortBy ? (query.sortBy as string) : '',
    sortOrder: query.sortOrder ? (query.sortOrder as string) : '',
  };
};

// 更新URL参数
const updateUrlParams = (page: any, sort: any) => {
  const query: Record<string, any> = { ...route.query };

  if (page) {
    query.page = page.currentPage;
    query.pageSize = page.pageSize;
  }

  if (sort) {
    query.sortBy = sort.field || '';
    query.sortOrder = sort.order || '';
  }

  // 删除空值参数
  Object.keys(query).forEach((key) => {
    if (query[key] === '' || query[key] === null || query[key] === undefined) {
      delete query[key];
    }
  });

  router.replace({ query });
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'typeRef', sortable: true, title: '配置类型' },
    { field: 'codeTxt', sortable: true, title: '配置编码' },
    { field: 'nameTxt', sortable: true, title: '配置名称' },
    { field: 'valueTxt', sortable: true, title: '配置值' },
    { field: 'recSortNum', sortable: true, title: '排序号' },
    { field: 'recCreateDt', formatter: 'formatDateTime', title: '创建时间' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    }
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    // 从URL参数初始化分页配置
    currentPage: getPageParamsFromUrl().page,
    pageSize: getPageParamsFromUrl().pageSize,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }) => {
        // 更新URL参数
        updateUrlParams(page, sort);

        // 使用统一的POST接口调用
        const response = await fetchTableData({
          page: page.currentPage,
          pageSize: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
        });

        const result = {
          items: response.list,

          total: response.total,
        };

        // 返回符合VxeTable要求的数据格式
        return result;
      },
    },
    sort: true,
  },
  sortConfig: {
    defaultSort: {
      field: getPageParamsFromUrl().sortBy || 'category',
      order: getPageParamsFromUrl().sortOrder || 'desc',
    },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

// 监听路由变化，同步表格状态
watch(
  () => route.query,
  () => {
    const params = getPageParamsFromUrl();
    gridApi.setPagination({
      currentPage: params.page,
      pageSize: params.pageSize,
    });

    if (params.sortBy && params.sortOrder) {
      gridApi.setSort(params.sortBy, params.sortOrder);
    }

    // 重新加载数据
    gridApi.reload();
  },
  { deep: true },
);

// 组件挂载时初始化
onMounted(() => {
  // 如果URL中有参数，同步到表格
  const params = getPageParamsFromUrl();
  if (params.page > 1 || params.pageSize !== 10) {
    gridApi.setPagination({
      currentPage: params.page,
      pageSize: params.pageSize,
    });
  }

  if (params.sortBy && params.sortOrder) {
    gridApi.setSort(params.sortBy, params.sortOrder);
  }
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="数据列表" table-title-help="提示">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </Button>
        <Button type="primary" @click="() => gridApi.reload()">
          刷新并返回第一页
        </Button>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="() => console.log('编辑', row)">编辑</Button>
      </template>
    </Grid>
  </Page>
</template>

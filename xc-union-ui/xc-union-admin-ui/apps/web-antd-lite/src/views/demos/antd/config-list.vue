<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ToolbarButton } from '#/types/commonTable';

import { computed, nextTick, reactive, ref } from 'vue';

import { ColPage, useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button, Tooltip, message } from 'ant-design-vue';
import { requestClient } from '#/api/request';

import CommonTable from '#/components/XcTable/src/XcTable.vue';

import XcTree from '../../../components/XcTree/src/XcTree.vue';
import ConfigForm from './modules/config-form.vue';
import { useGlobalIframeModal } from '#/hooks/useGlobalIframeModal';

// 创建表单抽屉
const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: ConfigForm,
  destroyOnClose: true,
});

const { open: openIframeModal, close: closeIframeModal } = useGlobalIframeModal();

const pageProps = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 50,
  leftMinWidth: 20,
  leftWidth: 30,
  resizable: true,
  rightWidth: 70,
  splitHandle: false,
  splitLine: false,
});

// 当前选中的树节点ID
const selectedNodeId = ref<null | string>(null);

// 表格选中项
const tableSelection = ref<any[]>([]);

// 表单配置
const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'nameTxt',
      label: '配置名称',
      componentProps: {
        placeholder: '请输入配置名称',
      },
    },
    {
      component: 'Input',
      fieldName: 'codeTxt',
      label: '配置编码',
      componentProps: {
        placeholder: '请输入配置编码',
      },
    },
    {
      component: 'Input',
      fieldName: 'valueTxt',
      label: '配置值',
      componentProps: {
        placeholder: '请输入配置值',
      },
    },
    {
      component: 'Input',
      fieldName: 'typeRef',
      label: '配置类型',
      componentProps: {
        placeholder: '请输入配置类型',
      },
    },
  ],
};

// 表格列配置
const tableColumns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50, align: 'center' },
  { title: '序号', type: 'seq', width: 50, align: 'center' },
  { field: 'typeRef', sortable: true, title: '配置类型', align: 'left' },
  { field: 'codeTxt', sortable: true, title: '配置编码', align: 'left' },
  { field: 'nameTxt', sortable: true, title: '配置名称', align: 'left' },
  { field: 'valueTxt', sortable: true, title: '配置值', align: 'left' },
  { field: 'recSortNum', sortable: true, title: '排序号', align: 'center' },
  {
    field: 'recCreateDt',
    formatter: 'formatDateTime',
    title: '创建时间',
    align: 'center',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 210,
    align: 'center',
  },
];

// 工具栏配置
const toolbarConfig = {
  search: true,
  custom: true,
  export: true,
  refresh: true,
  zoom: true,
  // 可以添加更多工具栏配置项
};

// 计算属性：是否禁用某些按钮
const isReorderDisabled = computed(() => selectedNodeId.value === null);
const isBatchDeleteDisabled = computed(
  () => !tableSelection.value || tableSelection.value.length === 0,
);

// 自定义按钮点击事件处理函数
const openFormWithData = (data: any, actionType?: 'add' | 'view' | 'edit' | 'copy') => {
  const titleMap: Record<string, string> = {
    add: '系统配置|新增',
    view: '系统配置|详情',
    edit: '系统配置|编辑',
    copy: '系统配置|拷贝',
  };
  const title = actionType ? titleMap[actionType] : data?.id ? '系统配置|编辑' : '系统配置|新增';
  openIframeModal({
    title,
    src: '/src/views/demos/antd/modules/config-form.vue',
    mode: 'drawer',
    placement: 'right',
    width: 800,
    height: '80vh',
    props: {
      initialData: data,
      actionType,
      onSuccess: () => {
        reloadTable();
        treeRef.value?.reload?.();
        closeIframeModal();
      },
    },
  });
};

const handleAdd = async () => {
  const pid = selectedNodeId.value;
  const data = await requestClient.post('/lite/config/liteConfig/prepare', { pid });
  openFormWithData(data, 'add');
};

const handleReorder = async () => {
  const pid = selectedNodeId.value;
  await requestClient.post('/lite/config/liteConfig/reorder', { pid });
  message.success('重新排序成功');
  reloadTable();
  treeRef.value?.reload?.();
};

const handleBatchDelete = async () => {
  const ids = tableSelection.value.map((r) => r.id);
  await requestClient.post('/lite/config/liteConfig/deletes', { ids });
  message.success('删除成功');
  reloadTable();
  treeRef.value?.reload?.();
};

const handlePreview = () => {
  openIframeModal({
    title: '预览',
    src:
      '/Users/zhixiulee/code/webstorm/vue-vben-admin-main/apps/web-antd-lite/src/views/demos/antd/modules/config-form.vue',
    width: 1200,
    height: '80vh',
  });
};

const handlePreviewDrawer = () => {
  openIframeModal({
    title: '抽屉预览',
    src:
      '/Users/zhixiulee/code/webstorm/vue-vben-admin-main/apps/web-antd-lite/src/views/demos/antd/modules/config-form.vue',
    width: 800,
    height: '80vh',
    mode: 'drawer',
    placement: 'right',
  });
};

// 工具栏按钮配置（第一行）
const toolbarButtons: ToolbarButton[] = [
  {
    key: 'add',
    text: '新增',
    type: 'primary',
    icon: 'i-ant-design:plus-outlined',
    onClick: handleAdd,
  },
  {
    key: 'reorder',
    text: '重新排序',
    type: 'primary',
    ghost: true,
    icon: 'i-ant-design:reload-outlined',
    disabled: () => isReorderDisabled.value,
    onClick: handleReorder,
  },
  {
    key: 'batchDelete',
    text: '删除',
    type: 'danger',
    ghost: true,
    icon: 'i-ant-design:delete-outlined',
    disabled: () => isBatchDeleteDisabled.value,
    onClick: handleBatchDelete,
  },
  {
    key: 'preview',
    text: '预览',
    type: 'default',
    icon: 'i-ant-design:eye-outlined',
    onClick: handlePreview,
  },
  {
    key: 'previewDrawer',
    text: '抽屉预览',
    type: 'default',
    icon: 'i-ant-design:menu-fold-outlined',
    onClick: handlePreviewDrawer,
  },
];

// 行操作按钮配置
const rowActionButtons: ToolbarButton[] = [
  { key: 'view', text: '查看', type: 'link', icon: 'i-ant-design:eye-outlined' },
  { key: 'edit', text: '编辑', type: 'link', icon: 'i-ant-design:edit-outlined' },
  { key: 'copy', text: '拷贝', type: 'link', icon: 'i-ant-design:copy-outlined' },
  { key: 'delete', text: '删除', type: 'danger', icon: 'i-ant-design:delete-outlined' },
  { key: 'publish', text: '发布', type: 'link', icon: 'i-ant-design:cloud-upload-outlined' },
  { key: 'audit', text: '审核', type: 'link', icon: 'i-ant-design:audit-outlined' },
];

// 表格引用
const tableRef = ref<any>(null);

// 树引用
const treeRef = ref<any>(null);

// 树节点点击事件
const handleTreeNodeClick = async (data: any) => {
  if (data && data.id === selectedNodeId.value) {
    // 取消选择，清空selectedNodeId
    selectedNodeId.value = null;
    await nextTick();
    // 触发表格重新加载
    reloadTable();
    return;
  }
  // 防止取消选择，只有当data存在时才更新selectedNodeId
  if (data) {
    // 设置选中的节点ID
    selectedNodeId.value = data.id;
    // 使用nextTick确保响应式更新完成后再重新加载表格
    await nextTick();
    // 触发表格重新加载
    reloadTable();
    tableSelection.value = [];
  }
  // 如果data为null（表示尝试取消选择），则不执行任何操作
};

// 表格选中项变化处理
const handleSelectionChange = (records: any[]) => {
  tableSelection.value = records;
  console.log('父组件中选中项变化，数量:', records.length);
};

// 行操作按钮点击事件处理
const handleRowActionClick = async (key: string, row: any) => {
  switch (key) {
    case 'view': {
      const data = await requestClient.post('/lite/config/liteConfig/get', { id: row.id });
      openFormWithData(data, 'view');
      break;
    }
    case 'edit': {
      const data = await requestClient.post('/lite/config/liteConfig/get', { id: row.id });
      openFormWithData(data, 'edit');
      break;
    }
    case 'copy': {
      const data = await requestClient.post('/lite/config/liteConfig/copy', { rowId: row.id });
      delete data.id;
      openFormWithData(data, 'copy');
      break;
    }
    case 'delete': {
      await requestClient.post('/lite/config/liteConfig/delete', { id: row.id });
      message.success('删除成功');
      reloadTable();
      treeRef.value?.reload?.();
      break;
    }
    case 'publish': {
      await requestClient.post('/lite/config/liteConfig/publish', { id: row.id });
      message.success('发布成功');
      reloadTable();
      break;
    }
    case 'audit': {
      await requestClient.post('/lite/config/liteConfig/audit', { id: row.id });
      message.success('审核成功');
      reloadTable();
      break;
    }
    default: {
      break;
    }
  }
};

// 重新加载表格数据
const reloadTable = () => {
  if (tableRef.value) {
    tableRef.value.reload();
  }
};
</script>

<template>
  <ColPage auto-content-height title="" v-bind="pageProps">
    <template #left="{ isCollapsed, expand }">
      <div v-if="isCollapsed" @click="expand">
        <Tooltip title="点击展开左侧">
          <Button shape="circle" type="primary">
            <template #icon>
              <IconifyIcon class="text-2xl" icon="bi:arrow-right" />
            </template>
          </Button>
        </Tooltip>
      </div>
      <div
        v-else
        :style="{ minWidth: '200px', height: '100%' }"
        class="border-border bg-card mr-2 rounded-[var(--radius)] border p-2"
      >
        <XcTree
          ref="treeRef"
          url="/lite/config/liteConfig/comTree"
          label="nameTxt"
          id="id"
          title="系统配置树"
          :default-expand-all="true"
          @node-click="handleTreeNodeClick"
        />
      </div>
    </template>

    <CommonTable
      ref="tableRef"
      table-title="系统配置列表"
      :form-options="formOptions"
      :columns="tableColumns"
      :toolbar-buttons="toolbarButtons"
      :row-action-buttons="rowActionButtons"
      :toolbar-config="toolbarConfig"
      api-endpoint="/lite/config/liteConfig/page"
      :extra-params="{ pid: selectedNodeId }"
      @selection-change="handleSelectionChange"
      @row-action-click="handleRowActionClick"
    />

    <!-- 表单抽屉 -->
    <FormDrawer @success="reloadTable" />
  </ColPage>
</template>

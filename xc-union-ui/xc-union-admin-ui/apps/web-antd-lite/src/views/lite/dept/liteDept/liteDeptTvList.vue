<script lang="ts" setup>
// ==================== 类型导入 ====================
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ToolbarButton } from '#/types/commonTable';

// ==================== Vue相关导入 ====================
import { computed, reactive, ref } from 'vue';

// ==================== 组件导入 ====================
import { ColPage } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button, Tooltip } from 'ant-design-vue';

// ==================== 自定义组件和Hook导入 ====================
import CommonTable from '#/components/XcTable/src/XcTable.vue';
import XcTree from '#/components/XcTree/src/XcTree.vue';
import useCommonEvents from '#/hooks/useCommonEvents';
import { useGlobalIframeModal } from '#/hooks/useGlobalIframeModal';

// ==================== 初始化 ====================
/**
 * 初始化全局iframe模态框
 * 用于打开和关闭表单页面
 */
const { open: openIframeModal, close: closeIframeModal } =
  useGlobalIframeModal();

/**
 * 初始化通用事件处理
 * 包含表单打开、数据提交等通用操作
 */
const { formEvents, layEvents } = useCommonEvents({
  open: openIframeModal,
  close: closeIframeModal,
});

// ==================== 页面配置 ====================
/**
 * 页面布局配置
 * 控制左右两栏的宽度、是否可调整等属性
 */
const pageProps = reactive({
  leftCollapsedWidth: 5, // 左侧折叠时的宽度
  leftCollapsible: true, // 左侧是否可折叠
  leftMaxWidth: 50, // 左侧最大宽度百分比
  leftMinWidth: 20, // 左侧最小宽度百分比
  leftWidth: 25, // 左侧默认宽度百分比
  resizable: true, // 是否可调整大小
  rightWidth: 75, // 右侧宽度百分比
  splitHandle: false, // 是否显示分割手柄
  splitLine: false, // 是否显示分割线
});

// ==================== 响应式数据 ====================
/**
 * 当前选中的树节点
 * 用于过滤表格数据
 */
const selectedNode = ref<any | null>(null);

/**
 * 表格选中项
 * 存储用户在表格中选中的记录
 */
const tableSelection = ref<any[]>([]);

/**
 * 表格引用
 * 用于调用表格组件的方法
 */
const tableRef = ref<any>(null);

/**
 * 树组件引用
 * 用于调用树组件的方法
 */
const treeRef = ref<any>(null);

// ==================== 表单配置 ====================
/**
 * 查询表单配置
 * 定义查询条件的输入项
 */
const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'nameTxt',
      label: '部门名称',
      componentProps: {
        placeholder: '请输入部门名称',
      },
    },
    {
      component: 'Input',
      fieldName: 'codeTxt',
      label: '部门编码',
      componentProps: {
        placeholder: '请输入部门编码',
      },
    },
    {
      component: 'Input',
      fieldName: 'shortNameTxt',
      label: '部门简称',
      componentProps: {
        placeholder: '请输入部门简称',
      },
    },
    {
      component: 'Input',
      fieldName: 'typeRef',
      label: '部门类型',
      componentProps: {
        placeholder: '请输入部门类型',
      },
    },
  ],
};

// ==================== 表格配置 ====================
/**
 * 表格列配置
 * 定义表格显示的列及其属性
 */
const tableColumns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50, align: 'center' }, // 复选框列
  { title: '序号', type: 'seq', width: 50, align: 'center' }, // 序号列
  {
    field: 'orgRef',
    sortable: true,
    title: '企业名称',
    width: 120,
    align: 'center',
  }, // 企业名称列
  {
    field: 'codeTxt',
    sortable: true,
    title: '部门编码',
    width: 150,
    align: 'left',
  }, // 部门编码列
  {
    field: 'nameTxt',
    sortable: true,
    title: '部门名称',
    width: 180,
    align: 'left',
  }, // 部门名称列
  {
    field: 'shortNameTxt',
    sortable: true,
    title: '部门简称',
    width: 120,
    align: 'left',
  }, // 部门简称列
  {
    field: 'typeRef',
    sortable: true,
    title: '部门类型',
    width: 120,
    align: 'center',
  }, // 部门类型列
  {
    field: 'recSortNum',
    sortable: true,
    title: '排序号',
    width: 90,
    align: 'center',
  }, // 排序号列
  {
    field: 'recValidFlag',
    formatter: ({ cellValue }) => (cellValue === '1' ? '是' : '否'),
    title: '是否有效',
    width: 90,
    align: 'center',
  }, // 是否有效列
  {
    field: 'recCreateDt',
    formatter: 'formatDateTime',
    title: '创建时间',
    width: 180,
    align: 'center',
  }, // 创建时间列
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 210,
    align: 'center',
  }, // 操作列（固定在右侧）
];

/**
 * 工具栏配置
 * 控制工具栏显示哪些功能按钮
 */
const toolbarConfig = {
  search: true, // 显示搜索按钮
  custom: true, // 显示自定义列按钮
  export: true, // 显示导出按钮
  refresh: true, // 显示刷新按钮
  zoom: true, // 显示缩放按钮
};

// ==================== 计算属性 ====================
/**
 * 重新排序按钮是否禁用
 * 当未选择树节点时禁用
 */
const isReorderDisabled = computed(() => selectedNode.value === null);

/**
 * 批量删除按钮是否禁用
 * 当未选择任何记录时禁用
 */
const isBatchDeleteDisabled = computed(
  () => !tableSelection.value || tableSelection.value.length === 0,
);

// ==================== 工具栏操作方法 ====================
/**
 * 新增操作
 * 打开新增表单页面
 */
const handleAdd = () => {
  const context: any = {};
  context.title = '部门表|新增';
  context.src = '/src/views/lite/dept/liteDept/liteDeptForm.vue';
  context.actionType = 'add';
  context.param = { pid: selectedNode.value?.id };
  context.dataBind = '/lite/dept/liteDept/prepare';
  context.afterSuccess = saveAfterSuccess;
  layEvents.handleOpen(context);
};

/**
 * 重新排序操作
 * 对当前选中节点下的子节点进行重新排序
 */
const handleReorder = () => {
  const context: any = {};
  context.param = { pid: selectedNode.value?.id };
  context.postAction = '/lite/dept/liteDept/reorder';
  context.confirmMsg = '确定重新排序吗？';
  context.successMsg = '重新排序成功!';
  context.afterSuccess = afterSuccess;
  formEvents.handlePost(context);
};

/**
 * 批量删除操作
 * 删除选中的多条记录
 */
const handleBatchDelete = () => {
  const ids = tableSelection.value.map((r) => r.id);
  const context: any = {};
  context.param = { ids };
  context.deleteAction = '/lite/dept/liteDept/deletes';
  context.confirmMsg = `确定删除选中的 ${ids.length} 项吗？`;
  context.successMsg = '删除成功!';
  context.afterSuccess = afterSuccess;
  formEvents.handleBatchDelete(context);
};

// ==================== 行操作方法 ====================
/**
 * 查看详情操作
 * 打开查看表单页面
 */
const handleView = (row: any) => {
  const context: any = {};
  context.title = '部门表|详情';
  context.src = '/src/views/lite/dept/liteDept/liteDeptForm.vue';
  context.actionType = 'view';
  context.param = { id: row.id };
  context.dataBind = '/lite/dept/liteDept/get';
  context.afterSuccess = saveAfterSuccess;
  layEvents.handleOpen(context);
};

/**
 * 编辑操作
 * 打开编辑表单页面
 */
const handleEdit = (row: any) => {
  const context: any = {};
  context.title = '部门表|编辑';
  context.src = '/src/views/lite/dept/liteDept/liteDeptForm.vue';
  context.actionType = 'edit';
  context.param = { id: row.id };
  context.dataBind = '/lite/dept/liteDept/get';
  context.afterSuccess = saveAfterSuccess;
  layEvents.handleOpen(context);
};

/**
 * 拷贝操作
 * 打开拷贝表单页面
 */
const handleCopy = (row: any) => {
  const context: any = {};
  context.title = '部门表|拷贝';
  context.src = '/src/views/lite/dept/liteDept/liteDeptForm.vue';
  context.actionType = 'copy';
  context.param = { rowId: row.id };
  context.dataBind = '/lite/dept/liteDept/copy';
  context.afterSuccess = saveAfterSuccess;
  layEvents.handleOpen(context);
};

/**
 * 删除操作
 * 删除单条记录
 */
const handleDelete = (row: any) => {
  const context: any = {};
  context.param = { id: row.id };
  context.deleteAction = '/lite/dept/liteDept/delete';
  context.confirmMsg = '确定删除记录吗？';
  context.successMsg = '删除成功!';
  context.afterSuccess = afterSuccess;
  formEvents.handleDelete(context);
};

// ==================== 回调函数 ====================
/**
 * 保存成功后的回调
 * 刷新表格和树组件数据
 */
const saveAfterSuccess = () => {
  reloadTable();
  treeRef.value?.refresh?.();
  closeIframeModal();
};

/**
 * 删除成功后的回调
 * 刷新表格和树组件数据
 */
const afterSuccess = () => {
  reloadTable();
  treeRef.value?.refresh?.();
};

// ==================== 辅助方法 ====================
/**
 * 重新加载表格数据
 * 调用表格组件的reload方法刷新数据
 */
const reloadTable = () => {
  if (tableRef.value) {
    tableRef.value.reload({ pid: selectedNode.value?.id });
  } else {
    console.warn('表格引用不存在，无法重新加载');
  }
};

// ==================== 事件处理 ====================
/**
 * 树节点点击事件
 * 设置选中的节点ID并刷新表格数据
 */
// 修改handleTreeNodeClick函数
const handleTreeNodeClick = async (data: any) => {
  // 先检查data和selectedNode是否存在，再进行比较
  if (data && selectedNode.value && data.id === selectedNode.value.id) {
    selectedNode.value = null;
    reloadTable(); // 直接调用
    return;
  }

  if (data) {
    selectedNode.value = data;
    reloadTable(); // 直接调用
    tableSelection.value = [];
  }
};

/**
 * 表格选中项变化处理
 * 更新tableSelection响应式数据
 */
const handleSelectionChange = (records: any[]) => {
  tableSelection.value = records;
};

// ==================== 按钮配置 ====================
/**
 * 工具栏按钮配置
 * 定义工具栏显示的按钮及其行为
 */
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
];

/**
 * 行操作按钮配置
 * 定义表格每行的操作按钮及其行为
 */
const rowActionButtons: ToolbarButton[] = [
  {
    key: 'view',
    text: '查看',
    type: 'link',
    icon: 'i-ant-design:eye-outlined',
    onClick: handleView,
  },
  {
    key: 'edit',
    text: '编辑',
    type: 'link',
    icon: 'i-ant-design:edit-outlined',
    onClick: handleEdit,
  },
  {
    key: 'copy',
    text: '拷贝',
    type: 'link',
    icon: 'i-ant-design:copy-outlined',
    onClick: handleCopy,
  },
  {
    key: 'delete',
    text: '删除',
    type: 'danger',
    icon: 'i-ant-design:delete-outlined',
    onClick: handleDelete,
  },
];
</script>

<template>
  <ColPage auto-content-height title="" v-bind="pageProps">
    <!-- 左侧栏插槽 -->
    <template #left="{ isCollapsed, expand }">
      <!-- 折叠状态时显示展开按钮 -->
      <div v-if="isCollapsed" @click="expand">
        <Tooltip title="点击展开左侧">
          <Button shape="circle" type="primary">
            <template #icon>
              <IconifyIcon class="text-2xl" icon="bi:arrow-right" />
            </template>
          </Button>
        </Tooltip>
      </div>
      <!-- 展开状态时显示树形组件 -->
      <div
        v-else
        :style="{ minWidth: '200px', height: '100%' }"
        class="border-border bg-card mr-2 rounded-[var(--radius)] border p-2"
      >
        <!-- 部门树组件 -->
        <XcTree
          ref="treeRef"
          url="/lite/dept/liteDept/comTreeOrgDept"
          label="nameTxt"
          id="id"
          title="部门树"
          :default-expand-all="true"
          @node-click="handleTreeNodeClick"
        />
      </div>
    </template>

    <!-- 右侧内容区域 -->
    <!-- 通用表格组件，显示部门列表 -->
    <CommonTable
      ref="tableRef"
      table-title="部门表列表"
      :form-options="formOptions"
      :columns="tableColumns"
      :toolbar-buttons="toolbarButtons"
      :row-action-buttons="rowActionButtons"
      :toolbar-config="toolbarConfig"
      api-endpoint="/lite/dept/liteDept/page"
      @selection-change="handleSelectionChange"
    />
  </ColPage>
</template>

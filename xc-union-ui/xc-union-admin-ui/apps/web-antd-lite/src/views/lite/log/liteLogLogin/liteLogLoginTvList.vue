<script lang="ts" setup>
// ==================== 类型导入 ====================
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ToolbarButton } from '#/types/commonTable';

// ==================== Vue相关导入 ====================
import { reactive, ref } from 'vue';

// ==================== 组件导入 ====================
import { ColPage } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button, Tooltip } from 'ant-design-vue';

// ==================== 自定义组件和Hook导入 ====================
import CommonTable from '#/components/XcTable/src/XcTable.vue';
import XcTree from '#/components/XcTree/src/XcTree.vue';

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
      fieldName: 'loginCodeTxt',
      label: '登录账号',
      componentProps: {
        placeholder: '请输入登录账号',
      },
    },
    {
      component: 'Input',
      fieldName: 'failPwdTxt',
      label: '失败密码',
      componentProps: {
        placeholder: '请输入失败密码',
      },
    },
    {
      component: 'Input',
      fieldName: 'failTxt',
      label: '失败信息',
      componentProps: {
        placeholder: '请输入失败信息',
      },
    },
    {
      component: 'Input',
      fieldName: 'loginTypeCode',
      label: '登录类型',
      componentProps: {
        placeholder: '请输入登录类型',
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
  { title: '序号', type: 'seq', width: 50, align: 'center' }, // 序号列
  {
    field: 'loginCodeTxt',
    sortable: true,
    title: '登录账号',
    width: 120,
    align: 'left',
  }, // 登录账号列
  {
    field: 'failPwdTxt',
    sortable: true,
    title: '失败密码',
    width: 120,
    align: 'left',
  }, // 失败密码列
  {
    field: 'failTxt',
    sortable: true,
    title: '失败信息',
    width: 150,
    align: 'left',
  }, // 失败信息列
  {
    field: 'loginBrowserTxt',
    sortable: true,
    title: '浏览器',
    width: 120,
    align: 'left',
  }, // 浏览器列
  {
    field: 'loginOsTxt',
    sortable: true,
    title: '操作系统',
    width: 120,
    align: 'left',
  }, // 操作系统列
  {
    field: 'loginAddressTxt',
    sortable: true,
    title: '地理位置',
    width: 150,
    align: 'left',
  }, // 地理位置列
  {
    field: 'loginIpTxt',
    sortable: true,
    title: 'ip地址',
    width: 120,
    align: 'left',
  }, // ip地址列
  {
    field: 'loginTokenTxt',
    sortable: true,
    title: 'token',
    width: 150,
    align: 'left',
  }, // token列
  {
    field: 'recCreateDt',
    formatter: 'formatDateTime',
    title: '创建时间',
    width: 180,
    align: 'center',
  }, // 创建时间列
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

// ==================== 辅助方法 ====================
/**
 * 重新加载表格数据
 * 调用表格组件的reload方法刷新数据
 */
const reloadTable = () => {
  if (tableRef.value) {
    const params: any = {};
    if (selectedNode.value) {
      if (selectedNode.value.type === 'ORG') {
        params.orgId = selectedNode.value.id;
      } else if (selectedNode.value.type === 'DEPT') {
        params.deptId = selectedNode.value.id;
      }
    }
    tableRef.value.reload(params);
  } else {
    console.warn('表格引用不存在，无法重新加载');
  }
};

// ==================== 事件处理 ====================
/**
 * 树节点点击事件
 * 设置选中的节点ID并刷新表格数据
 */
const handleTreeNodeClick = async (data: any) => {
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
const toolbarButtons: ToolbarButton[] = [];

/**
 * 行操作按钮配置
 * 定义表格每行的操作按钮及其行为
 */
const rowActionButtons: ToolbarButton[] = [];
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
    <!-- 通用表格组件，显示登录日志列表 -->
    <CommonTable
      ref="tableRef"
      table-title="登录日志表列表"
      :form-options="formOptions"
      :columns="tableColumns"
      :toolbar-buttons="toolbarButtons"
      :row-action-buttons="rowActionButtons"
      :toolbar-config="toolbarConfig"
      api-endpoint="/lite/log/liteLogLogin/page"
      @selection-change="handleSelectionChange"
    />
  </ColPage>
</template>

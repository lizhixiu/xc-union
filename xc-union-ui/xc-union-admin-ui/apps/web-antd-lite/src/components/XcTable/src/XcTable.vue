<script lang="ts" setup>
import type { ButtonType } from 'ant-design-vue/es/button';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ToolbarButton } from '#/types/commonTable';

import { computed, ref } from 'vue';

// Icons
import {
  AuditOutlined,
  CloudUploadOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';
// Components
import { Button, Dropdown, Menu } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
// Utilities
import { requestClient } from '#/api/request';

// ==================== Props & Emits ====================
const props = withDefaults(
  defineProps<{
    /** API端点 */
    apiEndpoint?: string;
    /** 表格列配置 */
    columns?: VxeGridProps['columns'];
    /** 是否启用点击行颜色功能，默认为true */
    enableClickRowHighlight?: boolean;
    /** 表单配置 */
    formOptions?: VbenFormProps;
    /** 行操作按钮配置 */
    rowActionButtons?: ToolbarButton[];
    /** 表格标题 */
    tableTitle?: string;
    /** 工具栏按钮配置 */
    toolbarButtons?: ToolbarButton[];
    /** 工具栏配置 */
    toolbarConfig?: VxeGridProps['toolbarConfig'];
  }>(),
  {
    enableClickRowHighlight: true,
  },
);

const emit = defineEmits<{
  (e: 'selectionChange', records: any[]): void;
  (e: 'toolbarClick', key: string): void;
  (e: 'rowActionClick', key: string, row: any): void;
}>();

// ==================== Data & Computed ====================
const { Item: MenuItem } = Menu;

/** 查询字段定义 */
const queryFields = computed(() => props.formOptions?.schema || []);

/** 动态计算是否显示折叠按钮 */
const showCollapseButton = computed(() => queryFields.value.length > 2);

/** 默认表单配置 */
const defaultFormOptions: VbenFormProps = {
  collapsed: queryFields.value.length > 2,
  submitOnChange: false,
  submitOnEnter: true,
  showCollapseButton: showCollapseButton.value,
};

/** 合并表单配置 */
const mergedFormOptions = computed(() => {
  const schema = props.formOptions?.schema || [];

  return {
    ...defaultFormOptions,
    ...props.formOptions,
    schema,
    collapsed:
      schema.length > 2 ? (props.formOptions?.collapsed ?? true) : false,
    showCollapseButton: schema.length > 2,
  };
});

/** 合并表格列配置 */
const mergedColumns = computed(() => props.columns || []);

/** 表格选中项 */
const tableSelection = ref<any[]>([]);

/** 点击的行 */
const clickedRow = ref<any>(null);

const tableParams = ref<any>({});

// ==================== Methods ====================
/**
 * 统一的表格数据查询接口
 */
const fetchTableData = async (params: any, formValues: any) => {
  const requestData = {
    ...params,
    ...formValues,
    ...tableParams.value,
  };

  // 使用传入的API端点（必须由父组件提供）
  const endpoint = props.apiEndpoint;
  if (!endpoint) {
    throw new Error('API端点未配置，请通过apiEndpoint属性传入');
  }

  return await requestClient.post(endpoint, requestData);
};

/**
 * 计算按钮禁用状态
 */
const isButtonDisabled = (button: ToolbarButton) => {
  if (typeof button.disabled === 'function') {
    return button.disabled();
  }
  return button.disabled || false;
};

/**
 * 映射按钮类型到 Ant Design Vue 类型
 */
const mapButtonType = (type: string | undefined): ButtonType => {
  if (type === 'danger') return 'default';
  if (type === 'link') return 'link';
  return (type as ButtonType) || 'default';
};

/**
 * 根据图标名称获取对应的图标组件
 */
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'i-ant-design:audit-outlined': {
      return AuditOutlined;
    }
    case 'i-ant-design:cloud-upload-outlined': {
      return CloudUploadOutlined;
    }
    case 'i-ant-design:copy-outlined': {
      return CopyOutlined;
    }
    case 'i-ant-design:delete-outlined': {
      return DeleteOutlined;
    }
    case 'i-ant-design:edit-outlined': {
      return EditOutlined;
    }
    case 'i-ant-design:eye-outlined': {
      return EyeOutlined;
    }
    case 'i-ant-design:plus-outlined': {
      return PlusOutlined;
    }
    case 'i-ant-design:reload-outlined': {
      return ReloadOutlined;
    }
    default: {
      return null;
    }
  }
};

/**
 * 工具栏按钮点击处理
 */
const handleToolbarClick = (key: string) => {
  emit('toolbarClick', key);
};

/**
 * 行操作按钮点击处理
 */
const handleRowActionClick = (key: string, row: any) => {
  emit('rowActionClick', key, row);
};

/**
 * 表格选中项变化处理
 */
const handleSelectionChange = ({ records }: { records: any[] }) => {
  tableSelection.value = records;
  emit('selectionChange', records);
};

/**
 * 处理工具栏按钮点击事件
 */
const handleButtonClick = (button: ToolbarButton) => {
  // 优先执行按钮自定义的onClick方法
  if (button.onClick) {
    button.onClick();
  } else {
    // 向后兼容，触发toolbarClick事件
    handleToolbarClick(button.key);
  }
};

/**
 * 处理行操作按钮点击事件
 */
const handleRowActionButtonClick = (button: ToolbarButton, row: any) => {
  // 优先执行按钮自定义的onClick方法
  if (button.onClick) {
    // 传递行数据给onClick方法
    button.onClick(row);
  } else {
    // 向后兼容，触发rowActionClick事件
    handleRowActionClick(button.key, row);
  }
};

// ==================== Grid Configuration ====================
/** 表格配置 */
const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns: mergedColumns.value,
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    currentPage: 1,
    pageSize: 20,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }, formValues) => {
        const response = await fetchTableData(
          {
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
          },
          formValues,
        );

        return {
          items: response.list,
          total: response.total,
        };
      },
    },
    sort: true,
  },
  rowConfig: {
    isCurrent: true,
    isHover: true,
    keyField: 'id',
  },
  sortConfig: {
    defaultSort: {
      field: '',
      order: '',
    },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    zoom: true,
    ...props.toolbarConfig,
  },
  border: true,
  stripe: true,
  rowClassName: ({ row }: { row: any }) => {
    if (props.enableClickRowHighlight && row === clickedRow.value) {
      return 'clicked-row';
    }
    return '';
  },
};

/** 初始化表格 */
const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {
    cellClick({ row, column }: { column: any; row: any }) {
      // 只有在启用点击行高亮功能时才处理点击行逻辑
      if (props.enableClickRowHighlight) {
        // 如果点击的是已经选中的行，则取消选中，否则设置为选中
        clickedRow.value = clickedRow.value === row ? null : row;
      }
    },
    cellDblclick({ row, column }: { column: any; row: any }) {
      // 双击行事件处理（可根据需要添加具体逻辑）
      console.log(`双击行：${row.id} 双击列：${column.title}`);
    },
    checkboxChange({ records }: { records: any[] }) {
      tableSelection.value = records;
      emit('selectionChange', records);

      // 清除所有行的选中状态，但保留点击状态
      if (records.length === 0 && gridApi.grid) {
        gridApi.grid.clearCheckboxRow();
        gridApi.grid.clearCurrentRow();
      }
    },
    checkboxAll({ records }: { records: any[] }) {
      tableSelection.value = records;
      emit('selectionChange', records);

      // 清除所有行的选中状态，但保留点击状态
      if (records.length === 0 && gridApi.grid) {
        gridApi.grid.clearCheckboxRow();
        gridApi.grid.clearCurrentRow();
      }
    },
  },
  formOptions: mergedFormOptions.value,
  gridOptions,
});

// ==================== Reactive State ====================
const showBorder = gridApi.useStore((state: any) => state.gridOptions?.border);
const showStripe = gridApi.useStore((state: any) => state.gridOptions?.stripe);

// ==================== Expose ====================
defineExpose({
  reload: (params?: any) => {
    tableParams.value = params || {};
    gridApi.reload(tableParams.value);
  },
  query: (params?: any) => {
    return gridApi.query(params);
  },
  getSelection: () => tableSelection.value,
  getSelectedRowKeys: () => tableSelection.value.map((item) => item.id),
  clearSelection: () => {
    tableSelection.value = [];
    if (gridApi.grid) {
      gridApi.grid.clearCheckboxRow();
      gridApi.grid.clearCurrentRow();
    }
  },
  toggleBorder: () => {
    gridApi.setGridOptions({
      border: !showBorder.value,
    });
  },
  toggleStripe: () => {
    gridApi.setGridOptions({
      stripe: !showStripe.value,
    });
  },
  getBorderState: () => showBorder.value,
  getStripeState: () => showStripe.value,
  clearClickedRow: () => {
    clickedRow.value = null;
  },
  clearAllSelection: () => {
    tableSelection.value = [];
    clickedRow.value = null;
    if (gridApi.grid) {
      gridApi.grid.clearCheckboxRow();
      gridApi.grid.clearCurrentRow();
    }
  },
});
</script>

<template>
  <Grid
    :table-title="tableTitle"
    table-title-help=""
    @selection-change="handleSelectionChange"
  >
    <!-- 工具栏按钮区域 -->
    <template #toolbar-tools>
      <div class="flex flex-col gap-2">
        <!-- 工具栏按钮 -->
        <div
          v-if="toolbarButtons && toolbarButtons.length > 0"
          class="flex items-center gap-2"
        >
          <Button
            v-for="button in toolbarButtons"
            :key="button.key"
            :type="mapButtonType(button.type)"
            :ghost="button.ghost"
            :disabled="isButtonDisabled(button)"
            :class="button.type === 'danger' ? 'ant-btn-danger' : ''"
            @click="() => handleButtonClick(button)"
          >
            <component v-if="button.icon" :is="getIconComponent(button.icon)" />
            {{ button.text }}
          </Button>
        </div>
      </div>
    </template>

    <!-- 行操作按钮区域 -->
    <template #action="{ row }">
      <div class="flex items-center">
        <!-- 动态行操作按钮 -->
        <template v-if="rowActionButtons && rowActionButtons.length > 0">
          <!-- 显示前两个按钮 -->
          <template
            v-for="(button, index) in rowActionButtons.slice(0, 2)"
            :key="button.key"
          >
            <Button
              v-if="index < 2"
              :type="mapButtonType(button.type)"
              size="small"
              :disabled="isButtonDisabled(button)"
              :class="button.type === 'danger' ? 'ant-btn-danger' : ''"
              @click.stop="() => handleRowActionButtonClick(button, row)"
              class="mr-1"
            >
              <component
                v-if="button.icon"
                :is="getIconComponent(button.icon)"
                class="mr-1"
              />
              {{ button.text }}
            </Button>
          </template>

          <!-- 如果按钮数量超过2个，将剩余按钮放入下拉菜单 -->
          <Dropdown v-if="rowActionButtons.length > 2" placement="bottomRight">
            <Button type="link" size="small">更多</Button>
            <template #overlay>
              <Menu>
                <MenuItem
                  v-for="button in rowActionButtons.slice(2)"
                  :key="button.key"
                  :disabled="isButtonDisabled(button)"
                  @click.stop="() => handleRowActionButtonClick(button, row)"
                >
                  <span :class="button.type === 'danger' ? 'text-red-500' : ''">
                    <component
                      v-if="button.icon"
                      :is="getIconComponent(button.icon)"
                      class="mr-1"
                    />
                    {{ button.text }}
                  </span>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </template>
      </div>
    </template>
  </Grid>
</template>

<style scoped>
/* ==================== 表格行样式 ==================== */
/* 自定义斑马纹颜色 - #2D91FF 的极淡色调 */
:deep(.vxe-table--body-wrapper .vxe-body--row.row--stripe) {
  background-color: #f5f9ff !important;
}

/* 自定义鼠标悬浮颜色 - #2D91FF 的淡色调 */
:deep(.vxe-table--body-wrapper .vxe-body--row.row--hover),
:deep(.vxe-table--body-wrapper .vxe-body--row.row--hover > td) {
  background-color: #e6f2ff !important;
}

/* 自定义选中行颜色 - #95C6FF 的淡色调 */
:deep(.vxe-table--body-wrapper .vxe-body--row.row--current),
:deep(.vxe-table--body-wrapper .vxe-body--row.row--current > td) {
  background-color: #d9eaff !important;
}

/* 自定义复选框选中行颜色 - #95C6FF 的淡色调 */
:deep(.vxe-table--body-wrapper .vxe-body--row.row--checked),
:deep(.vxe-table--body-wrapper .vxe-body--row.row--checked > td) {
  background-color: #d9eaff !important;
}

/* 点击行颜色 - 使用 #fff2c1 并保持显示 */
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row),
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row > td) {
  background-color: #fff2c1 !important;
}

/* 点击行且选中的颜色 - 使用 #fff2c1 */
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row.row--checked),
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row.row--checked > td) {
  background-color: #fff2c1 !important;
}

/* 点击行且当前行的颜色 - 使用 #fff2c1 */
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row.row--current),
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row.row--current > td) {
  background-color: #fff2c1 !important;
}

/* 提高点击行颜色的优先级，确保在取消全选后仍然显示 */
:deep(.vxe-table--body-wrapper .vxe-body--row.clicked-row) {
  background-color: #fff2c1 !important;
}

/* ==================== 复选框样式 ==================== */
/* 确保复选框列不会被其他元素遮挡 */
:deep(.vxe-table .vxe-cell--checkbox) {
  z-index: 10;
  position: relative;
}

:deep(.vxe-table .vxe-checkbox--icon) {
  z-index: 10;
  position: relative;
}

/* 确保复选框在悬停时仍然可见 */
:deep(.vxe-table--body-wrapper .vxe-body--row:hover .vxe-cell--checkbox) {
  z-index: 10;
  position: relative;
}

:deep(.vxe-table--body-wrapper .vxe-body--row:hover .vxe-checkbox--icon) {
  z-index: 10;
  position: relative;
}

/* 调整复选框容器的样式 */
:deep(.vxe-table .vxe-cell--checkbox .vxe-checkbox) {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ==================== 按钮样式 ==================== */
/* 为所有按钮添加悬停效果 */
:deep(.ant-btn) {
  transition: all 0.3s;
}

:deep(.ant-btn:hover) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 为danger类型的按钮添加红色样式 */
:deep(.ant-btn-danger) {
  color: #ff4d4f;
  border-color: #ff4d4f;
  background-color: #fff;
}

:deep(.ant-btn-danger:hover) {
  color: #ff7875;
  border-color: #ff7875;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.2);
}

:deep(.ant-btn-danger:focus) {
  color: #ff4d4f;
  border-color: #ff4d4f;
  background-color: #fff;
}
</style>

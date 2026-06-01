<script lang="ts" setup>
import type { MenuProps, TreeProps } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/_util/type';

import { computed, onMounted, ref, watch } from 'vue';

import { FolderOpenOutlined, FolderOutlined, DownOutlined ,FileOutlined} from '@ant-design/icons-vue';
import { Button, Card, Dropdown, Input, Menu, Tree } from 'ant-design-vue';

import { requestClient } from '#/api/request';

// 定义组件属性
const props = withDefaults(
  defineProps<{
    defaultExpandAll?: boolean;
    id?: string;
    label?: string;
    loadData?: (node: any) => Promise<any[]>;
    renderIcon?: (data: any, node: any) => any;
    showCheckbox?: boolean;
    showIcon?: boolean;
    title?: string;
    url?: string;
  }>(),
  {
    id: 'id',
    title: '',
    url: '',
    label: 'nameTxt', // 默认使用nameTxt作为显示字段
    defaultExpandAll: false,
    showCheckbox: false,
    showIcon: true,
    renderIcon: undefined,
    loadData: undefined,
  },
);

// 定义事件
const emit = defineEmits<{
  (e: 'node-click', node: any, data: any): void;
  (e: 'check', checkedKeys: Key[], info: any): void;
}>();

// 响应式数据
const treeFilterText = ref('');
const treeList = ref<TreeProps['treeData']>([]);
const treeLoading = ref(false);
const expandedKeys = ref<Key[]>([]);
const selectedKeys = ref<Key[]>([]);
const checkedKeys = ref<Key[]>([]);
const treeRef = ref();
const checkStrictly = ref(false); // 层级关联状态
const originalExpandedKeys = ref<Key[]>([]); // 用于存储过滤前的展开状态

// 树属性配置 - 根据API返回数据调整字段映射
const treeProps = computed(() => ({
  title: props.label, // 显示字段
  key: 'id', // 唯一标识字段
  children: 'children', // 子节点字段
}));

// 递归过滤树数据的函数
const filterTree = (nodes: any[], keyword: string): any[] => {
  if (!keyword) return nodes;

  const newTree: any[] = [];
  for (const node of nodes) {
    const labelValue = node[props.label] || '';
    const isMatch = labelValue.toLowerCase().includes(keyword.toLowerCase());

    let filteredChildren: any[] | undefined;
    if (node.children && node.children.length > 0) {
      filteredChildren = filterTree(node.children, keyword);
    }

    if (isMatch || (filteredChildren && filteredChildren.length > 0)) {
      // 创建一个新节点以避免修改原始数据
      const newNode = { ...node, children: filteredChildren };
      newTree.push(newNode);
    }
  }
  return newTree;
};

// 递归获取树中所有节点的key
const getKeysFromTree = (nodes: any[]): Key[] => {
  const keys: Key[] = [];
  for (const node of nodes) {
    keys.push(node.id);
    if (node.children && node.children.length > 0) {
      keys.push(...getKeysFromTree(node.children));
    }
  }
  return keys;
};

// 用于显示在Tree组件中的数据，它会根据过滤文本动态计算
const filteredTreeData = computed(() => {
  if (!treeFilterText.value) {
    return treeList.value;
  }
  return filterTree(treeList.value || [], treeFilterText.value);
});

// 加载树数据
const loadTreeData = async () => {
  if (!props.url) return;

  treeLoading.value = true;
  try {
    // 调用API获取数据

    const response = await requestClient.post(props.url);

    let data = [];
    if (response.list) {
      // 提取list中的数据，API返回的数据在list字段中
      data = response.list;
    } else if (Array.isArray(response)) {
      // 如果响应本身就是数组
      data = response;
    }
    treeList.value = data;

    // 如果需要默认展开所有节点
    if (props.defaultExpandAll && data.length > 0) {
      const allKeys = getAllNodeKeys(data);
      expandedKeys.value = allKeys;
      originalExpandedKeys.value = allKeys; // 保存初始展开状态
    }
  } catch (error) {
    console.error('获取树数据失败:', error);
  } finally {
    treeLoading.value = false;
  }
};

// 获取所有节点的key
const getAllNodeKeys = (nodes: any[]): Key[] => {
  const keys: Key[] = [];
  nodes.forEach((node) => {
    // 使用id作为key
    keys.push(node.id);
    if (node.children && node.children.length > 0) {
      keys.push(...getAllNodeKeys(node.children));
    }
  });
  return keys;
};

// 树节点选择
const onTreeNodeSelect = (selectedKeysValue: Key[], info: any) => {
  selectedKeys.value = selectedKeysValue;
  // eslint-disable-next-line vue/custom-event-name-casing
  emit('node-click', info.node, info.node);
};

// 树节点勾选
const onTreeCheck = (
  checkedKeysValue: Key[] | { checked: Key[]; halfChecked: Key[] },
  info: any,
) => {
  if (Array.isArray(checkedKeysValue)) {
    checkedKeys.value = checkedKeysValue;
    emit('check', checkedKeysValue, info);
  } else {
    checkedKeys.value = checkedKeysValue.checked;
    emit('check', checkedKeysValue.checked, info);
  }
};

// 树节点展开/收缩
const onTreeExpand = (keys: Key[]) => {
  expandedKeys.value = keys;
  // 如果不在过滤状态，则更新原始展开状态
  if (!treeFilterText.value) {
    originalExpandedKeys.value = keys;
  }
};

// 加载树节点（用于异步加载）
const loadTreeNode = (node: any): Promise<void> => {
  return new Promise((resolve) => {
    if (props.loadData) {
      props.loadData(node).then((children) => {
        node.dataRef.children = children;
        treeList.value = [...(treeList.value || [])];
        resolve();
      });
    } else {
      resolve();
    }
  });
};

// 刷新树数据
const refresh = () => {
  console.log('开始刷新树组件数据...');
  treeFilterText.value = ''; // 刷新时清空过滤器
  loadTreeData();
  console.log('树组件刷新命令已发送');
};

// 选择全部节点
const selectAll = () => {
  if (props.showCheckbox && treeList.value) {
    const allKeys = getAllNodeKeys(treeList.value);
    checkedKeys.value = allKeys;
  }
};

// 取消选择所有节点
const deselectAll = () => {
  if (props.showCheckbox) {
    checkedKeys.value = [];
  }
};

// 展开所有节点
const expandAll = () => {
  if (treeList.value) {
    const allKeys = getAllNodeKeys(treeList.value);
    expandedKeys.value = allKeys;
    originalExpandedKeys.value = allKeys;
  }
};

// 折叠所有节点
const collapseAll = () => {
  expandedKeys.value = [];
  originalExpandedKeys.value = [];
};

// 切换层级关联状态
const toggleCheckStrictly = () => {
  checkStrictly.value = !checkStrictly.value;
};

// 渲染图标组件 - 根据节点展开状态切换图标
const renderIconComponent = (data: any) => {
  if (props.renderIcon) {
    return props.renderIcon(data, null);
  }
  // 异步加载时，isLeaf可能为false但children为空
  if (data.isLeaf === false || (data.children && data.children.length > 0)) {
    const isExpanded = expandedKeys.value.includes(data.id);
    return isExpanded ? FolderOpenOutlined : FolderOutlined;
  } else {
    return FileOutlined;
  }
  // 对于叶子节点，可以不显示图标或显示特定图标
};

// 获取当前选中节点的key
const getCurrentKey = () => {
  return selectedKeys.value.length > 0 ? selectedKeys.value[0] : null;
};

// 获取当前选中节点
const getCurrentNode = () => {
  if (selectedKeys.value.length > 0 && treeList.value) {
    const findNode = (nodes: any[]): any => {
      for (const node of nodes) {
        if (node.id === selectedKeys.value[0]) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findNode(treeList.value);
  }
  return null;
};

// 下拉菜单项
const menuItems = computed<MenuProps['items']>(() => [
  {
    key: 'selectAll',
    label: '选择全部',
    disabled: !props.showCheckbox,
  },
  {
    key: 'deselectAll',
    label: '取消选择',
    disabled: !props.showCheckbox,
  },
  {
    key: 'expandAll',
    label: '展开全部',
  },
  {
    key: 'collapseAll',
    label: '折叠全部',
  },
  {
    key: 'toggleCheckStrictly',
    label: checkStrictly.value ? '层级关联' : '层级独立',
    disabled: !props.showCheckbox,
  },
]);

// 处理下拉菜单点击
const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  switch (key) {
    case 'collapseAll': {
      collapseAll();
      break;
    }
    case 'deselectAll': {
      deselectAll();
      break;
    }
    case 'expandAll': {
      expandAll();
      break;
    }
    case 'selectAll': {
      selectAll();
      break;
    }
    case 'toggleCheckStrictly': {
      toggleCheckStrictly();
      break;
    }
  }
};

// 监听过滤文本变化，以自动展开过滤结果
watch(treeFilterText, (val) => {
  if (val) {
    // 当有过滤条件时，计算过滤后树的所有key并展开它们
    const filteredKeys = getKeysFromTree(filteredTreeData.value || []);
    expandedKeys.value = filteredKeys;
  } else {
    // 当过滤条件清空时，恢复到用户之前的展开状态
    expandedKeys.value = originalExpandedKeys.value;
  }
});

// 组件挂载时加载数据
onMounted(() => {
  loadTreeData();
});

// 暴露方法给父组件
defineExpose({
  refresh,
  getCurrentKey,
  getCurrentNode,
});
</script>

<template>
  <Card :title="title" class="h-full">
    <template #extra>
      <div class="flex gap-2">
        <Button
          size="small"
          type="primary"
          :loading="treeLoading"
          @click="refresh"
        >
          刷新
        </Button>
        <Dropdown :trigger="['click']">
          <Button size="small"> 更多 </Button>
          <template #overlay>
            <Menu :items="menuItems" @click="handleMenuClick" />
          </template>
        </Dropdown>
      </div>
    </template>
    <div class="flex h-full flex-col">
      <div class="p-2">
        <Input
          v-model:value="treeFilterText"
          placeholder="输入关键字进行过滤"
          allow-clear
        />
      </div>
      <div class="flex-1 overflow-auto">
        <Tree
          ref="treeRef"
          class="xc-tree"
          :tree-data="filteredTreeData"
          :field-names="treeProps"
          :show-line="false"
          :selectable="!showCheckbox"
          :checkable="showCheckbox"
          :check-strictly="checkStrictly"
          :expanded-keys="expandedKeys"
          :selected-keys="selectedKeys"
          :checked-keys="checkedKeys"
          :load-data="loadTreeNode"
          @select="onTreeNodeSelect"
          @check="onTreeCheck"
          @expand="onTreeExpand"
        >
          <template #switcherIcon="{ switcherCls }">
            <DownOutlined :class="switcherCls" />
          </template>

          <template #title="nodeData">
            <div class="tree-node-content">
              <!-- 动态图标 -->
              <span v-if="showIcon" class="tree-node-icon">
                <component :is="renderIconComponent(nodeData)" />
              </span>
              <!-- 带颜色的文本 -->
              <span
                :style="{ color: nodeData.color || '#333' }"
                class="tree-node-label"
              >
                {{ nodeData[props.label] }}
              </span>
            </div>
          </template>
        </Tree>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.tree-node-content {
  display: flex;
  align-items: center;
  gap: 6px;
}
.tree-node-icon {
  vertical-align: middle;
}
.tree-node-label {
  vertical-align: middle;
}
/* 确保Tree在容器内可以滚动 */
.xc-tree {
  height: 100%;
}
</style>

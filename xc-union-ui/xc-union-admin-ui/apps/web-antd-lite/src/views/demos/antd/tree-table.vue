<script lang="ts" setup>
import { reactive } from 'vue';

import { ColPage } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import XcTree from '../../../components/XcTree/src/XcTree.vue';

// ColPage 布局配置
const layoutProps = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 40,
  leftMinWidth: 20,
  leftWidth: 25,
  resizable: true,
  rightWidth: 75,
  splitHandle: true,
  splitLine: true,
});
</script>

<template>
  <ColPage
    auto-content-height
    v-bind="layoutProps"
    title="左树右表结构示例"
  >
    <template #left>
      <div class="h-full p-2">
        <XcTree
          title="组织架构"
          url="/lite/config/liteConfig/comTree"
          label="nameTxt"
          id="id"
          :default-expand-all="true"
        />
      </div>
    </template>

    <template #right>
      <div class="h-full p-2">
        <Card title="右侧内容区域" class="h-full">
          <!-- 右侧留空的div -->
          <div class="h-full flex items-center justify-center">
            <div class="text-gray-400">请选择左侧树节点</div>
          </div>
        </Card>
      </div>
    </template>
  </ColPage>
</template>

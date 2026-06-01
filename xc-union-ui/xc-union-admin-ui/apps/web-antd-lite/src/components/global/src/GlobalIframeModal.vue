<script lang="ts" setup>
import { watch } from 'vue';

import { useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { Spin } from 'ant-design-vue';

import { useGlobalIframeModal } from '#/hooks/useGlobalIframeModal';

const { state, close, setLoading } = useGlobalIframeModal();
const [Modal, modalApi] = useVbenModal({
  onCancel() {
    setLoading(false);
    close();
  },
  onClosed() {
    setLoading(false);
    close();
  },
});
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    setLoading(false);
    close();
  },
  onClosed() {
    setLoading(false);
    close();
  },
});

watch(
  () => state.open,
  (v) => {
    if (state.mode === 'drawer') {
      if (v) {
        setLoading(true);
        drawerApi.open();
      } else {
        drawerApi.close();
      }
    } else {
      if (v) {
        setLoading(true);
        modalApi.open();
      } else {
        modalApi.close();
      }
    }
  },
);

function onLoad() {
  setLoading(false);
}

// 计算modal的宽度class
const getModalWidthClass = () => {
  const width = state.width;
  if (typeof width === 'number') {
    return `w-[${width}px]`;
  }
  if (typeof width === 'string') {
    if (width.endsWith('vw')) {
      const pixels = Number.parseInt(width);
      return `w-[${pixels}vw]`;
    }
    // 如果是百分比，转换为vw单位
    if (width.endsWith('%')) {
      const percent = Number.parseInt(width);
      return `w-[${percent}vw]`;
    }
    // 如果已经是指定格式如'1200px'，转换为tailwind类
    if (width.endsWith('px')) {
      const pixels = Number.parseInt(width);
      return `w-[${pixels}px]`;
    }
    return width;
  }
  // 默认80%
  return 'w-[80vw]';
};

// 计算modal的高度class
const getModalHeightClass = () => {
  const height = state.height;
  if (typeof height === 'number') {
    return `h-[${height}px]`;
  }
  if (typeof height === 'string') {
    if (height.endsWith('vh')) {
      const pixels = Number.parseInt(height);
      return `w-[${pixels}vw]`;
    }
    // 如果是百分比，转换为vh单位
    if (height.endsWith('%')) {
      const percent = Number.parseInt(height);
      return `h-[${percent}vh]`;
    }
    // 如果已经是指定格式如'800px'，转换为tailwind类
    if (height.endsWith('px')) {
      const pixels = Number.parseInt(height);
      return `h-[${pixels}px]`;
    }
    return height;
  }
  // 默认80vh
  return 'h-[80vh]';
};

// 计算drawer的宽度class
const getDrawerWidthClass = () => {
  const width = state.width;
  if (typeof width === 'number') {
    return `w-[${width}px]`;
  }
  if (typeof width === 'string') {
    // 如果是百分比，转换为vw单位
    if (width.endsWith('%')) {
      const percent = Number.parseInt(width);
      return `w-[${percent}vw]`;
    }
    // 如果已经是指定格式如'1200px'，转换为tailwind类
    if (width.endsWith('px')) {
      const pixels = Number.parseInt(width);
      return `w-[${pixels}px]`;
    }
    return width;
  }
  // 默认60vw
  return 'w-[60vw]';
};
</script>

<template>
  <template v-if="state.mode === 'modal'">
    <Modal
      :footer="false"
      :title="state.title"
      :class="`${getModalWidthClass()} ${getModalHeightClass()}`"
    >
      <div>
        <div
          v-if="state.loading"
          style="
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <Spin />
        </div>
        <template v-else>
          <iframe
            v-if="state.isIframe"
            :height="state.height"
            :src="state.src"
            style="width: 100%; border: 0"
            @load="onLoad"
          ></iframe>
          <component
            v-else
            :is="state.component"
            v-bind="state.componentProps"
          />
        </template>
      </div>
    </Modal>
  </template>
  <template v-else>
    <Drawer
      :title="state.title"
      :placement="state.placement"
      :class="`${getDrawerWidthClass()}`"
    >
      <div>
        <div
          v-if="state.loading"
          style="
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <Spin />
        </div>
        <template v-else>
          <iframe
            v-if="state.isIframe"
            :height="state.height"
            :src="state.src"
            style="width: 100%; border: 0"
            @load="onLoad"
          ></iframe>
          <component
            v-else
            :is="state.component"
            v-bind="state.componentProps"
          />
        </template>
      </div>
    </Drawer>
  </template>
</template>

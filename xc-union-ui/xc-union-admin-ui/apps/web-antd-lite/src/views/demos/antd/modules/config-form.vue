<template>
  <div style="display:flex; justify-content:flex-end; gap:8px; margin-bottom:12px">
    <a-button type="primary" @click="handleSave" v-if="actionType !== 'view'">保存</a-button>
    <a-button @click="handleClose">关闭</a-button>
  </div>
  <Form />
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { requestClient } from '#/api/request';

import { useVbenForm } from '#/adapter/form';

import { useFormSchema } from '#/views/demos/antd/data';
import { useGlobalIframeModal } from '#/hooks/useGlobalIframeModal';

const emits = defineEmits(['success']);
const props = defineProps<{ initialData?: any; actionType?: 'add'|'view'|'edit'|'copy'; onSuccess?: () => void }>();

const formData = ref<any>();
const id = ref();

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const createConfig = (values: any) => {
  return requestClient.post('/lite/config/liteConfig/insert', values);
};

const updateConfig = (id: any, values: any) => {
  return requestClient.post('/lite/config/liteConfig/update', { id, ...values });
};

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? updateConfig(id.value, values) : createConfig(values))
      .then(() => {
        emits('success');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<any>();
      formApi.resetForm();

      if (data) {
        formData.value = data;
        id.value = data.id;
      } else {
        id.value = undefined;
      }

      // Wait for Vue to flush DOM updates (form fields mounted)
      await nextTick();
      if (data) {
        formApi.setValues(data);
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? `编辑配置项`
    : `新增配置项`;
});

const { close } = useGlobalIframeModal();

async function handleSave() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  const values = await formApi.getValues();
  if (id.value) {
    await requestClient.post('/lite/config/liteConfig/update', { id: id.value, ...values });
  } else {
    await requestClient.post('/lite/config/liteConfig/insert', values);
  }
  props.onSuccess?.();
}

function handleClose() {
  close();
}

async function initFromProps() {
  const data = props.initialData;
  formApi.resetForm();
  if (data) {
    formData.value = data;
    id.value = data.id;
  } else {
    id.value = undefined;
  }
  await nextTick();
  if (data) {
    formApi.setValues(data);
  }
}

initFromProps();
</script>

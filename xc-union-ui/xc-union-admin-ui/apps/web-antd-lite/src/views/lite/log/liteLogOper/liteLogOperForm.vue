<script lang="ts" setup>
import { nextTick, ref } from 'vue';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { requestClient } from '#/api/request';
import useCommonEvents from '#/hooks/useCommonEvents';
import { useGlobalIframeModal } from '#/hooks/useGlobalIframeModal';

// ==================== 组件属性定义 ====================
/**
 * 组件接收的属性定义
 * @property {string} actionType - 操作类型(add,copy,edit,view)
 * @property {any} initialData - 初始化数据
 * @property {Function} onSuccess - 操作成功回调函数
 */
const props = defineProps<{
  actionType?: 'add' | 'copy' | 'edit' | 'view';
  dataBind?: string;
  initialData?: any;
  onSuccess?: () => void;
  param?: Record<string, any>;
}>();

// ==================== 响应式数据 ====================
/** 数据ID */
const id = ref();

/** 防止关闭按钮重复点击的状态 */
const isClosing = ref(false);

/** 防止保存按钮重复点击的状态 */
const isSaving = ref(false);

/** 存储原始数据用于对比 */
const sourceData = ref<any>({});

// 获取公共事件处理函数
const { formEvents } = useCommonEvents();

// 创建一个模拟的formRef对象，用于传递给formEvents.handleFetchData
const formRef = {
  setValues: (values: any) => {
    try {
      // 设置表单值的逻辑
      id.value = values?.id || undefined;
      sourceData.value = values ? JSON.parse(JSON.stringify(values)) : {};

      // 处理Switch组件的初始值转换
      const processedData = {
        ...values,
        recDelFlag: values?.recDelFlag === '1',
      };

      baseInfoFormApi.setValues(processedData);
      remarkFormApi.setValues(values);
      auditFormApi.setValues(values);
    } catch (error) {
      console.error('设置表单值失败:', error);
    }
  },
  validate: (callback: (valid: boolean) => void) => {
    // 这个方法在 handleFetchData 中不会被调用，但为了满足接口要求需要提供
    callback(true);
  },
};

// ==================== 表单配置 ====================
/**
 * 基本信息表单配置
 * 包含主键、接口名、是否删除、路径、方法、耗时、用户代理、用户IP、创建人ID、token、创建人、创建时间、企业ID等字段
 */
const [BaseInfoForm, baseInfoFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  showDefaultActions: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入主键',
        disabled: true,
      },
      fieldName: 'id',
      label: '主键',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入接口名',
      },
      fieldName: 'apiNameTxt',
      label: '接口名',
      rules: 'required', // 必填校验
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto', // 调整Switch样式，不要撑满整个容器
      },
      fieldName: 'recDelFlag',
      label: '是否删除',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入路径',
      },
      fieldName: 'apiPathTxt',
      label: '路径',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入方法',
      },
      fieldName: 'apiMethodCode',
      label: '方法',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入耗时',
        class: 'w-full',
      },
      fieldName: 'costTimeNum',
      label: '耗时',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户代理',
      },
      fieldName: 'userAgentTxt',
      label: '用户代理',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户IP',
      },
      fieldName: 'userIpTxt',
      label: '用户IP',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入创建人ID',
      },
      fieldName: 'recCreateId',
      label: '创建人ID',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入token',
      },
      fieldName: 'loginTokenTxt',
      label: 'token',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入创建人',
        disabled: true,
      },
      fieldName: 'recCreateRef',
      label: '创建人',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入创建时间',
        disabled: true,
      },
      fieldName: 'recCreateDt',
      label: '创建时间',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入企业ID',
      },
      fieldName: 'recOrgId',
      label: '企业ID',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

/**
 * 备注表单配置
 */
const [RemarkForm, remarkFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'vertical',
  schema: [
    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
      },
      fieldName: 'recRemarksTxt',
      // 参考custom-layout.vue的方式，使用formItemClass让字段占满整个容器
      formItemClass: 'col-span-1 w-full',
    },
  ],
  wrapperClass: 'grid-cols-1 w-full',
});

/**
 * 创建与修改信息表单配置
 * 用于显示创建人、创建时间、修改人、修改时间等审计信息
 */
const [AuditForm, auditFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      componentProps: {
        disabled: true, // 禁用状态，仅用于展示
        placeholder: '请输入创建人',
      },
      fieldName: 'recCreateRef',
      label: '创建人',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true, // 禁用状态，仅用于展示
        placeholder: '请输入创建时间',
      },
      fieldName: 'recCreateDt',
      label: '创建时间',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true, // 禁用状态，仅用于展示
        placeholder: '请输入修改人',
      },
      fieldName: 'recUpdateRef',
      label: '修改人',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true, // 禁用状态，仅用于展示
        placeholder: '请输入修改时间',
      },
      fieldName: 'recUpdateDt',
      label: '修改时间',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

// ==================== 模态框操作 ====================
const { close } = useGlobalIframeModal();

// ==================== 全局操作函数 ====================
/**
 * 全局保存函数
 * 根据操作类型选择不同的接口进行数据保存
 */
async function handleSave() {
  // 防止重复点击
  if (isSaving.value) {
    return;
  }

  isSaving.value = true;

  try {
    // 验证所有表单
    const baseInfoValid = await baseInfoFormApi.validate();
    const remarkValid = await remarkFormApi.validate();
    const auditValid = await auditFormApi.validate();

    if (!baseInfoValid.valid || !remarkValid.valid || !auditValid.valid) {
      return;
    }

    // 获取所有表单的值
    const baseInfoValues = await baseInfoFormApi.getValues();
    const remarkValues = await remarkFormApi.getValues();
    const auditValues = await auditFormApi.getValues();

    // 处理Switch组件的值转换
    const processedBaseInfoValues = {
      ...baseInfoValues,
      recDelFlag: baseInfoValues.recDelFlag ? '1' : '0',
    };

    // 合并所有值，并确保包含id字段
    const values = {
      id: id.value, // 确保id字段存在
      ...processedBaseInfoValues,
      ...remarkValues,
      ...auditValues,
    };

    // 创建一个模拟的view对象，用于传递给formEvents.handleSave
    const view = {
      getFormRef: () => ({
        validate: (callback: (valid: boolean) => void) => {
          // 这里我们已经验证过了，直接返回true
          callback(true);
        },
      }),
      getFormData: () => values,
      getSourceData: () => sourceData.value,
      setFormData: (form: any, sourceData: any) => {
        // 不需要实现
      },
    };

    // 构造context对象
    const context = {
      actionType: props.actionType,
      saveConfig: {
        insertAction: '/lite/log/liteLogOper/insert',
        updateAction: '/lite/log/liteLogOper/update',
        insertSuccessMsg: '新增成功',
        updateSuccessMsg: '更新成功',
        copySuccessMsg: '拷贝成功',
      },
      afterSuccess: () => {
        props.onSuccess?.();
      },
    };

    // 使用useCommonEvents中的handleSave方法
    await formEvents.handleSave(view, context);
  } catch (error) {
    console.error('保存失败:', error);
    // 添加用户友好的错误提示
    message.error('保存失败，请稍后重试');
  } finally {
    isSaving.value = false;
  }
}

/**
 * 关闭模态框
 * 防止重复点击导致的问题
 */
function handleClose() {
  // 防止重复点击
  if (isClosing.value) {
    return;
  }

  isClosing.value = true;

  try {
    // 使用原有的close方法
    close();
  } finally {
    // 确保在下一个tick重置状态
    nextTick(() => {
      isClosing.value = false;
    });
  }
}

/**
 * 根据传入的props初始化表单数据
 * 统一使用 handleFetchData 作为数据获取入口
 */
async function initFromProps() {
  // 重置表单
  baseInfoFormApi.resetForm();
  remarkFormApi.resetForm();
  auditFormApi.resetForm();

  try {
    // 构造context对象，让useCommonEvents来处理数据获取逻辑
    const context = {
      dataBind: props.dataBind,
      param: props.param || {},
      initialData: props.initialData,
    };

    // 使用统一的数据获取入口
    await formEvents.handleFetchData(formRef, context);
  } catch (error) {
    console.error('初始化表单数据失败:', error);
  }
}

// 组件初始化时执行数据初始化
initFromProps();
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-bottom: 12px;
    "
  >
    <Button
      type="primary"
      @click="handleSave"
      :loading="isSaving"
      :disabled="isSaving"
      v-if="actionType !== 'view'"
    >
      保存
    </Button>
    <Button @click="handleClose" :disabled="isClosing"> 关闭 </Button>
  </div>

  <Card title="基本信息" class="mb-4">
    <BaseInfoForm />
  </Card>

  <Card title="备注" class="mb-4">
    <div class="w-full">
      <!-- 添加一个包装容器 -->
      <RemarkForm />
    </div>
  </Card>

  <Card title="创建与修改信息" class="mb-4">
    <AuditForm />
  </Card>
</template>

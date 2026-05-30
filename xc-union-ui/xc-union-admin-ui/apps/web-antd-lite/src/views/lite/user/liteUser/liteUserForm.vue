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
        recSysFlag: values?.recSysFlag === '1',
        recValidFlag: values?.recValidFlag === '1',
        hideFlag: values?.hideFlag === '1',
        updatePwdFlag: values?.updatePwdFlag === '1',
      };

      baseInfoFormApi.setValues(processedData);
      loginControlFormApi.setValues(values);
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
 * 包含用户账号、姓名、昵称、手机号、邮箱等字段
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
        placeholder: '请输入登录账号',
      },
      fieldName: 'loginCodeTxt',
      label: '登录账号',
      rules: 'required', // 必填校验
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: () => requestClient.post('/public/para/comList?classCode=SYS_USER_TYPE'),
        labelField: 'nameTxt',
        valueField: 'codeTxt',
        placeholder: '请选择用户类型',
      },
      fieldName: 'typeCode',
      label: '用户类型',
      rules: 'required', // 必填校验
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入姓名',
      },
      fieldName: 'nameTxt',
      label: '姓名',
      rules: 'required', // 必填校验
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户编码',
      },
      fieldName: 'codeTxt',
      label: '用户编码',
      rules: 'required', // 必填校验
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入昵称',
      },
      fieldName: 'nicknameTxt',
      label: '昵称',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      fieldName: 'emailTxt',
      label: '邮箱',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      fieldName: 'phoneTxt',
      label: '手机号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入微信',
      },
      fieldName: 'wechatTxt',
      label: '微信',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: () => requestClient.post('/public/para/comList?classCode=SYS_USER_GENDER_TYPE'),
        labelField: 'nameTxt',
        valueField: 'codeTxt',
        placeholder: '请选择性别',
      },
      fieldName: 'genderCode',
      label: '性别',
    },
    {
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择出生日期',
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD'
      },
      fieldName: 'birthdayDt',
      label: '出生日期',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入身份证',
      },
      fieldName: 'cnidTxt',
      label: '身份证',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入QQ',
      },
      fieldName: 'qqTxt',
      label: 'QQ',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入头像URL',
      },
      fieldName: 'avatarUrlTxt',
      label: '头像URL',
      formItemClass: 'col-span-2',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入名称首字母',
      },
      fieldName: 'firstLettersTxt',
      label: '名称首字母',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入名称全拼',
      },
      fieldName: 'fullLettersTxt',
      label: '名称全拼',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto', // 调整Switch样式，不要撑满整个容器
      },
      fieldName: 'hideFlag',
      label: '是否隐藏',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto', // 调整Switch样式，不要撑满整个容器
      },
      fieldName: 'recSysFlag',
      label: '是否系统保留',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序号',
        class: 'w-full',
      },
      fieldName: 'recSortNum',
      label: '排序号',
      rules: 'required', // 必填校验
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto', // 调整Switch样式，不要撑满整个容器
      },
      fieldName: 'recValidFlag',
      label: '是否有效',
    },
    // 隐藏字段 - 用于存储用户类型名称
    {
      component: 'Input',
      fieldName: 'typeRef',
      label: '用户类型名称',
      dependencies: {
        triggerFields: ['typeCode'],
        show: false, // 隐藏字段
      },
    },
    // 隐藏字段 - 用于存储性别名称
    {
      component: 'Input',
      fieldName: 'genderRef',
      label: '性别名称',
      dependencies: {
        triggerFields: ['genderCode'],
        show: false, // 隐藏字段
      },
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

/**
 * 登录控制信息表单配置
 */
const [LoginControlForm, loginControlFormApi] = useVbenForm({
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
        placeholder: '请输入最后登录时间',
      },
      fieldName: 'loginLastDt',
      label: '最后登录时间',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true, // 禁用状态，仅用于展示
        placeholder: '请输入最后登录IP',
      },
      fieldName: 'loginLastIp',
      label: '最后登录IP',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto', // 调整Switch样式，不要撑满整个容器
      },
      fieldName: 'updatePwdFlag',
      label: '密码修改标识',
    },
    {
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择注销时间',
        class: 'w-full',
        showTime: true,
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      fieldName: 'invalidDt',
      label: '注销时间',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: () => requestClient.post('/public/para/comList?classCode=SYS_USER_EFFECT_TYPE'),
        labelField: 'nameTxt',
        valueField: 'codeTxt',
        placeholder: '请选择生效类型',
      },
      fieldName: 'effectTypeCode',
      label: '生效类型',
    },
    {
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择生效时间',
        class: 'w-full',
        showTime: true,
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      fieldName: 'effectDt',
      label: '生效时间',
    },
    // 隐藏字段 - 用于存储生效类型名称
    {
      component: 'Input',
      fieldName: 'effectTypeRef',
      label: '生效类型名称',
      dependencies: {
        triggerFields: ['effectTypeCode'],
        show: false, // 隐藏字段
      },
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
    const loginControlValid = await loginControlFormApi.validate();
    const remarkValid = await remarkFormApi.validate();
    const auditValid = await auditFormApi.validate();

    if (!baseInfoValid.valid || !loginControlValid.valid || !remarkValid.valid || !auditValid.valid) {
      return;
    }

    // 获取所有表单的值
    const baseInfoValues = await baseInfoFormApi.getValues();
    const loginControlValues = await loginControlFormApi.getValues();
    const remarkValues = await remarkFormApi.getValues();
    const auditValues = await auditFormApi.getValues();

    // 处理Switch组件的值转换
    const processedBaseInfoValues = {
      ...baseInfoValues,
      recSysFlag: baseInfoValues.recSysFlag ? '1' : '0',
      recValidFlag: baseInfoValues.recValidFlag ? '1' : '0',
      hideFlag: baseInfoValues.hideFlag ? '1' : '0',
    };

    const processedLoginControlValues = {
      ...loginControlValues,
      updatePwdFlag: loginControlValues.updatePwdFlag ? '1' : '0',
    };

    // 合并所有值，并确保包含id字段
    const values = {
      id: id.value, // 确保id字段存在
      ...processedBaseInfoValues,
      ...processedLoginControlValues,
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
        insertAction: '/lite/user/liteUser/insert',
        updateAction: '/lite/user/liteUser/update',
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
  loginControlFormApi.resetForm();
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

  <Card title="登录控制信息" class="mb-4">
    <LoginControlForm />
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

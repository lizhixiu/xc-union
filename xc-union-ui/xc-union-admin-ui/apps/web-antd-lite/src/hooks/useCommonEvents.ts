import { message, Modal } from 'ant-design-vue';

import { xcClient } from '#/api/request';

// 定义上下文类型
interface Context {
  confirmMsg?: string;
  successMsg?: string;
  deleteAction?: string;
  postAction?: string;
  param?: Record<string, any>;
  afterSuccess?: (respContext?: any) => void;
  dataBind?: string;
  title?: string;
  src?: string;
  actionType?: string;
  initialData?: any;
  saveConfig?: {
    copySuccessMsg?: string;
    insertAction?: string;
    insertSuccessMsg?: string;
    postAction?: string;
    postSuccessMsg?: string;
    updateAction?: string;
    updateSuccessMsg?: string;
  };
  updateParamsKey?: string[];
}

// 定义视图接口
interface View {
  getFormRef: () => any;
  getFormData: () => any;
  getSourceData: () => any;
  setFormData: (form: any, sourceData: any) => void;
}

// 定义表单引用接口
interface FormRef {
  validate: (callback: (valid: boolean) => void) => void;
  setValues: (values: any) => void;
}

// 定义iframe modal接口
interface IframeModal {
  open: (options: any) => void;
  close: () => void;
}

// 定义成功回调接口
// 统一处理API响应结果
const handleApiResponse = (
  res: any,
  successMsg: string,
  errorMsg: string,
  onSuccess?: (respContext: any) => void,
) => {
  if (res && res.data && res.data.code === 200) {
    message.success(successMsg);
    if (typeof onSuccess === 'function') {
      try {
        const respContext = { res };
        onSuccess(respContext);
      } catch (error) {
        console.warn(error);
      }
    }
    return true;
  } else if (res && res.data && res.data.code !== 200) {
    const apiErrorMsg = res?.data?.message || res?.data?.msg || '操作失败';;
    console.error('API Error:', res);
    message.error(`${errorMsg}: ${apiErrorMsg}`);
    return false;
  }
  return false;
};

// 统一处理API错误
const handleApiError = (error: any, defaultMsg: string) => {
  // console.error(defaultMsg + ':', error);
  const errorMsg =
    error?.response?.data?.message || error?.message || defaultMsg;
  message.error(`${defaultMsg}: ${errorMsg}`);
};

const useCommonEvents = (iframeModal?: IframeModal) => {
  // 表单相关事件
  const formEvents = {
    // 获取表单数据
    handleFetchData: async (formRef: FormRef, context: Context) => {
      // 优化：即使没有 dataBind 也应该处理 initialData
      if (context.dataBind) {
        try {
          const res = await xcClient.post(
            context.dataBind,
            context.param || {},
          );
          if (res && res.data && res.data.code === 200) {
            const form = res.data.data;
            formRef.setValues(form);
          } else {
            message.error(res?.msg || '获取数据失败');
          }
        } catch (error) {
          console.error('获取表单数据失败:', error);
          message.error('获取数据失败');
        }
      }
      // 如果没有 dataBind 但有 initialData，也应该处理
      else if (context.initialData) {
        formRef.setValues(context.initialData);
      }
    },

    // 批量删除
    handleBatchDelete: (context: Context) => {
      Modal.confirm({
        title: '提示',
        content: context.confirmMsg || '确定删除选中记录吗？',
        onOk: async () => {
          if (context.deleteAction) {
            try {
              const res = await xcClient.post(
                context.deleteAction,
                context.param || {},
              );
              handleApiResponse(
                res,
                context.successMsg || '删除成功',
                '删除失败',
                context.afterSuccess,
              );
            } catch (error: any) {
              handleApiError(error, '删除失败');
            }
          }
        },
      });
    },

    // 删除单条记录
    handleDelete: (context: Context = {}) => {
      Modal.confirm({
        title: '提示',
        content: context.confirmMsg || '确定删除记录吗？',
        onOk: async () => {
          if (context.deleteAction) {
            try {
              const res = await xcClient.post(
                context.deleteAction,
                context.param || {},
              );
              handleApiResponse(
                res,
                context.successMsg || '删除成功',
                '删除失败',
                context.afterSuccess,
              );
            } catch (error: any) {
              handleApiError(error, '删除失败');
            }
          }
        },
      });
    },

    // 内部POST请求
    handleInnerPost: async (context: Context) => {
      if (context.postAction) {
        try {
          const res = await xcClient.post(
            context.postAction,
            context.param || {},
          );
          handleApiResponse(
            res,
            context.successMsg || '执行操作成功',
            '执行操作失败',
            context.afterSuccess,
          );
        } catch (error: any) {
          handleApiError(error, '执行操作失败');
        }
      }
    },

    // POST请求（带确认框）
    handlePost: (context: Context) => {
      if (context.confirmMsg) {
        Modal.confirm({
          title: '提示',
          content: context.confirmMsg || '确定执行操作吗？',
          onOk: async () => {
            await formEvents.handleInnerPost(context);
          },
        });
      } else {
        formEvents.handleInnerPost(context);
      }
    },

    // 对比数据，找出有变化的字段
    getChangedData: (
      sourceData: Record<string, any>,
      formData: Record<string, any>,
    ) => {
      const changedData: Record<string, any> = {};
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const formValue = formData[key];
          const sourceValue = sourceData[key];
          if (JSON.stringify(formValue) !== JSON.stringify(sourceValue)) {
            changedData[key] = formValue;
          }
        }
      }
      return changedData;
    },

    // 保存表单数据
    handleSave: async (view: View, context: Context = {}) => {
      if (!context.actionType) {
        message.error('未指定操作类型');
        return;
      }

      const formRef = view.getFormRef();
      const actionType =
        context.actionType === '' ? 'view' : context.actionType;
      const saveConfig = context.saveConfig;

      let url = '';
      let successMsg = '';

      switch (actionType) {
        case 'add': {
          if (saveConfig?.insertSuccessMsg)
            successMsg = saveConfig.insertSuccessMsg;
          if (saveConfig?.insertAction) url = saveConfig.insertAction;
          break;
        }
        case 'copy': {
          if (saveConfig?.copySuccessMsg)
            successMsg = saveConfig.copySuccessMsg;
          if (saveConfig?.insertAction) url = saveConfig.insertAction;
          break;
        }
        case 'edit': {
          if (saveConfig?.updateSuccessMsg)
            successMsg = saveConfig.updateSuccessMsg;
          if (saveConfig?.updateAction) url = saveConfig.updateAction;
          break;
        }
        case 'post': {
          if (saveConfig?.postSuccessMsg)
            successMsg = saveConfig.postSuccessMsg;
          if (saveConfig?.postAction) url = saveConfig.postAction;
          break;
        }
        default: {
          break;
        }
      }

      if (url === '') {
        message.error('未配置接口参数');
        return;
      }

      // 使用 Promise 包装 validate 方法以支持 async/await
      const validateForm = (): Promise<boolean> => {
        return new Promise((resolve) => {
          formRef.validate((valid: boolean) => {
            resolve(valid);
          });
        });
      };

      try {
        const valid = await validateForm();
        if (!valid) {
          message.warning('请填写完整信息');
          return;
        }

        let dataToSubmit: Record<string, any> = {};
        if (
          actionType === 'add' ||
          actionType === 'copy' ||
          actionType === 'post'
        ) {
          // 新增或拷贝操作提交完整表单数据
          dataToSubmit = view.getFormData();
        } else if (actionType === 'edit') {
          dataToSubmit = formEvents.getChangedData(
            view.getSourceData(),
            view.getFormData(),
          );
          // 如果没有变化，提示用户并返回
          if (Object.keys(dataToSubmit).length === 0) {
            message.info('数据未发生变化，无需提交');
            return;
          }

          // 编辑操作提交主键ID
          dataToSubmit.id = view.getFormData().id;

          if (context.updateParamsKey) {
            context.updateParamsKey.forEach((key) => {
              dataToSubmit[key] = view.getFormData()[key];
            });
          }
        }

        const res = await xcClient.post(url, dataToSubmit);
        if (res && res.data && res.data.code === 200) {
          message.success(successMsg || '操作成功');
          // 成功后回调刷新
          if (typeof context.afterSuccess === 'function') {
            try {
              const respContext = { actionType, res };
              context.afterSuccess(respContext);
            } catch (error) {
              console.warn(error);
            }
          }
        } else {
          // 提供更详细的错误信息
          const errorMsg = res?.data?.message || res?.data?.msg || '操作失败';
          console.error('API Error:', res);
          message.error(`操作失败: ${errorMsg}`);
        }
      } catch (error: any) {
        console.error('保存失败:', error);
        // 提供更详细的错误信息
        const errorMsg =
          error?.response?.data?.message || error?.message || '操作失败';
        message.error(`操作失败: ${errorMsg}`);
      }
    },
  };

  // 弹窗相关事件
  const layEvents = {
    // 公共的打开表单方法
    openFormWithData: (
      data: any,
      actionType: 'add' | 'copy' | 'edit' | 'view',
      options: {
        mode?: 'drawer' | 'modal'; // 添加 mode 参数
        onSuccess?: () => void;
        src: string;
        titleMap?: Record<string, string>;
        width?: number | string; // 添加 width 参数
      },
    ) => {
      if (!iframeModal) {
        console.warn('iframeModal未提供，无法打开表单');
        return;
      }

      const titleMap: Record<string, string> = {
        add: '新增',
        view: '详情',
        edit: '编辑',
        copy: '拷贝',
        ...options.titleMap,
      };

      const title = actionType
        ? titleMap[actionType]
        : data?.id
          ? titleMap.edit
          : titleMap.add;

      // 默认使用 modal 模式，宽度至少 80%
      const mode = options.mode ?? 'modal';
      // 使用 80vw 确保宽度是视口宽度的 80%
      const width = options.width ?? '80vw';

      iframeModal.open({
        title,
        src: options.src,
        mode,
        placement: 'right',
        width,
        props: {
          initialData: data,
          actionType,
          onSuccess: options.onSuccess,
        },
      });
    },

    // 基于 context 打开表单（先获取数据再打开）
    handleOpen: async (context: Context) => {
      if (!iframeModal) {
        console.warn('iframeModal 未提供');
        return;
      }

      // 优化：统一使用 handleFetchData 来处理数据获取
      try {
        // 构造formRef对象用于数据获取
        let fetchedData: any = null;
        let hasData = false;

        // 创建一个临时的formRef用于数据获取
        const tempFormRef = {
          setValues: (values: any) => {
            fetchedData = values;
            hasData = true;
          },
          validate: (callback: (valid: boolean) => void) => {
            callback(true);
          },
        };

        // 尝试获取数据
        if (context.dataBind || context.initialData) {
          await formEvents.handleFetchData(tempFormRef, context);
        }

        // 使用获取到的数据或默认数据打开表单
        const dataToUse = hasData ? fetchedData : context.initialData || {};

        layEvents.openFormWithData(dataToUse, context.actionType as any, {
          titleMap: context.title
            ? { [context.actionType || 'add']: context.title }
            : undefined,
          src: context.src || '',
          onSuccess: context.afterSuccess,
          // 默认使用 modal 模式，如果需要使用 drawer，可以在 context 中指定
          mode: (context as any).mode,
          width: (context as any).modalWidth || (context as any).width,
        });
      } catch (error) {
        console.error('处理表单打开失败:', error);
        message.error('处理表单打开失败');
      }
    },
  };

  // 基础事件
  const baseEvents = {
    // 处理刷新
    handleRefresh: (ref: any) => {
      if (ref && typeof ref.refresh === 'function') {
        ref.refresh();
      } else if (ref && typeof ref.reload === 'function') {
        ref.reload();
      }
    },
  };

  return {
    formEvents,
    layEvents,
    baseEvents,
  };
};

export default useCommonEvents;

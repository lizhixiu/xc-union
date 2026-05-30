import type { VbenFormSchema } from '#/adapter/form';

export const useGridFormSchema = (): VbenFormSchema[] => {
  return [
    {
      component: 'Input',
      fieldName: 'nameTxt',
      label: '配置名称',
      componentProps: {
        placeholder: '请输入配置名称',
      },
    },
    {
      component: 'Input',
      fieldName: 'codeTxt',
      label: '配置编码',
      componentProps: {
        placeholder: '请输入配置编码',
      },
    },
  ];
};

export const useFormSchema = (): VbenFormSchema[] => {
  return [
    {
      component: 'Input',
      fieldName: 'nameTxt',
      label: '配置名称',
      componentProps: {
        placeholder: '请输入配置名称',
      },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'codeTxt',
      label: '配置编码',
      componentProps: {
        placeholder: '请输入配置编码',
      },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'valueTxt',
      label: '配置值',
      componentProps: {
        placeholder: '请输入配置值',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'recSortNum',
      label: '排序号',
      componentProps: {
        placeholder: '请输入排序号',
      },
    },
  ];
};
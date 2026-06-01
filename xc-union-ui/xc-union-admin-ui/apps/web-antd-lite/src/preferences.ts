import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
  theme: {
    /**
     * 浅色sidebar
     */
    mode: "light",
    /**
     * 圆角大小 换算比例为1.6px = 0.1radius
     * 这里为6px 与antd保持一致
     */
    radius: '0.375',
  },
});

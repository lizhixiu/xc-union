// 定义工具栏按钮类型
export interface ToolbarButton {
  key: string;
  text: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' | 'danger';
  icon?: string;
  ghost?: boolean;
  disabled?: boolean | (() => boolean);
  onClick?: (row?: any) => void;
}

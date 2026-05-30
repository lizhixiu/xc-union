// 主题配置
// 每个主题需要导出以下页面组件:
// - HomePage, GoodPricePage, TmallSalePage, TmallGlobalSalePage
// - BrandSaleRankPage, TaobaoFlashSalePage, CheckinRewardPage
// - BillionSubsidyPage, ProductDetailPage, RewardActivityPage
// - MessageBoxPage, QueryGoodsPage

const themes = {
  'xc-union': {
    name: '轻购',
    description: '默认主题',
    load: () => import('./xc-union/pages')
  },
  // 新增主题示例:
  // 'xc-union-v2': {
  //   name: '轻购V2',
  //   description: '新版主题',
  //   load: () => import('./xc-union-v2/pages')
  // },
};

export default themes;

export function getThemeList() {
  return Object.entries(themes).map(([key, config]) => ({
    key,
    name: config.name,
    description: config.description
  }));
}

export function getDefaultTheme() {
  return Object.keys(themes)[0];
}

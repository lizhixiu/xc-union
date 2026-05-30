// 主题配置
// 每个主题需要定义每个页面的 lazy load 函数

const themes = {
  'xc-union': {
    name: '轻购',
    description: '默认主题',
    pages: {
      HomePage: () => import('./xc-union/pages/HomePage'),
      GoodPricePage: () => import('./xc-union/pages/GoodPricePage'),
      TmallSalePage: () => import('./xc-union/pages/TmallSalePage'),
      TmallGlobalSalePage: () => import('./xc-union/pages/TmallGlobalSalePage'),
      BrandSaleRankPage: () => import('./xc-union/pages/BrandSaleRankPage'),
      TaobaoFlashSalePage: () => import('./xc-union/pages/TaobaoFlashSalePage'),
      CheckinRewardPage: () => import('./xc-union/pages/CheckinRewardPage'),
      BillionSubsidyPage: () => import('./xc-union/pages/BillionSubsidyPage'),
      ProductDetailPage: () => import('./xc-union/pages/ProductDetailPage'),
      RewardActivityPage: () => import('./xc-union/pages/RewardActivityPage'),
      MessageBoxPage: () => import('./xc-union/pages/MessageBoxPage'),
      QueryGoodsPage: () => import('./xc-union/pages/QueryGoodsPage'),
    }
  },
  // 新增主题示例:
  // 'xc-union-v2': {
  //   name: '轻购V2',
  //   description: '新版主题',
  //   pages: {
  //     HomePage: () => import('./xc-union-v2/pages/HomePage'),
  //     GoodPricePage: () => import('./xc-union-v2/pages/GoodPricePage'),
  //     // ... 其他页面
  //   }
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

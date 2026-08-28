import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Leaf, MagnifyingGlass, User } from '@phosphor-icons/react';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import MailboxAuthPanel from './components/MailboxAuthPanel';
import ParseChatPage from './components/ParseChatPage';
import { isLoggedIn, onAuthChanged } from './utils/auth';
import { useTheme } from './contexts/ThemeContext';

const PARSE_API_URL = '/dtk/tbService/parseContent';
const APP_BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const IS_DEV = import.meta.env.DEV;
const USE_HASH_ROUTING = !IS_DEV;

function withBase(path) {
  if (!path.startsWith('/')) {
    return path;
  }
  if (!APP_BASE || APP_BASE === '/') {
    return path;
  }
  return `${APP_BASE}${path}`;
}

function getAppPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  const pathname = window.location.pathname;
  const normalizedPathname = APP_BASE && APP_BASE !== '/'
    ? (pathname === APP_BASE ? '/' : pathname.startsWith(`${APP_BASE}/`) ? pathname.slice(APP_BASE.length) : pathname)
    : pathname;

  if (USE_HASH_ROUTING) {
    const hash = window.location.hash || '';
    const hashPath = hash.startsWith('#') ? hash.slice(1) : hash;
    return hashPath.startsWith('/') ? hashPath : (normalizedPathname.startsWith('/') ? normalizedPathname : '/');
  }

  return normalizedPathname.startsWith('/') ? normalizedPathname : '/';
}

function navigateTo(path) {
  if (USE_HASH_ROUTING) {
    const isAtAppRoot = !APP_BASE || APP_BASE === '/'
      ? window.location.pathname === '/'
      : window.location.pathname === APP_BASE || window.location.pathname === `${APP_BASE}/`;
    if (!isAtAppRoot) {
      const appRoot = APP_BASE && APP_BASE !== '/' ? `${APP_BASE}/` : '/';
      window.location.assign(`${appRoot}#${path}`);
      return;
    }
    window.location.hash = path;
    return;
  }
  window.location.assign(withBase(path));
}

function navigateToRebateTool() {
  if (USE_HASH_ROUTING) {
    window.location.hash = '/rebate/tool';
    return;
  }

  window.history.pushState({}, '', withBase('/rebate/tool'));
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function toNumber(value) {
  const n = Number.parseFloat(String(value ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function formatChatTime(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getMonth() + 1}月${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function extractParseData(resp) {
  return resp?.data?.data?.data ?? resp?.data?.data ?? resp?.data ?? {};
}

function mapParseItem(raw = {}) {
  const originPrice = toNumber(raw?.originInfo?.price ?? raw?.price);
  const threshold = toNumber(raw?.originInfo?.startFee);
  const couponAmount = toNumber(raw?.originInfo?.amount);
  const commissionRate = toNumber(raw?.commissionRate);
  const finalPrice = Math.max(originPrice - couponAmount, 0);
  const payablePrice = finalPrice || originPrice;

  return {
    id: raw.goodsId ?? raw.itemId ?? `${raw.itemName || raw.title || Math.random()}`,
    title: raw.itemName || raw?.originInfo?.title || '未命名商品',
    image: raw.mainPic || raw?.originInfo?.image || '',
    shopName: raw?.originInfo?.shopName || raw?.shopName || '',
    sales: raw?.originInfo?.monthSales || raw?.monthSales || raw?.originInfo?.sales || '',
    coupon: couponAmount > 0
      ? (threshold > 0 ? `满${toCurrency(threshold)}减${toCurrency(couponAmount)}` : `立减 ¥${toCurrency(couponAmount)}`)
      : '暂无优惠券',
    couponAmount,
    price: toCurrency(payablePrice),
    original: `¥${toCurrency(originPrice)}`,
    rebate: toCurrency((payablePrice * commissionRate) / 100),
    commissionRate,
    desc: raw.desc ?? raw.description ?? raw.itemDesc ?? raw?.originInfo?.desc ?? '',
    cpsFullTpwd: raw.cpsFullTpwd || '',
    couponLongUrl: raw.couponLongUrl || '',
    shortUrl: raw.shortUrl || '',
    itemLink: raw.itemLink || raw.shortUrl || raw.originUrl || ''
  };
}

function openProductDetail(payload) {
  try {
    sessionStorage.setItem('xc_union_selected_product', JSON.stringify(payload || {}));
  } catch {
    // ignore
  }
  navigateTo('/product-detail');
}

async function copyTextWithFallback(text) {
  if (!text) {
    return false;
  }

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback to execCommand below
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function App() {
  const { themePages } = useTheme();
  const [appPathname, setAppPathname] = useState(() => getAppPathname());
  const isGoodPriceRoute = appPathname === '/good-price';
  const isTmallSaleRoute = appPathname === '/tmall-sale';
  const isTmallGlobalSaleRoute = appPathname === '/tmall-global-sale';
  const isBrandSaleRoute = appPathname === '/brand-sale';
  const isFlashSaleRoute = appPathname === '/flash-sale';
  const isCheckinRewardRoute = appPathname === '/checkin-reward';
  const isRewardActivityRoute = appPathname === '/reward-activity';
  const isMessageBoxRoute = appPathname === '/message-box';
  const isBillionSubsidyRoute = appPathname === '/billion-subsidy';
  const isRebateToolRoute = appPathname === '/rebate/tool';
  const isProductDetailRoute = appPathname === '/product-detail';
  const isQueryGoodsRoute = appPathname === '/query-goods';
  const [page, setPage] = useState('home');
  const [footprintTab, setFootprintTab] = useState('查券');
  const [footprintTabGroups, setFootprintTabGroups] = useState([]);
  const [toast, setToast] = useState('');

  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingAuthAction, setPendingAuthAction] = useState(null);
  const [postLoginRoute, setPostLoginRoute] = useState('');
  const chatMessageCounter = useRef(0);

  useEffect(() => {
    const syncRoute = () => {
      const nextPath = getAppPathname();
      setAppPathname(nextPath);
      if (nextPath === '/') {
        setPage('home');
      }
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthChanged(() => {
      setPendingAuthAction((prev) => {
        if (!prev || !isLoggedIn()) return prev;
        try {
          prev();
        } finally {
          return null;
        }
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const cached = sessionStorage.getItem('xc_union_post_login_route') || '';
      setPostLoginRoute(cached);
    } catch {
      setPostLoginRoute('');
    }
  }, []);

  useEffect(() => {
    if (appPathname !== '/') return;
    try {
      const forceProfile = sessionStorage.getItem('xc_union_force_profile_tab') === '1';
      if (!forceProfile) return;
      sessionStorage.removeItem('xc_union_force_profile_tab');
      setPage('profile');
    } catch {
      // ignore
    }
  }, [appPathname]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const ensureLogin = (action, message = '请先登录后再操作') => {
    if (isLoggedIn()) {
      action?.();
      return true;
    }
    setPendingAuthAction(() => action);
    const route = appPathname || '/';
    try {
      if (route !== '/') {
        sessionStorage.setItem('xc_union_post_login_route', route);
        setPostLoginRoute(route);
      } else {
        sessionStorage.removeItem('xc_union_post_login_route');
        setPostLoginRoute('');
      }
      sessionStorage.setItem('xc_union_force_profile_tab', '1');
    } catch {
      // ignore
    }
    if (appPathname !== '/') {
      navigateTo('/');
    }
    setPage('profile');
    showToast(message);
    return false;
  };

  useEffect(() => {
    const protectedRoutes = new Set(['/message-box', '/reward-activity', '/checkin-reward']);
    if (!protectedRoutes.has(appPathname)) return;
    if (isLoggedIn()) return;
    try {
      sessionStorage.setItem('xc_union_post_login_route', appPathname);
      setPostLoginRoute(appPathname);
      sessionStorage.setItem('xc_union_force_profile_tab', '1');
    } catch {
      // ignore
    }
    if (appPathname !== '/') {
      navigateTo('/');
    }
    setPage('profile');
    showToast('请先登录后访问该页面');
  }, [appPathname]);

  const requestParse = async (content) => {
    const parsedContent = (content || '').trim();
    if (!parsedContent) {
      showToast('请输入内容');
      return;
    }

    const nextMessageId = () => `${Date.now()}-${++chatMessageCounter.current}`;
    const replyId = nextMessageId();
    const sentAt = formatChatTime();
    if (appPathname !== '/rebate/tool') {
      navigateToRebateTool();
    }
    setPage('detail');
    setChatMessages((previous) => [
      ...previous,
      { id: nextMessageId(), type: 'timestamp', content: sentAt },
      { id: nextMessageId(), type: 'user', content: parsedContent },
      { id: replyId, type: 'bot', content: '找到啦！正在帮你查询优惠和返利...' }
    ]);
    setLoading(true);
    try {
      const resp = await fetch(PARSE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: parsedContent })
      });
      if (!resp.ok) {
        throw new Error(`解析接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const parsed = extractParseData(json);
      if (!parsed || typeof parsed !== 'object' || (!parsed.itemName && !parsed?.originInfo?.title && !parsed.goodsId && !parsed.itemId)) {
        throw new Error(json?.msg || json?.data?.msg || '未识别到商品信息');
      }
      const mapped = mapParseItem(parsed);
      const couponMessage = mapped.couponAmount > 0
        ? { id: nextMessageId(), type: 'coupon', product: mapped }
        : null;

      setChatMessages((previous) => {
        const updated = previous.map((message) => (
          message.id === replyId ? { id: replyId, type: 'product', product: mapped } : message
        ));

        return couponMessage ? [...updated, couponMessage] : updated;
      });
    } catch (e) {
      const message = e.message || '解析失败';
      setChatMessages((previous) => previous.map((item) => (
        item.id === replyId ? { id: replyId, type: 'bot', content: `暂时没有识别到商品信息：${message}` } : item
      )));
      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToken = async (product, action = 'buy') => {
    const content = product?.cpsFullTpwd || product?.itemLink || product?.shortUrl;
    if (!content) {
      showToast('暂无可复制内容');
      return;
    }
    const copied = await copyTextWithFallback(content);
    if (copied) {
      showToast(action === 'share' ? '口令已复制，可粘贴分享给好友' : '已复制，请前往淘宝打开');
    } else {
      showToast('复制失败，请手动长按复制');
    }
  };

  const activeDesktopNav = useMemo(() => (page === 'detail' ? 'home' : page), [page]);
  const footprintImages = [
    'https://img.alicdn.com/bao/uploaded/i2/2217402909158/O1CN01dMZ5Wx2HWQIOb1fM0_!!2217402909158.jpg',
    'https://img.alicdn.com/bao/uploaded/i3/2219113300539/O1CN01AoiRFw1FquZDcbMh6_!!4611686018427380283-0-item_pic.jpg',
    'https://img.alicdn.com/bao/uploaded/i4/2216944218317/O1CN01YIG2ax2BJFD1mzttl_!!4611686018427384013-0-item_pic.jpg'
  ];
  const footprintGroups = [
    {
      date: '05月17日',
      items: [
        { id: 1, shop: '丹娜丝芊紫专卖店', title: '悬挂抽纸可湿水整箱实惠装', price: '3.66', originalPrice: '9.90', rebate: '1.35', coupon: '' },
        { id: 2, shop: '天猫超市', title: 'Pigeon贝亲桃叶洗发沐浴植物洗净', price: '34.69', originalPrice: '59.00', rebate: '1.82', coupon: '券 20元' },
        { id: 3, shop: '阿里健康大药房', title: '【自营】多维元素补充片', price: '84.85', originalPrice: '129.00', rebate: '2.17', coupon: '' }
      ]
    },
    {
      date: '05月16日',
      items: [
        { id: 4, shop: '薄爱旗舰店', title: '超薄避孕套4盒组合装', price: '9.90', originalPrice: '29.90', rebate: '0.98', coupon: '券 10元' },
        { id: 5, shop: '国货严选企业工厂店', title: '蓝帽认证肉碱茶多酚胶囊', price: '29.90', originalPrice: '69.90', rebate: '2.54', coupon: '' }
      ]
    },
    {
      date: '05月15日',
      items: [
        { id: 6, shop: '瑞幸即享咖啡旗舰店', title: '浓缩咖啡液32杯无糖黑咖啡', price: '44.70', originalPrice: '69.00', rebate: '4.47', coupon: '' },
        { id: 7, shop: 'bobdoghouse童鞋旗舰店', title: '儿童防蚊裤夏季透气两条装', price: '19.90', originalPrice: '39.90', rebate: '0.72', coupon: '券 5元' }
      ]
    }
  ];

  const randomizeFootprintGroups = () => {
    const shifted = footprintGroups.map((group) => {
      const items = [...group.items];
      items.sort(() => Math.random() - 0.5);
      const selected = items.slice(0, Math.max(1, Math.floor(Math.random() * items.length) + 1));
      return {
        ...group,
        items: selected.map((item) => {
          const priceBase = Number(item.price || 0);
          const delta = (Math.random() * 2 - 1) * 0.8;
          const nextPrice = Math.max(0.5, priceBase + delta);
          return {
            ...item,
            price: nextPrice.toFixed(2)
          };
        })
      };
    });
    setFootprintTabGroups(shifted);
  };

  useEffect(() => {
    randomizeFootprintGroups();
  }, []);

  if (!themePages) {
    return <div className="h-screen flex items-center justify-center">主题加载失败</div>;
  }

  const {
    HomePage: ThemeHomePage,
    GoodPricePage: ThemeGoodPricePage,
    TmallSalePage: ThemeTmallSalePage,
    TmallGlobalSalePage: ThemeTmallGlobalSalePage,
    BrandSaleRankPage: ThemeBrandSaleRankPage,
    TaobaoFlashSalePage: ThemeTaobaoFlashSalePage,
    CheckinRewardPage: ThemeCheckinRewardPage,
    BillionSubsidyPage: ThemeBillionSubsidyPage,
    ProductDetailPage: ThemeProductDetailPage,
    RewardActivityPage: ThemeRewardActivityPage,
    MessageBoxPage: ThemeMessageBoxPage,
    QueryGoodsPage: ThemeQueryGoodsPage,
  } = themePages;

  if (isGoodPriceRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeGoodPricePage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isTmallSaleRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeTmallSalePage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isTmallGlobalSaleRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeTmallGlobalSalePage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isBrandSaleRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeBrandSaleRankPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isFlashSaleRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeTaobaoFlashSalePage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isCheckinRewardRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeCheckinRewardPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isRewardActivityRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeRewardActivityPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isMessageBoxRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeMessageBoxPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isBillionSubsidyRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeBillionSubsidyPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isRebateToolRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="app-wrapper chat-layout">
          <ParseChatPage
            messages={chatMessages}
            isParsing={loading}
            onParse={requestParse}
            onBack={() => {
              setPage('home');
              navigateTo('/');
            }}
            onAction={handleCopyToken}
          />
        </div>
      </Suspense>
    );
  }

  if (isProductDetailRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeProductDetailPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  if (isQueryGoodsRoute) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
        <div className="h-screen bg-appBg overflow-hidden">
          <div className="max-w-[1200px] mx-auto md:px-8 h-full overflow-hidden">
            <ThemeQueryGoodsPage standalone />
          </div>
        </div>
      </Suspense>
    );
  }

  return (
    <>
      {page !== 'detail' && (
      <header className="hidden md:flex bg-cardWhite border-b border-borderLine sticky top-0 z-50 h-[72px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <h1 className="text-[22px] font-bold text-textMain tracking-wide flex items-center gap-2"><Leaf size={22} className="text-primary" />轻购</h1>
          <nav className="flex gap-6">
            {['home', 'rank', 'profile'].map((n) => (
              <button
                key={n}
                onClick={() => (n === 'rank' ? navigateTo('/good-price') : setPage(n))}
                className={`text-[15px] py-6 ${activeDesktopNav === n ? 'font-medium text-primary border-b-2 border-primary' : 'text-textMuted hover:text-textMain'}`}
              >
                {n === 'home' ? '首页' : n === 'rank' ? '好价' : '我'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage('profile')}
            aria-label="打开资产管理"
            className="w-10 h-10 rounded-full border border-borderLine flex items-center justify-center bg-appBg text-primary hover:bg-primaryLight transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </header>
      )}

      <div className={`app-wrapper ${page === 'detail' ? 'chat-layout' : 'md:px-8'}`}>
        {page === 'home' && (
          <Suspense fallback={<div className="h-screen flex items-center justify-center">加载中...</div>}>
            <ThemeHomePage onParse={requestParse} isParsing={loading} />
          </Suspense>
        )}

        {page === 'footprint' && (
          <section className="page px-0 md:px-0 md:py-8 pb-[80px] bg-white">
            <div className="bg-white px-0 pt-0 pb-2">
              <div className="rounded-none bg-gradient-to-r from-[#F8EDE8] via-[#F8EBE8] to-[#F6E6E9] px-3 pt-3 pb-0">
                <div className="flex items-center gap-2">
                  <div className="text-[20px] font-bold text-[#222222] shrink-0">足迹返利</div>
                  <div className="h-10 bg-white rounded-xl px-2 flex items-center gap-1.5 flex-1 min-w-0">
                    <MagnifyingGlass size={16} className="text-[#B0B4BB] shrink-0" />
                    <input className="flex-1 min-w-0 text-[14px] text-[#111111] placeholder:text-[#B0B4BB] outline-none bg-transparent" placeholder="搜索商品" />
                    <button className="h-8 px-4 rounded-lg bg-[#FF3A3A] text-white text-[14px] font-semibold shrink-0">搜索</button>
                  </div>
                  <button className="shrink-0 text-[13px] text-[#333333] leading-none">攻略</button>
                </div>
                <div className="mt-3 grid grid-cols-3 h-10">
                  {['查券', '足迹', '收藏夹'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setFootprintTab(tab);
                        randomizeFootprintGroups();
                      }}
                      className="h-10 flex flex-col items-center justify-center relative"
                    >
                      <span className={`text-[14px] ${footprintTab === tab ? 'text-[#111111] font-bold' : 'text-[#666666]'}`}>{tab}</span>
                      {footprintTab === tab ? <span className="absolute bottom-0 h-[3px] w-5 rounded-full bg-[#FF3A3A]" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-0 pb-3 space-y-2.5 bg-white">
              <div className="px-3 space-y-3">
                {(footprintTabGroups.length > 0 ? footprintTabGroups : footprintGroups).map((group) => (
                  <div key={group.date} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-3.5 rounded-sm bg-[#FF0036] shrink-0" />
                      <span className="text-[16px] text-[#333333] font-bold leading-none">{group.date}</span>
                    </div>
                    {group.items.map((item, idx) => (
                      <button
                        type="button"
                        onClick={() =>
                          openProductDetail({
                            source: 'footprint',
                            ...item,
                            image: footprintImages[(item.id + idx) % footprintImages.length]
                          })
                        }
                        key={item.id}
                        className="w-full text-left bg-white rounded-2xl border border-[#EBEDF1] p-2 flex gap-2 items-stretch"
                      >
                        <div className="w-[88px] rounded-lg bg-[#F7F8FA] shrink-0 overflow-hidden">
                          <img src={footprintImages[(item.id + idx) % footprintImages.length]} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    <div className="flex-1 min-w-0 min-h-[88px] flex flex-col">
                      <div className="text-[12px] text-[#9C9EA5] truncate">{item.shop}</div>
                      <div className="mt-0.5 text-[14px] text-[#222222] font-semibold leading-[1.25] truncate whitespace-nowrap">{item.title}</div>
                      <div className="mt-auto flex justify-between items-end gap-2">
                        <div className="min-w-0">
                          <div className="text-[#FF3A3A] font-bold leading-none">
                            <span className="text-[13px] mr-0.5">¥</span>
                            <span className="text-[22px]">{item.price.split('.')[0]}</span>
                            <span className="text-[13px]">.{item.price.split('.')[1] || '00'}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1 min-w-0">
                            <span className="h-[20px] px-1.5 rounded-md bg-[#FFF0EA] text-[#FF4A3D] text-[12px] font-semibold inline-flex items-center whitespace-nowrap shrink-0">约返{item.rebate}元</span>
                            {item.coupon ? <span className="h-[20px] px-1.5 rounded-md border border-[#FFDAD5] text-[#FF4A3D] text-[12px] inline-flex items-center whitespace-nowrap shrink-0">{item.coupon}</span> : null}
                          </div>
                        </div>
                        <button className="shrink-0 bg-gradient-to-r from-[#FF5733] to-[#FF0036] text-white text-[12px] px-3 py-1.5 rounded-full font-medium">去购买</button>
                      </div>
                    </div>
                  </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === 'detail' && (
          <ParseChatPage
            messages={chatMessages}
            isParsing={loading}
            onParse={requestParse}
            onBack={() => setPage('home')}
            onAction={handleCopyToken}
          />
        )}

        {page === 'profile' && (
          <section className="page p-4 md:px-0 md:py-8 pb-[80px]">
            <MailboxAuthPanel onToast={showToast} onLoginSuccess={() => {
              const target = postLoginRoute;
              if (target && isLoggedIn()) {
                try {
                  sessionStorage.removeItem('xc_union_post_login_route');
                } catch {
                  // ignore
                }
                setPostLoginRoute('');
                navigateTo(target);
                return;
              }
              if (pendingAuthAction && isLoggedIn()) {
                const action = pendingAuthAction;
                setPendingAuthAction(null);
                action?.();
              }
              setPage('home');
            }} />
          </section>
        )}

        {page !== 'detail' && (
          <BottomNav
            page={page}
            onSwitch={(next) => {
              if (next === 'rank') {
                navigateTo('/good-price');
                return;
              }
              if (next === 'footprint' && !isLoggedIn()) {
                try {
                  sessionStorage.setItem('xc_union_force_profile_tab', '1');
                } catch {
                  // ignore
                }
                setPage('profile');
                showToast('请先登录后访问足迹返利');
                return;
              }
              setPage(next);
            }}
          />
        )}
        <Toast message={toast} />
      </div>
    </>
  );
}

import { Camera, ChatCircleDots, Gift, Lightning, MagnifyingGlass, Medal, QrCode, SealPercent, ShoppingCartSimple, Ticket } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { isLoggedIn, onAuthChanged } from '../../../utils/auth';

const channels = [
  { name: '品牌特卖', icon: Medal },
  { name: '百亿补贴', icon: SealPercent },
  { name: '天猫国际', icon: Ticket },
  // { name: '签到领钱', icon: Gift },
  { name: '活动', icon: Gift },
  { name: '猫超特卖', icon: ShoppingCartSimple },
  { name: '淘宝秒杀', icon: Lightning }
];
const channelIconBg = ['#FFF0F3', '#FFF4ED', '#EEF4FF', '#EBFFF3', '#FFF4ED', '#FFF0F3'];
const channelIconColor = ['#FF0036', '#FF5000', '#0066FF', '#00C261', '#FF5000', '#FF0036'];

const GOODS_API_URL = '/home/getGoodsList';
const PAGE_SIZE = 20;
const APP_BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const USE_HASH_ROUTING = !import.meta.env.DEV;

function withBase(path) {
  if (!path.startsWith('/')) return path;
  if (!APP_BASE || APP_BASE === '/') return path;
  return `${APP_BASE}${path}`;
}

function navigateTo(path) {
  if (USE_HASH_ROUTING) {
    window.location.hash = path;
    return;
  }
  window.location.assign(withBase(path));
}

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function mapGoodsItem(raw = {}) {
  const finalPrice = Number(raw.actualPrice ?? raw.originalPrice ?? 0);
  const originPrice = Number(raw.originalPrice ?? finalPrice ?? 0);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebateAmount = finalPrice * (commissionRate / 100);
  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    goodsId: raw.goodsId ?? raw.goodsSign ?? '',
    title: raw.dtitle || raw.title || '未命名商品',
    image: raw.mainPic || 'https://placehold.co/220x220/FCE7E7/8B5E5E?text=GOODS',
    price: toCurrency(finalPrice),
    originalPrice: toCurrency(originPrice),
    rebate: toCurrency(rebateAmount),
    sales: raw.monthSales ?? 0,
    shopName: raw.shopName || '店铺',
    brandName: raw.brandName || '其他',
    couponPrice: Number(raw.couponPrice ?? 0)
  };
}

function openProductDetail(payload) {
  try {
    sessionStorage.setItem('lite_union_selected_product', JSON.stringify(payload || {}));
    sessionStorage.setItem('lite_union_return_path', '/');
  } catch {
    // ignore
  }
  navigateTo('/product-detail');
}

export default function HomeDealsPage() {
  const [authed, setAuthed] = useState(() => isLoggedIn());
  const [receiveHintVisible, setReceiveHintVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('520');
  const [channelPage, setChannelPage] = useState(0);
  const [campaignPage, setCampaignPage] = useState(0);
  const [channelTouchX, setChannelTouchX] = useState(0);
  const [campaignTouchX, setCampaignTouchX] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageId, setPageId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState('');
  const loadMoreRef = useRef(null);
  const inFlightRef = useRef(false);
  const loadThrottleRef = useRef(0);

  const channelPages = [];
  for (let i = 0; i < channels.length; i += 6) {
    channelPages.push(channels.slice(i, i + 6));
  }
  const campaignPages = [
    [
      { title: '下单挑战赛', desc: '完成指定单量，额外返现奖励' },
      { title: '夏日清凉券', desc: '清凉好物直降专区' }
    ],
    [
      { title: '百补爆款', desc: '精选爆款补贴直降' },
      { title: '家清囤货', desc: '居家清洁囤货低价' }
    ],
    [
      { title: '新人专享券', desc: '新客专享额外福利' },
      { title: '限时秒杀', desc: '整点限量低价开抢' }
    ]
  ];

  const goChannelPrev = () => setChannelPage((p) => (p === 0 ? channelPages.length - 1 : p - 1));
  const goChannelNext = () => setChannelPage((p) => (p + 1) % channelPages.length);
  const goCampaignPrev = () => setCampaignPage((p) => (p === 0 ? campaignPages.length - 1 : p - 1));
  const goCampaignNext = () => setCampaignPage((p) => (p + 1) % campaignPages.length);

  const onChannelTouchStart = (e) => setChannelTouchX(e.touches?.[0]?.clientX || 0);
  const onCampaignTouchStart = (e) => setCampaignTouchX(e.touches?.[0]?.clientX || 0);

  const onChannelTouchEnd = (e) => {
    if (channelPages.length <= 1) return;
    const endX = e.changedTouches?.[0]?.clientX || 0;
    const delta = endX - channelTouchX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) goChannelNext();
    else goChannelPrev();
  };

  const onCampaignTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX || 0;
    const delta = endX - campaignTouchX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) goCampaignNext();
    else goCampaignPrev();
  };

  const fetchGoods = async ({ append }) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setLoadError('');
    try {
      const resp = await fetch(GOODS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, pageSize: PAGE_SIZE })
      });
      if (!resp.ok) {
        throw new Error(`商品接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload?.list) ? payload.list : [];
      const mapped = list.map(mapGoodsItem);
      const nextPageId = list.length >= PAGE_SIZE ? String(Number(pageId || '1') + 1) : '';

      setProducts((prev) => (append ? [...prev, ...mapped] : mapped));
      setPageId(nextPageId || '');
      setHasMore(Boolean(nextPageId));
    } catch (e) {
      setLoadError(e.message || '商品加载失败');
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      setInitLoading(false);
    }
  };

  useEffect(() => {
    fetchGoods({ append: false });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthChanged(() => setAuthed(isLoggedIn()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!receiveHintVisible) return undefined;
    const timer = setTimeout(() => setReceiveHintVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [receiveHintVisible]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (!first?.isIntersecting) return;
      if (loading || initLoading || !hasMore) return;
      const now = Date.now();
      if (now - loadThrottleRef.current < 800) return;
      loadThrottleRef.current = now;
      fetchGoods({ append: true });
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, initLoading, hasMore, pageId]);

  return (
    <section className="page pb-[80px]">
      <div className="px-3 pb-3 pt-0 md:p-0 space-y-2 bg-[#F2F4F8]">
        <div className="sticky top-0 md:top-[72px] z-30 -mx-3 md:mx-0 px-3 md:px-0 pt-2 pb-0 bg-[#F2F4F8]">
          <div className="h-10 flex items-center gap-1.5">
            <div className="flex-1 h-full rounded-[12px] bg-white border border-[#FFD0DA] px-2 flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-md border border-[#EBEBEB] bg-[#F7F8FA] flex items-center justify-center text-[#888888]"><QrCode size={15} /></span>
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="text-[13px] text-[#111111] flex-1 font-medium bg-transparent outline-none"
              />
              <span className="w-7 h-7 rounded-md border border-[#EBEBEB] bg-[#F7F8FA] flex items-center justify-center text-[#888888]"><Camera size={15} /></span>
              <button
                onClick={() => {
                  try {
                    sessionStorage.setItem('lite_union_search_keyword', (searchKeyword || '').trim() || '520');
                  } catch {
                    // ignore
                  }
                  navigateTo('/query-goods');
                }}
                className="h-8 px-4 rounded-[10px] bg-[#FF0036] text-white text-[13px] font-semibold active:brightness-95"
              >
                搜索
              </button>
            </div>
            <button onClick={() => navigateTo('/message-box')} className="relative w-8 h-8 rounded-full text-[#475467] flex items-center justify-center bg-white">
              <ChatCircleDots size={20} />
              {authed ? <span className="absolute -right-0.5 -top-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF0036] text-white text-[10px] leading-4 text-center">6</span> : null}
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-2.5" onTouchStart={onChannelTouchStart} onTouchEnd={onChannelTouchEnd}>
          <div className="grid grid-cols-6 gap-1.5">
            {channelPages[channelPage].map((c, idx) => {
              const Icon = c.icon;
              return (
                <button
                  key={`${channelPage}_${c.name}`}
                  onClick={() => {
                    if (c.name === '品牌特卖') {
                      navigateTo('/brand-sale');
                    }
                    if (c.name === '猫超特卖') {
                      navigateTo('/tmall-sale');
                    }
                    if (c.name === '天猫国际') {
                      navigateTo('/tmall-global-sale');
                    }
                    if (c.name === '淘宝秒杀') {
                      navigateTo('/flash-sale');
                    }
                    if (c.name === '活动') {
                      navigateTo('/reward-activity');
                    }
                    if (c.name === '百亿补贴') {
                      navigateTo('/billion-subsidy');
                    }
                  }}
                  className="h-[72px] rounded-xl bg-transparent flex flex-col items-center justify-center gap-1"
                >
                  <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: channelIconBg[idx % channelIconBg.length] }}>
                    <Icon size={18} style={{ color: channelIconColor[idx % channelIconColor.length] }} weight="bold" />
                  </span>
                  <span className="text-[12px] text-[#333333] whitespace-nowrap">{c.name}</span>
                </button>
              );
            })}
          </div>
          {channelPages.length > 1 ? (
            <div className="mt-1.5 flex justify-center gap-1">
              {channelPages.map((_, idx) => (
                <span key={idx} className={`h-1 rounded-full ${idx === channelPage ? 'w-5 bg-[#FF0036]' : 'w-4 bg-[#D7DCE4]'}`} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="h-12 bg-[#FFF7F7] border border-[#FCE1E1] rounded-xl px-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[#FF4142] text-white text-[14px] flex items-center justify-center">￥</span>
          <div className="flex-1 text-[13px] text-[#111111]">购物车商品找到 <span className="text-[#FF0036] font-semibold">50元隐藏红包</span></div>
          <button onClick={() => setReceiveHintVisible(true)} className="h-8 px-4 rounded-lg bg-[#FF0036] text-white text-[13px] font-medium">去领取</button>
        </div>

        <div className="grid grid-cols-2 gap-2" onTouchStart={onCampaignTouchStart} onTouchEnd={onCampaignTouchEnd}>
          {campaignPages[campaignPage].map((item) => (
            <button
              key={`${campaignPage}_${item.title}`}
              onClick={goCampaignNext}
              className="bg-cardWhite border border-borderLine rounded-2xl p-2 text-left min-h-[70px]"
            >
              <p className="text-[14px] font-bold text-textMain leading-[1.2]">{item.title}</p>
              <p className="text-[12px] text-textMuted mt-0.5 truncate leading-[1.15]">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {initLoading && <div className="text-[13px] text-textMuted text-center py-4">商品加载中...</div>}
          {!initLoading && loadError && <div className="text-[13px] text-[#d94b3d] text-center py-4">{loadError}</div>}
          {products.map((p) => (
            <button
              type="button"
              onClick={() =>
                openProductDetail({
                  source: 'home',
                  ...p
                })
              }
              key={p.id}
              className="w-full text-left bg-white border border-[#E6EAF0] rounded-2xl p-2.5 flex gap-2.5 items-stretch"
            >
              <div className="block shrink-0 w-[100px] rounded-lg bg-[#F7F8FA] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
              <p className="text-[15px] text-[#111111] font-medium leading-[1.35] whitespace-nowrap overflow-hidden">{p.title}</p>
                <div className="mt-2 h-[18px] flex items-center justify-between gap-2">
                  {p.shopName && p.shopName.includes('旗舰店') ? (
                    <span className="truncate inline-flex items-center px-1.5 py-[2px] rounded-[4px] bg-[#FCF6ED] border border-[#F3DAB1] text-[#A6742B] text-[10px] leading-none">
                      <span className="truncate leading-none">{p.shopName}</span>
                    </span>
                  ) : (
                    <span className="truncate inline-flex items-center px-1.5 py-[2px] rounded-[4px] bg-[#F5F5F6] text-[#666666] text-[10px] leading-none">{p.shopName}</span>
                  )}
                  {p.brandName && p.brandName !== '其他' ? (
                    <span className="shrink-0 text-[12px] text-[#999999]">{p.brandName}</span>
                  ) : null}
                </div>
                <div className="mt-0.5 text-[10px] text-[#999999]">月销{p.sales}</div>
                <div className="mt-1.5 flex items-end justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="inline-flex items-baseline text-[#FF0036] leading-none font-semibold">
                      <span className="text-[12px] mr-0.5">¥</span>
                      <span className="text-[20px]">{p.price}</span>
                    </div>
                    <div className="inline-flex items-center px-1.5 py-[2px] rounded border border-[#FFD8B2] bg-[#FFF4ED] text-[#FF5000] text-[11px] leading-none whitespace-nowrap">约返 ¥{p.rebate}</div>
                  </div>
                  {p.couponPrice > 0 ? (
                    <div className="h-6 rounded-[4px] bg-[#FF0036] flex items-center overflow-hidden shrink-0 text-white">
                      <span className="px-2 text-[11px] font-semibold">¥{p.couponPrice} 券</span>
                      <span className="h-4 border-l border-dashed border-white/60" />
                      <span className="h-full px-2.5 text-[11px] font-medium text-white inline-flex items-center">领取</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center text-[12px] text-textMuted">
            {loading && !initLoading ? '加载更多中...' : hasMore ? '下滑加载更多' : '没有更多了'}
          </div>
        </div>

        {receiveHintVisible ? (
          <div className="fixed left-1/2 -translate-x-1/2 bottom-[88px] z-50 pointer-events-none">
            <div
              className="h-9 px-4 rounded-full text-[13px] inline-flex items-center"
              style={{
                color: '#fff',
                background: 'rgba(35, 41, 51, 0.9)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.18)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                animation: 'fadeInInviteToast 160ms ease-out'
              }}
            >
              功能暂未开放，敬请期待
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}

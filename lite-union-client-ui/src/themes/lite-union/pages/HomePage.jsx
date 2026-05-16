import { Gift, Lightning, MagnifyingGlass, Medal, SealPercent, ShoppingCartSimple, Ticket } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

const channels = [
  { name: '品牌特卖', icon: Medal },
  { name: '百亿补贴', icon: SealPercent },
  { name: '签到领钱', icon: Gift },
  { name: '猫超特卖', icon: ShoppingCartSimple },
  { name: '淘宝秒杀', icon: Lightning },
  { name: '国家补贴', icon: Ticket }
];
const channelIconBg = ['#ff4d8b', '#ff2b2b', '#3b82f6', '#22c55e', '#ef4444', '#10b981'];

const GOODS_API_URL = '/home/getGoodsList';
const PAGE_SIZE = 20;

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function mapGoodsItem(raw = {}) {
  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    title: raw.dtitle || raw.title || '未命名商品',
    image: raw.mainPic || 'https://placehold.co/220x220/FCE7E7/8B5E5E?text=GOODS',
    price: toCurrency(raw.actualPrice ?? raw.originalPrice ?? 0),
    rebate: toCurrency(raw.commissionRate ?? 0),
    sales: raw.monthSales ?? 0,
    shopName: raw.shopName || '店铺',
    brandName: raw.brandName || '其他',
    couponPrice: Number(raw.couponPrice ?? 0)
  };
}

export default function HomeDealsPage() {
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

  const channelPages = [channels.slice(0, 4), channels.slice(4, 6)];
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
      <div className="p-4 md:p-0 space-y-3">
        <div className="sticky top-0 md:top-[72px] z-30 py-1 bg-appBg/95 backdrop-blur">
          <div className="flex items-center gap-2 h-11 rounded-xl bg-white border border-[#ffcec2] px-3 shadow-[0_4px_12px_rgba(217,75,61,0.1)]">
            <MagnifyingGlass size={16} className="text-[#c96c59]" />
            <span className="text-[13px] text-[#8b3b2d] flex-1">粘贴口令/链接，输入内容后一键解析</span>
            <button className="h-8 px-3 rounded-lg bg-[#d94b3d] text-white text-[12px]">解析</button>
          </div>
        </div>

        <div className="bg-cardWhite border border-borderLine rounded-2xl p-3" onTouchStart={onChannelTouchStart} onTouchEnd={onChannelTouchEnd}>
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-4 gap-1.5 flex-1">
            {channelPages[channelPage].map((c, idx) => {
              const Icon = c.icon;
              return (
                <button key={`${channelPage}_${c.name}`} className="h-[68px] rounded-xl bg-transparent flex flex-col items-center justify-center gap-1">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: channelIconBg[idx % channelIconBg.length] }}>
                    <Icon size={18} className="text-white" weight="bold" />
                  </span>
                  <span className="text-[12px] text-textMain whitespace-nowrap">{c.name}</span>
                </button>
              );
            })}
            </div>
          </div>
          <div className="mt-1 flex justify-center gap-1">
            {channelPages.map((_, idx) => (
              <span key={idx} className={`h-1 rounded-full ${idx === channelPage ? 'w-5 bg-[#ff4f4f]' : 'w-4 bg-borderLine'}`} />
            ))}
          </div>
        </div>

        <div className="bg-[#fff4f2] border border-[#ffd7d1] rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="text-[13px] text-textMain">购物车商品找到 <span className="text-[#d94b3d] font-bold">88元</span> 隐藏红包</div>
          <button className="h-8 px-4 rounded-lg bg-[#d94b3d] text-white text-[13px]">去领取</button>
        </div>

        <div className="grid grid-cols-2 gap-2" onTouchStart={onCampaignTouchStart} onTouchEnd={onCampaignTouchEnd}>
          {campaignPages[campaignPage].map((item) => (
            <button
              key={`${campaignPage}_${item.title}`}
              onClick={goCampaignNext}
              className="bg-cardWhite border border-borderLine rounded-2xl p-3 text-left min-h-[92px]"
            >
              <p className="text-[15px] font-bold text-textMain">{item.title}</p>
              <p className="text-[12px] text-textMuted mt-1">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {initLoading && <div className="text-[13px] text-textMuted text-center py-4">商品加载中...</div>}
          {!initLoading && loadError && <div className="text-[13px] text-[#d94b3d] text-center py-4">{loadError}</div>}
          {products.map((p) => (
            <div key={p.id} className="bg-cardWhite border border-borderLine rounded-2xl p-3 flex gap-3">
              <img src={p.image} alt={p.title} className="block shrink-0 w-[110px] h-[110px] rounded-lg border border-borderLine object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-textMain whitespace-nowrap overflow-hidden">{p.title}</p>
                <div className="mt-1 text-[12px] text-textMuted flex items-center justify-between gap-2">
                  <span className="truncate">{p.shopName}</span>
                  {p.brandName && p.brandName !== '其他' ? (
                    <span className="shrink-0">{p.brandName}</span>
                  ) : null}
                </div>
                <div className="mt-1 text-[12px] text-textMuted">月销{p.sales}</div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-[20px] font-bold text-[#d94b3d]">¥ {p.price}</div>
                    <div className="text-[12px] text-[#d94b3d]">约返 ¥ {p.rebate}</div>
                  </div>
                  {p.couponPrice > 0 ? (
                    <div className="h-8 rounded-md bg-[#fff1f1] border border-[#ffdada] flex items-center overflow-hidden">
                      <span className="px-2 text-[#ef4444] text-[12px] font-semibold">¥{p.couponPrice} 优惠券</span>
                      <button className="h-full px-2 bg-[#ffe3e3] text-[#ef4444] text-[12px] font-medium border-l border-[#ffd1d1]">领取</button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center text-[12px] text-textMuted">
            {loading && !initLoading ? '加载更多中...' : hasMore ? '下滑加载更多' : '没有更多了'}
          </div>
        </div>

      </div>
    </section>
  );
}

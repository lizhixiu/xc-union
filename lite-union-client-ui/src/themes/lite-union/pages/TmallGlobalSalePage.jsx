import { ArrowLeft, MagnifyingGlass, SealCheck, ShareNetwork, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const categories = [
  { name: '美妆好物', emoji: '💄' },
  { name: '宝妈萌娃', emoji: '🍼' },
  { name: '医药保健', emoji: '💊' },
  { name: '清洁个护', emoji: '🧴' },
  { name: '关爱萌宠', emoji: '🐶' },
  { name: '数码家电', emoji: '📱' },
  { name: '潮流服饰', emoji: '👕' },
  { name: '时尚箱包', emoji: '👜' },
  { name: '家居生活', emoji: '🏠' },
  { name: '全球美食', emoji: '🍫' }
];

const tabs = ['精选', '热销', '超值', '新品'];
const GOODS_API_URL = '/home/getTmallInternationalGoodsList';
const PAGE_SIZE = 20;

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function formatSales(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 10000) {
    const w = n / 10000;
    return `${w >= 100 ? w.toFixed(0) : w.toFixed(1)}万+`;
  }
  return String(n);
}

function mapGoodsItem(raw = {}) {
  const finalPrice = Number(raw.actualPrice ?? raw.originalPrice ?? 0);
  const originalPrice = Number(raw.originalPrice ?? 0);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebateAmount = finalPrice * (commissionRate / 100);
  const discount = Number(raw.discounts ?? 0);
  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    goodsId: raw.goodsId ?? '',
    title: raw.dtitle || raw.title || '未命名商品',
    image: raw.mainPic || 'https://placehold.co/300x300/F6F2FF/6C4BB8?text=GLOBAL',
    price: toCurrency(finalPrice),
    oldPrice: originalPrice > 0 ? `¥${toCurrency(originalPrice)}` : '',
    discountText: discount > 0 ? `${(discount * 10).toFixed(1)}折` : '',
    couponPrice: Number(raw.couponPrice ?? 0),
    rebate: toCurrency(rebateAmount),
    sold: `已售${formatSales(raw.monthSales)}`,
    activityName: raw.activityInfo?.[0]?.activityName || '天猫国际特卖',
    tag: raw.lowest ? '低价好物' : '优质素材',
    shopName: raw.shopName || '天猫国际'
  };
}

export default function TmallGlobalSalePage({ standalone = false }) {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('精选');
  const [goods, setGoods] = useState([]);
  const [pageId, setPageId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState('');

  const scrollRootRef = useRef(null);
  const loadMoreRef = useRef(null);
  const inFlightRef = useRef(false);
  const loadThrottleRef = useRef(0);

  const fetchGoods = async ({ append, reqPageId }) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setLoadError('');

    try {
      const currentPageId = reqPageId || pageId;
      const resp = await fetch(GOODS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: currentPageId, pageSize: PAGE_SIZE })
      });

      if (!resp.ok) {
        throw new Error(`天猫国际接口请求失败: ${resp.status}`);
      }

      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload?.list) ? payload.list : [];
      const mapped = list.map(mapGoodsItem);
      const nextPageId = list.length >= PAGE_SIZE ? String(Number(currentPageId || '1') + 1) : '';

      setGoods((prev) => (append ? [...prev, ...mapped] : mapped));
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
    fetchGoods({ append: false, reqPageId: '1' });
  }, []);

  useEffect(() => {
    const root = scrollRootRef.current;
    const target = loadMoreRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (loading || initLoading || !hasMore || !pageId) return;

        const now = Date.now();
        if (now - loadThrottleRef.current < 800) return;
        loadThrottleRef.current = now;

        fetchGoods({ append: true, reqPageId: pageId });
      },
      { root, threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loading, initLoading, hasMore, pageId]);

  const shown = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return goods;
    return goods.filter((g) => `${g.title} ${g.shopName}`.toLowerCase().includes(q));
  }, [goods, keyword]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#f7f5ff] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#d5c7ff] md:shadow-[0_12px_30px_rgba(91,64,184,0.18)]">
          <div className="sticky top-0 z-20 bg-[linear-gradient(155deg,#6f4cd1_0%,#5b3fc4_55%,#4f33b8_100%)] p-4 text-white">
            <div className="flex items-center gap-3">
              {standalone ? (
                <button onClick={() => window.location.assign('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <h2 className="text-[22px] font-bold flex-1">天猫国际特卖</h2>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={17} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#d9cfff]">
              <MagnifyingGlass size={16} className="text-[#7868a8]" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索跨境好物"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#3e3163] placeholder:text-[#9a8dbc] outline-none"
              />
              <button className="h-8 min-w-[88px] rounded-full bg-[#6a4fd4] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><ShieldCheck size={13} />正品保障</div>
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><Sparkle size={13} />补贴加码</div>
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><SealCheck size={13} />售后无忧</div>
            </div>
          </div>

          <div ref={scrollRootRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white rounded-2xl border border-[#e3dbff] p-3">
              <div className="grid grid-cols-5 gap-y-3">
                {categories.map((c) => (
                  <button key={c.name} className="flex flex-col items-center gap-1">
                    <span className="w-11 h-11 rounded-full bg-[#f4f0ff] border border-[#e7ddff] flex items-center justify-center text-[19px]">{c.emoji}</span>
                    <span className="text-[11px] text-[#5a4a88] whitespace-nowrap">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e3dbff] p-2 flex gap-2">
              {tabs.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`h-9 px-4 rounded-full text-[13px] font-semibold ${active ? 'bg-[#674bd1] text-white shadow-[0_6px_12px_rgba(103,75,209,0.3)]' : 'bg-[#f4f0ff] text-[#605085]'}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {initLoading ? <div className="text-[13px] text-[#7a6fa2] text-center py-3">商品加载中...</div> : null}
            {!initLoading && loadError ? <div className="text-[13px] text-[#d94b3d] text-center py-3">{loadError}</div> : null}

            <div className="grid grid-cols-2 gap-2">
              {shown.map((g, idx) => (
                <div key={`${g.id}-${g.goodsId || 'g'}-${idx}`} className="bg-white rounded-2xl border border-[#e5deff] overflow-hidden">
                  <div className="relative px-2 pt-2">
                    <img src={g.image} alt={g.title} className="w-full aspect-square rounded-xl object-cover" />
                    {g.discountText ? <span className="absolute left-3 top-3 bg-[#6d52d5] text-white text-[10px] px-1.5 py-0.5 rounded-md">{g.discountText}</span> : null}
                  </div>
                  <div className="p-2.5">
                    <p className="text-[12px] text-[#372c58] line-clamp-2 min-h-[32px]">{g.title}</p>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-[#887ab0]">
                      <span>{g.couponPrice > 0 ? `券¥${g.couponPrice}` : '无券'}</span>
                      <span>返¥{g.rebate}</span>
                    </div>
                    <div className="mt-1.5 flex items-end justify-between">
                      <div>
                        <div className="text-[#ef4444]"><span className="text-[11px]">¥</span><span className="text-[18px] font-bold">{g.price}</span></div>
                        {g.oldPrice ? <div className="text-[11px] text-[#a49abb] line-through">{g.oldPrice}</div> : null}
                      </div>
                      <span className="text-[10px] text-[#9588b8]">{g.sold}</span>
                    </div>
                    <div className="mt-1 inline-flex rounded-full bg-[#f4f0ff] text-[#624fa4] text-[10px] px-2 py-0.5">{g.tag}</div>
                  </div>
                </div>
              ))}
            </div>

            {!initLoading && shown.length === 0 ? <div className="text-[13px] text-[#6b7280] text-center py-3">没有匹配的商品</div> : null}

            <div ref={loadMoreRef} className="h-10 flex items-center justify-center text-[12px] text-[#7a6fa2]">
              {loading && !initLoading ? '加载更多中...' : hasMore ? '下滑加载更多' : '没有更多了'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

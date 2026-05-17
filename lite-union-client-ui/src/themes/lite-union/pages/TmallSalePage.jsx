import { ArrowLeft, MagnifyingGlass, ShareNetwork, Sparkle } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const categoryList = [
  { name: '零食速食', emoji: '🍪' },
  { name: '粮油调味', emoji: '🧂' },
  { name: '乳饮冲调', emoji: '🥛' },
  { name: '日用百货', emoji: '🧴' },
  { name: '母婴用品', emoji: '🍼' },
  { name: '纸品清洁', emoji: '🧻' },
  { name: '酒水饮料', emoji: '🥤' },
  { name: '个护美妆', emoji: '💄' }
];

const filterTabs = ['精选推荐', '9.9秒杀', '单品包邮'];
const GOODS_API_URL = '/home/getTmallSupermarketGoodsList';
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
    image: raw.mainPic || 'https://placehold.co/300x300/F2F7EF/5B8A4D?text=GOODS',
    price: toCurrency(finalPrice),
    oldPrice: originalPrice > 0 ? `¥${toCurrency(originalPrice)}` : '',
    discountText: discount > 0 ? `${(discount * 10).toFixed(1)}折` : '',
    couponPrice: Number(raw.couponPrice ?? 0),
    rebate: toCurrency(rebateAmount),
    sold: `已售${formatSales(raw.monthSales)}件`,
    activityName: raw.activityInfo?.[0]?.activityName || '天猫超市特卖',
    shopName: raw.shopName || '天猫超市'
  };
}

export default function TmallSalePage({ standalone = false }) {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('单品包邮');
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
        throw new Error(`天猫超市接口请求失败: ${resp.status}`);
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

  const shownGoods = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return goods;
    return goods.filter((g) => `${g.title} ${g.shopName}`.toLowerCase().includes(q));
  }, [goods, keyword]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#f3fbf4] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#b9e0bf] md:shadow-[0_12px_30px_rgba(54,135,83,0.18)]">
          <div className="sticky top-0 z-20 bg-[linear-gradient(160deg,#30ae61_0%,#279e57_100%)] p-4 text-white">
            <div className="flex items-center gap-3">
              {standalone ? (
                <button onClick={() => window.location.assign('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <h2 className="text-[22px] font-bold flex-1">天猫超市特卖</h2>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={17} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#cae9cf]">
              <MagnifyingGlass size={16} className="text-[#6c8f74]" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索超市好货"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#35503c] placeholder:text-[#8aa493] outline-none"
              />
              <button className="h-8 min-w-[88px] rounded-full bg-[#2ea85d] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
              {['品牌好货', '9.9秒杀', '补贴专区'].map((item) => (
                <div key={item} className="h-8 rounded-full bg-white/18 flex items-center justify-center">{item}</div>
              ))}
            </div>
          </div>

          <div ref={scrollRootRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white rounded-2xl border border-[#d8ebdc] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-bold text-[#284437]">优惠清单</div>
                <div className="text-[12px] text-[#5d8b70]">低至五折 · 万人抢购</div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-y-3">
                {categoryList.map((c) => (
                  <button key={c.name} className="flex flex-col items-center gap-1">
                    <span className="w-11 h-11 rounded-full bg-[#eef8f0] border border-[#d6ecd9] flex items-center justify-center text-[20px]">{c.emoji}</span>
                    <span className="text-[11px] text-[#4b6e58] whitespace-nowrap">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#d8ebdc] p-2 flex gap-2">
              {filterTabs.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`h-9 px-4 rounded-full text-[13px] font-semibold ${active ? 'bg-[#2ca95d] text-white shadow-[0_6px_12px_rgba(44,169,93,0.25)]' : 'bg-[#f0f8f2] text-[#4e765f]'}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {initLoading ? <div className="text-[13px] text-[#5d8b70] text-center py-3">商品加载中...</div> : null}
            {!initLoading && loadError ? <div className="text-[13px] text-[#d94b3d] text-center py-3">{loadError}</div> : null}

            <div className="grid grid-cols-2 gap-2">
              {shownGoods.map((g, idx) => (
                <div key={`${g.id}-${g.goodsId || 'g'}-${idx}`} className="bg-white rounded-2xl border border-[#cfe8d4] overflow-hidden shadow-[0_2px_8px_rgba(57,117,77,0.08)]">
                  <div className="px-2 pt-2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#eaf7ee] text-[#2a8f53] text-[10px] px-2 py-0.5">
                      <Sparkle size={10} />
                      {g.activityName}
                    </div>
                  </div>
                  <div className="mt-1 px-2">
                    <div className="w-full aspect-square rounded-xl bg-[#f3fbf4] border border-[#deefe1] p-2 flex items-center justify-center overflow-hidden">
                      <img src={g.image} alt={g.title} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[12px] text-[#2d4b39] line-clamp-2 min-h-[32px]">{g.discountText ? <span className="text-[#2b9a56] font-semibold mr-1">{g.discountText}</span> : null}{g.title}</p>
                    <div className="mt-1 text-[11px] text-[#5f8c71] flex items-center justify-between">
                      <span>{g.couponPrice > 0 ? `券¥${g.couponPrice}` : '无券'}</span>
                      <span className="text-[#4f8768]">返¥{g.rebate}</span>
                    </div>
                    <div className="mt-1.5 flex items-end justify-between">
                      <div>
                        <div className="text-[#ef4444]"><span className="text-[11px]">¥</span><span className="text-[18px] font-bold">{g.price}</span></div>
                        {g.oldPrice ? <div className="text-[11px] text-[#9fb2a4] line-through">{g.oldPrice}</div> : null}
                      </div>
                      <div className="text-[10px] text-[#5d8b70]">{g.sold}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!initLoading && shownGoods.length === 0 ? <div className="text-[13px] text-[#6b7280] text-center py-3">没有匹配的商品</div> : null}

            <div ref={loadMoreRef} className="h-10 flex items-center justify-center text-[12px] text-[#6b7280]">
              {loading && !initLoading ? '加载更多中...' : hasMore ? '下滑加载更多' : '没有更多了'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

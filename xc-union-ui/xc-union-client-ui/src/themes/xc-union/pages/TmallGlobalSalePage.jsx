import { AirplaneTilt, ArrowLeft, MagnifyingGlass, ShareNetwork, Sparkle } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

const categoryList = [
  { name: '全球美妆', imageUrl: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01BaHyod2JJhyy8p51G_!!2053469401.png' },
  { name: '母婴专区', imageUrl: 'https://img.alicdn.com/imgextra/i3/2053469401/O1CN01iYhKXk2JJhvraof9Z-2053469401.png' },
  { name: '营养保健', imageUrl: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01DUJtlx2JJhyc4RIpS_!!2053469401.png' },
  { name: '个护清洁', imageUrl: 'https://img.alicdn.com/imgextra/i3/2053469401/O1CN01UgAfwJ2JJhz0UKchq_!!2053469401.png' },
  { name: '宠物优选', imageUrl: 'https://img.alicdn.com/i2/2/TB1gz6WRFzqK1RjSZFoXXbfcXXa' },
  { name: '潮流数码', imageUrl: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01ejbIF22JJhyGrH6Q0_!!2053469401.png' },
  { name: '服饰箱包', imageUrl: 'https://img.alicdn.com/imgextra/i4/2053469401/O1CN01iljwLE2JJhvu7uoSS-2053469401.png' },
  { name: '进口零食', imageUrl: 'https://img.alicdn.com/imgextra/i2/2053469401/O1CN01aOer0W2JJhzuGlt4R_!!2053469401.png' },
];

const filterTabs = ['精选推荐', '进口爆款', '品牌直降'];
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
  const originalPrice = Number(raw.originalPrice ?? finalPrice * 1.25);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebateAmount = finalPrice * (commissionRate / 100);
  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    goodsId: raw.goodsId ?? '',
    title: raw.dtitle || raw.title || '未命名商品',
    image: raw.mainPic || 'https://placehold.co/300x300/F1F5FF/4A64B8?text=GLOBAL',
    price: toCurrency(finalPrice),
    oldPrice: originalPrice > finalPrice ? `¥${toCurrency(originalPrice)}` : `¥${toCurrency(finalPrice * 1.25)}`,
    couponPrice: Number(raw.couponPrice ?? 0),
    rebate: toCurrency(rebateAmount),
    sold: `已售${formatSales(raw.monthSales)}件`,
    activityName: raw.activityInfo?.[0]?.activityName || '天猫国际特卖',
    shopName: raw.shopName || '天猫国际',
    badgeText: raw.activityInfo?.[0]?.activityName || '进口优选'
  };
}

export default function TmallGlobalSalePage({ standalone = false }) {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('精选推荐');
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

  const shownGoods = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return goods;
    return goods.filter((g) => `${g.title} ${g.shopName}`.toLowerCase().includes(q));
  }, [goods, keyword]);

  const openProductDetail = (payload) => {
    try {
      sessionStorage.setItem('xc_union_selected_product', JSON.stringify(payload || {}));
      sessionStorage.setItem('xc_union_return_path', '/tmall-global-sale');
    } catch {
      // ignore
    }
    navigateTo('/product-detail');
  };

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#f2f6ff] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#c9d9ff] md:shadow-[0_12px_30px_rgba(58,95,182,0.16)]">
          <div className="sticky top-0 z-20 bg-gradient-to-b from-[#3D6CFF] to-[#2E56D8] p-4 text-white">
            <div className="flex items-center gap-3">
              {standalone ? (
                <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <h2 className="text-[22px] font-bold flex-1">天猫国际特卖</h2>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={17} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#d8e2ff]">
              <MagnifyingGlass size={16} className="text-[#6b80bf]" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索全球好物"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#2d3f72] placeholder:text-[#8f9fc9] outline-none"
              />
              <button className="h-8 min-w-[88px] rounded-full bg-[#3d6cff] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 flex items-center gap-5 text-[12px] text-white/84">
              {['海外直采', '国际品牌', '官方补贴'].map((item, idx) => (
                <span key={item} className={idx === 0 ? 'font-bold text-white' : 'font-normal'}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div ref={scrollRootRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white rounded-2xl border border-[#d9e4ff] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-bold text-[#243a73]">国际会场</div>
                <div className="text-[12px] text-[#5570b4]">海淘尖货 · 每日上新</div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-y-3">
                {categoryList.map((c) => (
                  <button key={c.name} className="flex flex-col items-center gap-1">
                    <span className="w-11 h-11 rounded-full bg-[#eef3ff] border border-[#dce6ff] flex items-center justify-center overflow-hidden">
                      <img src={c.imageUrl} alt={c.name} className="w-8 h-8 object-contain" />
                    </span>
                    <span className="text-[11px] text-[#4b5f94] whitespace-nowrap">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#d9e4ff] p-2 flex gap-2">
              {filterTabs.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`h-9 px-4 rounded-full text-[13px] relative ${active ? 'bg-[#EAF0FF] text-[#3D6CFF] font-bold' : 'bg-[#f2f6ff] text-[#5f73aa] font-medium'}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {initLoading ? <div className="text-[13px] text-[#5d75af] text-center py-3">商品加载中...</div> : null}
            {!initLoading && loadError ? <div className="text-[13px] text-[#d94b3d] text-center py-3">{loadError}</div> : null}

            <div className="grid grid-cols-2 gap-2">
              {shownGoods.map((g, idx) => (
                <button
                  type="button"
                  onClick={() =>
                    openProductDetail({
                      source: 'tmall-global-sale',
                      ...g,
                      originalPrice: (g.oldPrice || '').replace('¥', '')
                    })
                  }
                  key={`${g.id}-${g.goodsId || 'g'}-${idx}`}
                  className="w-full text-left rounded-[8px] overflow-hidden bg-white shadow-[0_2px_8px_rgba(56,87,171,0.08)]"
                >
                  <div className="relative aspect-square bg-[#F7F8FA] overflow-hidden">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 inline-flex items-center gap-1 rounded-br-[8px] bg-gradient-to-br from-[#4F7BFF] to-[#315BDC] text-white text-[10px] px-2 py-1">
                      <AirplaneTilt size={10} />
                      {g.badgeText}
                    </div>
                  </div>
                  <div className="px-2.5 py-2.5">
                    <p className="text-[13px] text-[#111111] font-semibold leading-[1.35] line-clamp-2 min-h-[36px]">{g.title}</p>
                    <div className="mt-1 inline-flex items-center px-1.5 py-[2px] rounded-[3px] border border-[#FFD8B2] bg-[#FFF4ED] text-[#FF5000] text-[10px] leading-none">
                      返¥{g.rebate}
                    </div>
                    <div className="mt-1.5 flex items-end justify-between gap-2">
                      <div>
                        <div className="text-[#FF0036]"><span className="text-[11px]">¥</span><span className="text-[18px] font-bold">{g.price}</span></div>
                        {g.oldPrice ? <div className="text-[11px] text-[#98A3BE] line-through">{g.oldPrice}</div> : null}
                      </div>
                      <div className="text-[10px] text-[#5b70a9]">{g.sold}</div>
                    </div>
                  </div>
                </button>
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

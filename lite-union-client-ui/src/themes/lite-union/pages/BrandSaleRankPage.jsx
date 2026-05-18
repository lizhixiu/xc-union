import { ArrowLeft, MagnifyingGlass, ShareNetwork, Sparkle } from '@phosphor-icons/react';
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

const tabs = ['精选品牌', '上新', '美妆', '个护', '食品', '母婴'];
const BRAND_API_URL = '/home/getBrandListAndGoodsList';
const TODAY_BRAND_API_URL = '/home/getTodayBrandList';
const FEATURED_GOODS_API_URL = '/home/getBrandGoodsList';
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
    return `${w >= 100 ? w.toFixed(0) : w.toFixed(1)}万`;
  }
  return String(n);
}

function mapBrand(raw = {}) {
  const goodsList = Array.isArray(raw.goodsList) ? raw.goodsList : [];
  return {
    id: raw.brandId ?? raw.id ?? Math.random(),
    name: raw.brandName || '品牌专场',
    logo: raw.brandLogo || 'https://placehold.co/88x88/FDEAF3/AD5D7F?text=BRAND',
    features: raw.brandFeatures || '',
    sales: raw.sales || 0,
    discount: raw.maxDiscount ? `低至${raw.maxDiscount}折` : '品牌特卖',
    goods: goodsList.slice(0, 3).map((g) => ({
      id: g.id ?? g.goodsId ?? Math.random(),
      title: g.dTitle || g.title || '品牌商品',
      image: g.mainPic || 'https://placehold.co/180x180/FCEAF1/B1688B?text=GOODS',
      price: `¥${toCurrency(g.actualPrice ?? g.originPrice ?? 0)}`,
      tag: Number(g.couponPrice || 0) > 0 ? `券¥${toCurrency(g.couponPrice)}` : `月销${formatSales(g.monthSales)}`
    }))
  };
}

function mapTodayBrand(raw = {}) {
  const labels = (() => {
    if (Array.isArray(raw.label)) return raw.label;
    if (typeof raw.label === 'string') {
      try {
        const parsed = JSON.parse(raw.label);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  })();

  return {
    id: raw.brandId ?? Math.random(),
    name: raw.brandName || '品牌',
    logo: raw.brandLogo || 'https://placehold.co/80x80/FDEAF3/AD5D7F?text=BR',
    score: Number(raw.brandScore || 0),
    simpleLabel: raw.simpleLabel || '',
    off: raw.position ? `榜单TOP${raw.position}` : (raw.brandScore ? `${raw.brandScore}分` : '今日推荐'),
    sub: labels[0] || raw.brandEnglish || raw.consumer || ''
  };
}

function mapFeaturedGoods(raw = {}) {
  const activityName = Array.isArray(raw.activityInfo) && raw.activityInfo.length > 0 ? raw.activityInfo[0]?.activityName : '';
  return {
    id: raw.sign ?? raw.goodsLink ?? Math.random(),
    title: raw.title || raw.desc || '品牌商品',
    image: raw.pic || 'https://placehold.co/240x240/F3E8FF/7C3AED?text=GOODS',
    price: toCurrency(raw.postRollPrice ?? raw.originalPrice ?? 0),
    tag: Number(raw.ticketPrice || 0) > 0 ? `券¥${toCurrency(raw.ticketPrice)}` : (activityName || '品牌好货')
  };
}

export default function BrandSaleRankPage({ standalone = false }) {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('精选品牌');
  const [brands, setBrands] = useState([]);
  const [todayBrands, setTodayBrands] = useState([]);
  const [featuredGoods, setFeaturedGoods] = useState([]);
  const [pageId, setPageId] = useState('1');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const inFlightRef = useRef(false);
  const loadMoreRef = useRef(null);
  const loadThrottleRef = useRef(0);

  const hasMore = brands.length < total || (total === 0 && pageId === '1');

  const fetchBrands = async ({ append, reqPageId }) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setLoadError('');

    try {
      const currentPageId = reqPageId || pageId;
      const resp = await fetch(BRAND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: currentPageId, pageSize: PAGE_SIZE })
      });

      if (!resp.ok) {
        throw new Error(`品牌接口请求失败: ${resp.status}`);
      }

      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload.list) ? payload.list : [];
      const mapped = list.map(mapBrand);
      const totalCount = Number(payload.total ?? 0);
      const nextPage = list.length >= PAGE_SIZE ? String(Number(currentPageId) + 1) : '';

      setTotal(totalCount);
      setBrands((prev) => (append ? [...prev, ...mapped] : mapped));
      setPageId(nextPage);
    } catch (e) {
      setLoadError(e.message || '品牌数据加载失败');
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      setInitLoading(false);
    }
  };

  const fetchTodayBrands = async () => {
    try {
      const resp = await fetch(TODAY_BRAND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!resp.ok) return;
      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload.list) ? payload.list : [];
      setTodayBrands(list.map(mapTodayBrand));
    } catch {
      setTodayBrands([]);
    }
  };

  const fetchFeaturedGoods = async () => {
    try {
      const resp = await fetch(FEATURED_GOODS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: '1', pageSize: 20 })
      });
      if (!resp.ok) return;
      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload.list) ? payload.list : [];
      setFeaturedGoods(list.map(mapFeaturedGoods));
    } catch {
      setFeaturedGoods([]);
    }
  };

  useEffect(() => {
    fetchTodayBrands();
    fetchFeaturedGoods();
    fetchBrands({ append: false, reqPageId: '1' });
  }, []);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (loading || initLoading || !hasMore || !pageId) return;

        const now = Date.now();
        if (now - loadThrottleRef.current < 800) return;
        loadThrottleRef.current = now;

        fetchBrands({ append: true, reqPageId: pageId });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, initLoading, hasMore, pageId]);

  const shownStores = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((s) => {
      if ((s.name || '').toLowerCase().includes(q)) return true;
      return (s.goods || []).some((g) => (g.title || '').toLowerCase().includes(q));
    });
  }, [keyword, brands]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#fff6fa] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#ffcadb] md:shadow-[0_12px_28px_rgba(218,83,137,0.2)]">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#ff6da1_0%,#ff5a93_60%,#f94f89_100%)] text-white">
            <div className="flex items-center gap-3">
              {standalone ? (
                <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <div className="text-[22px] font-bold flex-1">品牌特卖</div>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={17} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#ffd4e2]">
              <MagnifyingGlass size={16} className="text-[#a25d79]" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索品牌或商品"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#5f3248] placeholder:text-[#af8096] outline-none"
              />
              <button className="h-8 min-w-[88px] rounded-full bg-[#ff5b95] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
              {['精选大牌', '补贴加码', '专场折扣'].map((x) => (
                <div key={x} className="h-8 rounded-full bg-white/18 flex items-center justify-center">{x}</div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-[#fffaf4] rounded-2xl border border-[#fde6d7] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-bold text-[#603a4d]">今日大牌</div>
                <div className="text-[12px] text-[#b27a5a]">品牌专享折扣</div>
              </div>
              <div className="mt-3 overflow-x-auto">
                <div className="inline-flex gap-2 min-w-max pr-2">
                  {(todayBrands.length > 0 ? todayBrands : []).map((b) => (
                    <button key={b.id} className="w-[84px] rounded-xl bg-white border border-[#f5d7e4] p-2 text-center">
                      <img src={b.logo} alt={b.name} className="w-10 h-10 mx-auto rounded-full object-cover border border-[#f7d8e6]" />
                      <div className="mt-1 text-[11px] text-[#5f4151] truncate">{b.name}</div>
                      <div className="text-[10px] text-[#e75886]">{b.off}</div>
                      {b.sub ? <div className="text-[10px] text-[#a57a8e] truncate">{b.sub}</div> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#f8f1ff] rounded-2xl border border-[#ead9ff] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-bold text-[#553a7a]">特卖精选</div>
                  <div className="text-[12px] text-[#8b73ac]">品牌热门单品</div>
                </div>
                <button className="h-7 px-3 rounded-full bg-white text-[#7d63a6] text-[12px] border border-[#e1d2f8]">更多</button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <div className="inline-flex gap-2 min-w-max pr-2">
                  {featuredGoods.map((g) => (
                    <div key={g.id} className="w-[118px] bg-white rounded-xl border border-[#e7dbf8] p-2">
                      <img src={g.image} alt={g.title} className="w-full h-[78px] rounded-lg object-cover" />
                      <div className="mt-1 text-[11px] text-[#4f3f67] line-clamp-2 min-h-[30px]">{g.title}</div>
                      <div className="mt-1 text-[#e84b7f] font-bold text-[15px]">¥{g.price}</div>
                      <div className="text-[10px] text-[#896ab5]">{g.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#f3d9e5] p-2 flex gap-2 overflow-x-auto">
              <div className="inline-flex gap-2 min-w-max">
                {tabs.map((t) => {
                  const active = t === activeTab;
                  return (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`h-9 px-4 rounded-full text-[13px] font-semibold ${active ? 'bg-[#ff5b95] text-white' : 'bg-[#fff2f7] text-[#8c5f73]'}`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pb-2">
              {initLoading && <div className="text-[13px] text-[#9c6e82] text-center py-4">品牌数据加载中...</div>}
              {!initLoading && loadError && <div className="text-[13px] text-[#d94b3d] text-center py-4">{loadError}</div>}
              {shownStores.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[#f0d9e3] p-3">
                  <div className="flex items-center gap-3">
                    <img src={s.logo} alt={s.name} className="w-11 h-11 rounded-lg border border-[#f2d6e2]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#4f2f3e] truncate">{s.name}</div>
                      <div className="text-[12px] text-[#907081]">{formatSales(s.sales)}人已购 · {s.discount}</div>
                      {s.features ? <div className="text-[11px] text-[#aa8395] truncate mt-0.5">{s.features}</div> : null}
                    </div>
                    <button className="h-8 px-3 rounded-full bg-[#ff5b95] text-white text-[12px] font-semibold">逛专场</button>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {s.goods.map((g) => (
                      <div key={g.id} className="rounded-xl border border-[#f2dbe6] p-2">
                        <img src={g.image} alt={g.id} className="w-full h-[72px] rounded-lg object-cover" />
                        <div className="mt-1 text-[13px] text-[#e84b7f] font-bold">{g.price}</div>
                        <div className="text-[10px] text-[#8f6c7c]">{g.tag}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {!initLoading && shownStores.length === 0 && !loadError ? <div className="text-[13px] text-[#9c6e82] text-center py-4">暂无品牌数据</div> : null}
              <div ref={loadMoreRef} className="h-8 flex items-center justify-center text-[12px] text-[#b08a9a]">
                {loading && !initLoading ? '加载更多中...' : (!hasMore ? '没有更多了' : '')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, MagnifyingGlass, ShieldCheck, Sparkle, TrendDown } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

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

const tabs = ['精选', '母婴文教', '食品', '美妆', '健康'];
const API_URL = '/home/getBillionSubsidyGoodsList';
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

function formatTimeRange(start, end) {
  if (!start || !end) return '';
  const startStr = String(start).slice(5, 16).replace(' ', ' ');
  const endStr = String(end).slice(5, 16).replace(' ', ' ');
  return `${startStr} - ${endStr}`;
}

function mapGoods(raw = {}) {
  const finalPrice = Number(raw.postRollPrice ?? raw.originalPrice ?? 0);
  const originPrice = Number(raw.originalPrice ?? finalPrice ?? 0);
  const commissionRate = Number(raw.commission ?? 0);
  const commission = finalPrice * (commissionRate / 100);
  const couponPrice = Number(raw.ticketPrice ?? 0);
  const tags = Array.isArray(raw.showTags) ? raw.showTags.slice(0, 4) : [];
  const activities = Array.isArray(raw.activityInfo) ? raw.activityInfo.map((a) => a?.activityName).filter(Boolean).slice(0, 3) : [];
  const couponRange = formatTimeRange(raw.ticketStart, raw.ticketEnd);
  return {
    id: raw.sign ?? raw.goodsLink ?? Math.random(),
    goodsId: raw.sign ?? '',
    title: raw.title || raw.desc || '补贴好物',
    brand: raw.brandName || raw.storeName || '品牌',
    subsidy: couponPrice > 0 ? `券后价 满${toCurrency(raw.ticketWorkingCondition)}减${toCurrency(couponPrice)}` : '补后价',
    rebate: `约返¥${toCurrency(commission)}`,
    rebateRate: `${toCurrency(commissionRate)}%`,
    price: toCurrency(finalPrice),
    originalPrice: toCurrency(originPrice),
    original: toCurrency(originPrice),
    image: raw.pic || 'https://placehold.co/320x320/FDEEE8/B65E4A?text=SUBSIDY',
    couponPrice,
    shopName: raw.storeName || raw.brandName || '品牌店铺',
    coupon: couponPrice > 0 ? `平台券 ¥${toCurrency(couponPrice)}` : '',
    tags,
    activities,
    couponRange
  };
}

function openProductDetail(payload) {
  try {
    sessionStorage.setItem('xc_union_selected_product', JSON.stringify(payload || {}));
    sessionStorage.setItem('xc_union_return_path', '/billion-subsidy');
  } catch {
    // ignore
  }
  navigateTo('/product-detail');
}

export default function BillionSubsidyPage({ standalone = false }) {
  const [activeTab, setActiveTab] = useState('精选');
  const [list, setList] = useState([]);
  const [pageId, setPageId] = useState('1');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const inFlightRef = useRef(false);
  const loadMoreRef = useRef(null);
  const loadThrottleRef = useRef(0);

  const hasMore = list.length < total || (total === 0 && pageId === '1');

  const fetchList = async ({ append, reqPageId }) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setLoadError('');
    try {
      const currentPageId = reqPageId || pageId;
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: currentPageId, pageSize: PAGE_SIZE })
      });
      if (!resp.ok) {
        throw new Error(`百亿补贴接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const payload = json?.data ?? {};
      const rawList = Array.isArray(payload.list) ? payload.list : [];
      const mapped = rawList.map(mapGoods);
      const nextPage = rawList.length >= PAGE_SIZE ? String(Number(currentPageId) + 1) : '';
      setTotal(Number(payload.total ?? 0));
      setList((prev) => (append ? [...prev, ...mapped] : mapped));
      setPageId(nextPage);
    } catch (e) {
      setLoadError(e.message || '加载失败');
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      setInitLoading(false);
    }
  };

  useEffect(() => {
    fetchList({ append: false, reqPageId: '1' });
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
        fetchList({ append: true, reqPageId: pageId });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, initLoading, hasMore, pageId]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#fff6f4] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#ffc7b7] md:shadow-[0_12px_30px_rgba(234,88,12,0.16)]">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#ff6f4f_0%,#ff5a3f_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ArrowLeft size={18} /></button> : null}
              <div className="text-[21px] font-bold flex-1">百亿补贴</div>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><ShieldCheck size={16} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#ffd5cb]">
              <MagnifyingGlass size={16} className="text-[#9b5d4f]" />
              <input placeholder="搜补贴商品" className="flex-1 min-w-0 bg-transparent text-[14px] text-[#5f3a32] placeholder:text-[#b08a80] outline-none" />
              <button className="h-8 min-w-[88px] rounded-full bg-[#ff5f42] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><ShieldCheck size={13} />品牌正品</div>
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><TrendDown size={13} />买贵必赔</div>
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><Sparkle size={13} />补贴</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white rounded-2xl border border-[#ffdccc] p-2 flex gap-2 overflow-x-auto">
              <div className="inline-flex min-w-max gap-2">
                {tabs.map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`h-9 px-4 rounded-full text-[13px] font-semibold ${activeTab === t ? 'bg-[#ff5f42] text-white' : 'bg-[#fff3ef] text-[#a05b4d]'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {initLoading && <div className="text-[13px] text-[#a66a5c] text-center py-4">补贴商品加载中...</div>}
              {!initLoading && loadError && <div className="text-[13px] text-[#d94b3d] text-center py-4">{loadError}</div>}
              {list.map((it) => (
                <button
                  key={it.id}
                  onClick={() => openProductDetail(it)}
                  className="w-full bg-white rounded-[22px] border border-[#fde1d7] p-3 flex gap-3 text-left shadow-[0_4px_14px_rgba(234,88,12,0.05)]"
                >
                  <img src={it.image} alt={it.title} className="w-[104px] h-[104px] rounded-[18px] border border-[#f6ded5] object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="text-[11px] text-[#ff6b4d] font-semibold leading-none">{it.brand}</div>
                    <p className="mt-1 text-[15px] font-semibold text-[#253041] leading-[1.35] line-clamp-2">{it.title}</p>
                    {it.tags.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {it.tags.map((tag) => (
                          <span key={`${it.id}-${tag}`} className="h-5 px-2 rounded-full bg-[#fff2ec] text-[#d66c53] text-[10px] leading-5 border border-[#ffe2d8]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-2 rounded-xl bg-[#fff7f4] border border-[#ffe4da] px-2.5 py-2 flex items-center justify-between gap-2">
                      <span className="text-[12px] text-[#d36e58]">{it.subsidy}</span>
                      <span className="text-[12px] text-[#cf6e58] font-medium whitespace-nowrap">{it.rebate} · {it.rebateRate}</span>
                    </div>
                    {it.couponRange ? <div className="mt-1.5 text-[11px] text-[#b7887b]">券有效期 {it.couponRange}</div> : null}
                    {it.activities.length > 0 ? <div className="mt-1 text-[11px] text-[#a87263] line-clamp-1">活动：{it.activities.join(' / ')}</div> : null}
                    <div className="mt-auto pt-2 flex items-end">
                      <div className="text-[#ef4444] leading-none">
                        <span className="text-[12px] align-baseline">¥</span>
                        <span className="text-[26px] font-bold tracking-tight align-baseline">{it.price}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {!initLoading && !loadError && list.length === 0 ? <div className="text-[13px] text-[#a66a5c] text-center py-4">暂无补贴商品</div> : null}
              <div ref={loadMoreRef} className="h-8 flex items-center justify-center text-[12px] text-[#b48474]">
                {loading && !initLoading ? '加载更多中...' : (!hasMore ? '没有更多了' : '')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

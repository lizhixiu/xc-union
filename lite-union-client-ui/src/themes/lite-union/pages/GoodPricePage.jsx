import { ArrowLeft, ClockCountdown, FireSimple, Info, MagnifyingGlass, ShareNetwork } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

const GOODS_API_URL = '/home/getGoodPriceGoodsList';
const PAGE_SIZE = 20;

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function mapGoodsItem(raw = {}) {
  const finalPrice = Number(raw.actualPrice ?? raw.originalPrice ?? 0);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebateAmount = finalPrice * (commissionRate / 100);
  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    goodsId: raw.goodsId ?? '',
    title: raw.dtitle || raw.title || '未命名商品',
    image: raw.mainPic || 'https://placehold.co/220x220/FCE7E7/8B5E5E?text=GOODS',
    price: toCurrency(finalPrice),
    rebate: toCurrency(rebateAmount),
    sales: raw.monthSales ?? 0,
    shopName: raw.shopName || '店铺',
    brandName: raw.brandName || '其他',
    couponPrice: Number(raw.couponPrice ?? 0)
  };
}

export default function GoodPricePage({ standalone = false }) {
  const [products, setProducts] = useState([]);
  const [pageId, setPageId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [leftTime, setLeftTime] = useState('24:00:00');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

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
        throw new Error(`好价接口请求失败: ${resp.status}`);
      }

      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload?.list) ? payload.list : [];
      const mapped = list.map(mapGoodsItem);
      const nextPageId = list.length >= PAGE_SIZE ? String(Number(currentPageId || '1') + 1) : '';

      setProducts((prev) => (append ? [...prev, ...mapped] : mapped));
      setPageId(nextPageId || '');
      setHasMore(Boolean(nextPageId));
    } catch (e) {
      setLoadError(e.message || '好价商品加载失败');
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
    const updateLeft = () => {
      const now = new Date();
      const passedSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const remain = Math.max(0, 24 * 3600 - passedSeconds);
      const h = String(Math.floor(remain / 3600)).padStart(2, '0');
      const m = String(Math.floor((remain % 3600) / 60)).padStart(2, '0');
      const s = String(remain % 60).padStart(2, '0');
      setLeftTime(`${h}:${m}:${s}`);
    };
    updateLeft();
    const timer = setInterval(updateLeft, 1000);
    return () => clearInterval(timer);
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

        fetchGoods({ append: true, reqPageId: pageId });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, initLoading, hasMore, pageId]);

  const shownProducts = activeKeyword
    ? products.filter((p) => {
        const kw = activeKeyword.toLowerCase();
        return `${p.title} ${p.shopName} ${p.brandName}`.toLowerCase().includes(kw);
      })
    : products;

  const handleSearch = () => {
    setActiveKeyword((searchKeyword || '').trim());
  };

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-4' : 'p-4 md:p-0'}`}>
        <div className="rounded-3xl overflow-hidden border border-[#ffaea6] shadow-[0_10px_24px_rgba(245,66,66,0.2)] h-full flex flex-col">
          <div className="sticky top-0 z-20 p-4 md:p-5 bg-[linear-gradient(135deg,#ff4f4f_0%,#f33c3c_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone && (
                <button onClick={() => window.location.assign('/')} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="text-[20px] md:text-[22px] font-bold tracking-wide flex-1 min-w-0">好价</div>
              {standalone && (
                <>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Info size={16} /></button>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={16} /></button>
                </>
              )}
            </div>
            <div className={`mt-3 h-10 rounded-full bg-white pl-3 pr-1 flex items-center gap-2 border ${inputFocused ? 'border-[#ffd1dd] shadow-[0_0_0_2px_rgba(255,255,255,0.35)]' : 'border-[#ffdbe4]'}`}>
              <MagnifyingGlass size={16} className="text-[#9aa4b2] shrink-0" />
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                placeholder="复合维生素"
                className="flex-1 min-w-0 bg-transparent text-[14px] font-medium text-[#354052] placeholder:text-[#9aa4b2] outline-none"
              />
              <button
                onClick={handleSearch}
                className="h-8 w-[96px] rounded-full text-[16px] font-bold shrink-0"
                style={{ backgroundColor: '#ff2f5b', color: '#ffffff', border: '1px solid #ff6f90' }}
              >
                搜好价
              </button>
            </div>
            <div className="mt-3 h-11 rounded-full bg-[#ff1f54] text-white px-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <FireSimple size={18} weight="fill" />
                <span className="text-[15px] leading-none">实时爆款精选</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-[16px]">
                <ClockCountdown size={16} />
                <span className="text-[15px]">仅剩:</span>
                <span className="inline-flex items-center font-mono tabular-nums tracking-tight">
                  <span className="inline-block w-[2ch] text-center">{leftTime.slice(0, 2)}</span>
                  <span className="inline-block w-[1ch] text-center">:</span>
                  <span className="inline-block w-[2ch] text-center">{leftTime.slice(3, 5)}</span>
                  <span className="inline-block w-[1ch] text-center">:</span>
                  <span className="inline-block w-[2ch] text-center">{leftTime.slice(6, 8)}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-cardWhite p-4 md:p-5 rounded-t-3xl -mt-2 flex-1 overflow-y-auto">
            <div className="space-y-3">
              {initLoading && <div className="text-[13px] text-textMuted text-center py-4">好价商品加载中...</div>}
              {!initLoading && loadError && <div className="text-[13px] text-[#d94b3d] text-center py-4">{loadError}</div>}

              {shownProducts.map((p, idx) => (
                <div key={`${p.id}-${p.goodsId || 'g'}-${idx}`} className="rounded-2xl border border-[#e9e9ee] p-2.5 flex gap-3 bg-white">
                  <img src={p.image} alt={p.title} className="block shrink-0 w-[96px] h-[96px] rounded-lg border border-borderLine object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#2c3440] whitespace-nowrap overflow-hidden">{p.title}</p>
                    <div className="mt-1 text-[12px] text-textMuted flex items-center justify-between gap-2">
                      <span className="truncate text-[#8a93a0]">{p.shopName}</span>
                      {p.brandName && p.brandName !== '其他' ? <span className="shrink-0">{p.brandName}</span> : null}
                    </div>
                    <div className="mt-1.5 h-8 rounded-lg bg-[#fff6ef] border border-[#f9e5d8] px-2 text-[12px] text-[#be925f] flex items-center">
                      约返{Math.round(Number(p.rebate || 0))}元，到手更划算
                    </div>
                    <div className="mt-1.5 flex items-end justify-between gap-2">
                      <div>
                        <div className="text-[#f54242]">
                          <span className="text-[12px]">¥</span>
                          <span className="text-[22px] font-bold">{p.price}</span>
                          <span className="ml-1 text-[15px] font-bold">爆料价</span>
                        </div>
                        <div className="text-[12px] text-[#8f96a3]">月销{p.sales}</div>
                      </div>

                      {p.couponPrice > 0 ? (
                        <div className="h-8 rounded-md bg-[#fff1f1] border border-[#ffdada] flex items-center overflow-hidden shrink-0">
                          <span className="px-2 text-[#ef4444] text-[12px] font-semibold">¥{p.couponPrice} 优惠券</span>
                          <button className="h-full px-2 bg-[#ffe3e3] text-[#ef4444] text-[12px] font-medium border-l border-[#ffd1d1]">领取</button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              {!initLoading && shownProducts.length === 0 ? (
                <div className="text-[13px] text-textMuted text-center py-4">没有匹配的商品</div>
              ) : null}

              <div ref={loadMoreRef} className={`flex items-center justify-center text-[12px] text-textMuted ${hasMore ? 'h-10' : 'h-6 pb-1'}`}>
                {loading && !initLoading ? '加载更多中...' : hasMore ? '下滑加载更多' : '没有更多了'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

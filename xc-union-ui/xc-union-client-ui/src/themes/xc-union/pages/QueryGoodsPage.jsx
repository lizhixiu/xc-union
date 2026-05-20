import { ArrowLeft, DotsThree, FunnelSimple, MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

const APP_BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const USE_HASH_ROUTING = !import.meta.env.DEV;
const QUERY_GOODS_API_URL = '/home/getQueryGoodsList';

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

function mapItem(raw = {}) {
  const price = Number(raw.actualPrice ?? raw.originalPrice ?? 0);
  const origin = Number(raw.originalPrice ?? price);
  const couponPrice = Number(raw.couponPrice ?? 0);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebate = price * (commissionRate / 100);
  const activityName = Array.isArray(raw.activityInfo) && raw.activityInfo.length > 0 ? raw.activityInfo[0]?.activityName : '';
  const couponText = couponPrice > 0
    ? (raw.couponConditions ? `满${raw.couponConditions}减${toCurrency(couponPrice)}元` : `券${toCurrency(couponPrice)}元`)
    : '';

  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    goodsId: raw.goodsId ?? raw.goodsSign ?? '',
    goodsSign: raw.goodsSign ?? '',
    itemLink: raw.itemLink || '',
    title: raw.dtitle || raw.dTitle || raw.title || '优选商品',
    originTitle: raw.title || '',
    desc: raw.desc || '',
    image: raw.mainPic || 'https://placehold.co/360x360/FCE7E7/8B5E5E?text=GOODS',
    price: toCurrency(price),
    originalPrice: toCurrency(origin),
    rebate: toCurrency(rebate),
    couponPrice,
    salesText: `已售${Number(raw.monthSales ?? raw.sales ?? 0) > 10000 ? `${(Number(raw.monthSales ?? raw.sales ?? 0) / 10000).toFixed(1)}万+` : Number(raw.monthSales ?? raw.sales ?? 0)}`,
    discountText: origin > 0 ? `${((price / origin) * 10).toFixed(1)}折` : '超值',
    couponText,
    rebateText: `约返${toCurrency(rebate)}元`,
    lowPriceTag: '近30天低价',
    shopName: raw.shopName || '官方店铺',
    benefitTag: activityName || raw.brandName || '品牌特卖',
    shopType: Number(raw.shopType ?? 0),
    commissionRate: commissionRate
  };
}

export default function QueryGoodsPage({ standalone = false }) {
  const [keyword, setKeyword] = useState('520');
  const [sort, setSort] = useState('comprehensive');
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const k = sessionStorage.getItem('xc_union_search_keyword') || '520';
      setKeyword(k);
    } catch {
      setKeyword('520');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await fetch(QUERY_GOODS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId: '1', pageSize: 40, keyWords: (keyword || '').trim() })
        });
        if (!resp.ok) throw new Error(`查询失败: ${resp.status}`);
        const json = await resp.json();
        const list = Array.isArray(json?.data?.list) ? json.data.list : [];
        if (!cancelled) setGoods(list.map(mapItem));
      } catch (e) {
        if (!cancelled) setError(e.message || '加载失败');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [keyword]);

  const shownGoods = useMemo(() => {
    let list = goods;
    if (sort === 'sales') list = [...list].sort((a, b) => Number((b.salesText.match(/\d+(\.\d+)?/) || ['0'])[0]) - Number((a.salesText.match(/\d+(\.\d+)?/) || ['0'])[0]));
    if (sort === 'finalPrice') list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    return list;
  }, [goods, keyword, sort]);

  const openProductDetail = (payload) => {
    try {
      sessionStorage.setItem('xc_union_selected_product', JSON.stringify(payload || {}));
      sessionStorage.setItem('xc_union_return_path', '/query-goods');
    } catch {
      // ignore
    }
    navigateTo('/product-detail');
  };

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-3 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#F6F7FB] md:rounded-3xl md:overflow-hidden">
          <div className="sticky top-0 z-20 bg-[linear-gradient(180deg,#FFEFF3_0%,#F6F7FB_80%)] px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo('/')} className="w-9 h-9 rounded-full bg-white text-[#444] flex items-center justify-center">
                <ArrowLeft size={18} />
              </button>
              <div className="flex-1 h-9 rounded-full bg-white px-3 flex items-center gap-2">
                <MagnifyingGlass size={15} className="text-[#888]" />
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="flex-1 bg-transparent outline-none text-[14px]" />
              </div>
              <button className="w-9 h-9 rounded-full bg-white text-[#666] flex items-center justify-center">
                <DotsThree size={18} />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-5 gap-1 text-[13px]">
              {[
                ['comprehensive', '综合'],
                ['sales', '销量'],
                ['finalPrice', '到手价'],
                ['discount', '折扣']
              ].map(([k, label]) => (
                <button key={k} onClick={() => setSort(k)} className={`h-8 ${sort === k ? 'text-[#FF0036] font-semibold' : 'text-[#444]'}`}>{label}</button>
              ))}
              <button className="h-8 text-[#444] inline-flex items-center justify-center gap-1">筛选<FunnelSimple size={12} /></button>
            </div>

            <div className="mt-1 flex flex-wrap gap-2">
              {['优惠券', '一淘专享券', '超值给力', '品牌特卖', '今日超划算', '百亿补贴', '天猫超市'].map((x) => (
                <button key={x} className="h-8 px-3 rounded-full bg-[#EEF0F4] text-[#555] text-[12px]">{x}</button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {loading ? <div className="text-center text-[13px] text-[#888] py-8">查询中...</div> : null}
            {!loading && error ? <div className="text-center text-[13px] text-[#d94b3d] py-8">{error}</div> : null}
            {!loading && !error ? (
              <div className="grid grid-cols-2 gap-2.5">
                {shownGoods.map((g) => (
                  <button key={`${g.id}-${g.goodsId}`} onClick={() => openProductDetail(g)} className="bg-white rounded-2xl p-2 text-left border border-[#ECEFF4]">
                    <img src={g.image} alt={g.title} className="w-full aspect-square rounded-xl object-cover" />
                    <div className="mt-1.5 text-[13px] leading-[1.35] text-[#111] line-clamp-2">{g.title}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-[#FF0036] font-bold"><span className="text-[11px]">¥</span><span className="text-[18px]">{g.price}</span></div>
                      <span className="text-[11px] text-[#999]">{g.salesText}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="h-5 px-1.5 rounded bg-[#FFF0F2] text-[#FF0036] text-[10px] inline-flex items-center">{g.discountText}</span>
                      {g.couponText ? <span className="h-5 px-1.5 rounded bg-[#FFF4ED] text-[#FF5000] text-[10px] inline-flex items-center">{g.couponText} {g.rebateText}</span> : null}
                      <span className="h-5 px-1.5 rounded bg-[#F5F7FA] text-[#6B7280] text-[10px] inline-flex items-center">{g.lowPriceTag}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-[#7E8899] truncate">{g.shopName}</span>
                      <span className="text-[#FF5000]">{g.benefitTag}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button className="fixed right-4 bottom-[88px] w-12 h-12 rounded-full bg-white border border-[#E5E7EB] shadow-[0_6px_14px_rgba(0,0,0,0.12)] text-[12px] text-[#555]">
            反馈
          </button>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, DotsThree, Lightning } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

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

const API_URL = '/home/seckillList';

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

function formatTimeText(ddqTime) {
  if (!ddqTime || typeof ddqTime !== 'string') return '--:--';
  const parts = ddqTime.split(' ');
  if (parts.length < 2) return '--:--';
  return parts[1].slice(0, 5);
}

function mapGoods(raw = {}) {
  const finalPrice = Number(raw.actualPrice ?? 0);
  const originPrice = Number(raw.originalPrice ?? 0);
  const commissionRate = Number(raw.commissionRate ?? 0);
  const rebate = finalPrice * (commissionRate / 100);
  const drop = Math.max(originPrice - finalPrice, 0);
  const heat = Math.min(100, Math.max(12, Math.round((Number(raw.twoHoursSales ?? 0) / 1200) * 100)));

  return {
    id: raw.id ?? raw.goodsId ?? Math.random(),
    title: raw.dtitle || raw.title || '秒杀好物',
    desc: raw.ddqDesc || raw.specialText?.[0] || `${raw.shopName || '好店'}限时秒杀`,
    price: toCurrency(finalPrice),
    oldPrice: originPrice > finalPrice ? toCurrency(originPrice) : '',
    drop: drop > 0 ? `直降¥${toCurrency(drop)}` : '限时秒杀',
    heat,
    sold: `已售${formatSales(raw.monthSales)}`,
    image: raw.mainPic || 'https://placehold.co/320x320/FEE2E2/B91C1C?text=FLASH',
    couponPrice: Number(raw.couponPrice ?? 0),
    rebate: toCurrency(rebate),
    originalPrice: toCurrency(originPrice || finalPrice),
    original: toCurrency(originPrice || finalPrice),
    shopName: raw.shopName || raw.brandName || '品牌店铺',
    coupon: Number(raw.couponPrice ?? 0) > 0 ? `平台券 ¥${toCurrency(raw.couponPrice)}` : ''
  };
}

function openProductDetail(payload) {
  try {
    sessionStorage.setItem('lite_union_selected_product', JSON.stringify(payload || {}));
    sessionStorage.setItem('lite_union_return_path', '/flash-sale');
  } catch {
    // ignore
  }
  navigateTo('/product-detail');
}

export default function TaobaoFlashSalePage({ standalone = false }) {
  const [goods, setGoods] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [activeRoundTime, setActiveRoundTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSeckill = async (roundTime = '') => {
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roundTime ? { roundTime } : {})
      });
      if (!resp.ok) {
        throw new Error(`秒杀接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const payload = json?.data ?? {};
      const goodsList = Array.isArray(payload.goodsList) ? payload.goodsList : [];
      const roundsList = Array.isArray(payload.roundsList) ? payload.roundsList : [];
      const active = payload.ddqTime || roundsList.find((r) => Number(r.status) === 1)?.ddqTime || roundsList[0]?.ddqTime || '';

      setGoods(goodsList.map(mapGoods));
      setRounds(roundsList);
      setActiveRoundTime(active);
    } catch (e) {
      setError(e.message || '加载失败');
      setGoods([]);
      setRounds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeckill('');
  }, []);

  const activeRoundLabel = useMemo(() => {
    if (!activeRoundTime) return '当前场次';
    return `${formatTimeText(activeRoundTime)} 场`;
  }, [activeRoundTime]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#fff5f5] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#ffb8b8] md:shadow-[0_12px_30px_rgba(236,72,72,0.18)]">
          <div className="sticky top-0 z-20 px-4 pt-4 pb-3 bg-[linear-gradient(160deg,#ff5959_0%,#ef4444_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ArrowLeft size={18} /></button> : null}
              <div className="text-[22px] font-bold flex-1">淘宝秒杀</div>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><DotsThree size={18} /></button>
            </div>
          </div>

          {rounds.length > 0 ? (
            <div className="bg-white rounded-t-[16px] border-b border-[#ffe2e2] px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {rounds.map((r) => {
                  const isActive = r.ddqTime === activeRoundTime || Number(r.status) === 1;
                  const statusText = Number(r.status) === 0 ? '已开抢' : Number(r.status) === 1 ? '抢购中' : '即将开抢';
                  return (
                    <button
                      key={r.ddqTime}
                      type="button"
                      onClick={() => fetchSeckill(r.ddqTime)}
                      className={`h-10 px-3 rounded-lg border text-left ${isActive ? 'bg-gradient-to-r from-[#FF0036] to-[#FF4724] border-transparent text-white shadow-[0_4px_10px_rgba(255,0,54,0.25)]' : 'bg-white border-[#f0dada] text-[#8b95a5]'}`}
                    >
                      <div className="text-[12px] font-semibold leading-none">{formatTimeText(r.ddqTime)}</div>
                      <div className={`mt-1 text-[10px] leading-none ${isActive ? 'text-white/90' : ''}`}>{statusText}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {loading ? <div className="text-center text-[13px] text-[#8b95a5] py-6">秒杀商品加载中...</div> : null}
            {!loading && error ? <div className="text-center text-[13px] text-[#d94b3d] py-6">{error}</div> : null}

            {!loading && !error
              ? goods.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => openProductDetail(it)}
                    className="w-full bg-white rounded-2xl border border-[#ffe2e2] p-3 flex gap-3 text-left"
                  >
                    <img src={it.image} alt={it.title} className="w-[112px] h-[112px] rounded-xl border border-[#f6dede] object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-[#FFF0F2] text-[#FF0036] text-[10px] leading-none font-semibold"><Lightning size={9} />限时秒杀</span>
                        <p className="text-[15px] font-semibold text-[#2f3a4d] line-clamp-1">{it.title}</p>
                      </div>
                      <div className="mt-1 text-[12px] text-[#8b95a5] line-clamp-1">{it.desc}</div>
                      <div className="mt-2 h-[6px] rounded-full bg-[#FFF0F2] overflow-hidden"><div className="h-full bg-[#FF0036] rounded-full" style={{ width: `${it.heat}%` }} /></div>
                      <div className="mt-2 flex items-end justify-between">
                        <div>
                          <div className="text-[#ef4444]"><span className="text-[12px]">¥</span><span className="text-[24px] font-bold">{it.price}</span></div>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] bg-[#FFF4ED] text-[#FF5000] text-[10px] leading-none">约返 ¥{it.rebate}</span>
                            <span className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] bg-[#FFF4ED] text-[#FF5000] text-[10px] leading-none">{it.drop}</span>
                          </div>
                          {it.oldPrice ? <div className="text-[11px] text-[#8b95a5] mt-0.5">原价¥{it.oldPrice}</div> : null}
                          <div className="text-[11px] text-[#8b95a5] mt-0.5">{it.sold}</div>
                        </div>
                        <span className="inline-flex items-center rounded-full h-[28px] px-4 bg-gradient-to-r from-[#FF4724] to-[#FF0036] text-white text-[13px] font-bold">抢购</span>
                      </div>
                    </div>
                  </button>
                ))
              : null}

            {!loading && !error && goods.length === 0 ? <div className="text-center text-[13px] text-[#8b95a5] py-6">暂无秒杀商品</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

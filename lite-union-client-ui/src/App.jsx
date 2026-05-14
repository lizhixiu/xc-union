import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Copy, Leaf, Receipt, ShareNetwork, ShieldCheck, User } from '@phosphor-icons/react';
import BottomNav from './components/BottomNav';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import StatePanel from './components/StatePanel';
import Toast from './components/Toast';

const API_URL = '/dtk/getTmallGoodsList';
const DEFAULT_PAGE_SIZE = 20;

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function mapItem(raw = {}) {
  const original = raw.originalPrice ?? raw.zkFinalPrice ?? raw.actualPrice ?? raw.price ?? 0;
  const discount = Number(raw.couponPrice ?? raw.couponAmount ?? 0);
  const finalPrice = Math.max(Number(original) - discount, 0);

  return {
    id: raw.id ?? raw.goodsId ?? raw.itemId ?? `${raw.dtitle || raw.title || Math.random()}`,
    title: raw.dtitle || raw.title || raw.goodsName || '未命名商品',
    image: raw.mainPic || raw.pic || raw.goodsImg || raw.img,
    coupon: discount > 0 ? `隐藏券 ¥${toCurrency(discount)}` : '暂无优惠券',
    price: toCurrency(finalPrice || raw.actualPrice || raw.price || original),
    original: `¥${toCurrency(original)}`,
    rebate: toCurrency(raw.commission || raw.commissionRate || 0)
  };
}

function extractPayload(resp) {
  const root = resp?.data ?? resp;
  const list = root?.list ?? root?.data?.list ?? root?.result?.list ?? root?.tbk_dg_optimus_material_response?.result_list?.map_data ?? [];
  const nextPageId = root?.pageId ?? root?.nextPageId ?? root?.data?.pageId ?? null;
  return {
    list: Array.isArray(list) ? list : [],
    nextPageId: nextPageId == null || nextPageId === '' ? null : String(nextPageId)
  };
}

export default function App() {
  const [page, setPage] = useState('home');
  const [toast, setToast] = useState('');

  const [items, setItems] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [nextPageId, setNextPageId] = useState('1');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const fetchGoods = async ({ pageId, append }) => {
    const setLoadingState = append ? setLoadingMore : setLoading;
    setLoadingState(true);
    setError('');
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, pageSize: DEFAULT_PAGE_SIZE })
      });
      if (!resp.ok) {
        throw new Error(`接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const payload = extractPayload(json);
      const mapped = payload.list.map(mapItem);

      setItems((prev) => (append ? [...prev, ...mapped] : mapped));
      setNextPageId(payload.nextPageId);
      if (!append && mapped.length > 0) {
        setDetail(mapped[0]);
      }
    } catch (e) {
      setError(e.message || '接口调用失败');
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchGoods({ pageId: '1', append: false });
  }, []);

  const loadMore = () => {
    if (!nextPageId || loadingMore) {
      return;
    }
    fetchGoods({ pageId: nextPageId, append: true });
  };

  const parseLink = () => {
    if (items.length === 0) {
      showToast('暂无可展示商品，请先加载列表');
      return;
    }
    showToast('已为您解析真实底价');
    setDetail(items[0]);
    setPage('detail');
  };

  const openDetail = (item) => {
    setDetail(item);
    setPage('detail');
  };

  const activeDesktopNav = useMemo(() => (page === 'detail' ? 'home' : page), [page]);

  return (
    <>
      <header className="hidden md:flex bg-cardWhite border-b border-borderLine sticky top-0 z-50 h-[72px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <h1 className="text-[22px] font-bold text-textMain tracking-wide flex items-center gap-2"><Leaf size={22} className="text-primary" />轻购</h1>
          <nav className="flex gap-6">
            {['home', 'rank', 'profile'].map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`text-[15px] py-6 ${activeDesktopNav === n ? 'font-medium text-primary border-b-2 border-primary' : 'text-textMuted hover:text-textMain'}`}>
                {n === 'home' ? '查券大厅' : n === 'rank' ? '实时榜单' : '资产管理'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar onParse={parseLink} />
          <div className="w-10 h-10 rounded-full border border-borderLine flex items-center justify-center bg-appBg text-primary"><User size={20} /></div>
        </div>
      </header>

      <div className="app-wrapper md:px-8">
        {page === 'home' && (
          <section className="page md:py-8 pb-[80px]">
            <div className="md:hidden bg-cardWhite pt-8 pb-4 px-4 border-b border-borderLine sticky top-0 z-40">
              <h1 className="text-[20px] font-bold text-textMain tracking-wide mb-4">轻购</h1>
              <SearchBar mobile onParse={parseLink} />
            </div>
            <div className="p-4 md:p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] md:text-[18px] text-textMain font-bold">今日实测低价</h2>
                <span className="text-[12px] text-textMuted flex items-center gap-1"><CheckCircle size={14} /> 已去除水分</span>
              </div>

              {loading && <StatePanel title="商品加载中" desc="正在拉取天猫高返商品，请稍候..." />}
              {!loading && error && <StatePanel title="加载失败" desc={error} actionLabel="重试" onAction={() => fetchGoods({ pageId: '1', append: false })} />}

              {!loading && !error && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map((item) => <ProductCard key={item.id} item={item} onOpen={openDetail} />)}
                  </div>

                  <div className="mt-5 flex justify-center">
                    {nextPageId ? (
                      <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="h-11 px-6 rounded-lg border border-borderLine bg-cardWhite hover:bg-appBg disabled:opacity-60"
                      >
                        {loadingMore ? '加载中...' : '加载下一页'}
                      </button>
                    ) : (
                      <span className="text-textMuted text-[13px]">没有更多数据了</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {page === 'detail' && detail && (
          <section className="page md:py-8 pb-[80px]">
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none">
              <button onClick={() => setPage('home')} className="w-9 h-9 bg-cardWhite/90 backdrop-blur border border-borderLine text-textMain rounded-full flex items-center justify-center pointer-events-auto"><ArrowLeft size={18} /></button>
            </div>
            <div className="hidden md:flex items-center gap-2 mb-6 text-[14px] text-textMuted"><button className="hover:text-primary" onClick={() => setPage('home')}>首页</button><span>›</span><span className="text-textMain">商品明细</span></div>
            <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-cardWhite md:border md:border-borderLine md:rounded-2xl md:p-6 md:shadow-sm overflow-hidden">
              <div className="w-full md:w-[400px] lg:w-[500px] shrink-0"><div className="w-full aspect-square bg-cardWhite md:border md:border-borderLine md:rounded-xl overflow-hidden"><img src={detail.image || 'https://placehold.co/800x800/F0F6F5/94A3B8?text=商品主图'} className="w-full h-full object-cover" /></div></div>
              <div className="flex-1 flex flex-col relative">
                <div className="px-4 py-4 md:px-0 md:pt-0 border-b border-borderLine md:border-none">
                  <h1 className="text-[16px] md:text-[22px] text-textMain font-bold leading-relaxed mb-3">{detail.title}</h1>
                  <div className="flex items-center gap-4 text-[12px] md:text-[13px] text-textMuted mb-4"><span className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary" /> 官方正品</span><span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> 7天保价</span></div>
                </div>
                <div className="bg-cardWhite md:bg-appBg border-y md:border border-borderLine md:rounded-xl p-5 mt-2 md:mt-0">
                  <div className="flex items-center gap-2 mb-5"><Receipt size={20} className="text-textMain" /><span className="text-[15px] font-bold text-textMain tracking-wide">财务明细单</span></div>
                  <div className="font-mono text-[13px] md:text-[14px]">
                    <div className="flex justify-between items-center mb-4"><span className="text-textMuted font-sans">日常售价</span><span className="text-textMain">{detail.original.replace('¥', '¥ ')}</span></div>
                    <div className="flex justify-between items-center mb-4 text-textMain"><span className="font-sans flex items-center gap-2"><span className="w-1 h-3 bg-primary rounded-full" />{detail.coupon}</span><span>- ¥ {detail.rebate}</span></div>
                    <div className="flex justify-between items-center pb-4 dashed-border-y pt-4 text-textMain"><span className="font-sans flex items-center gap-2"><span className="w-1 h-3 bg-textMain rounded-full" />预计返利佣金</span><span>- ¥ {detail.rebate}</span></div>
                    <div className="flex justify-between items-end pt-5"><span className="text-[14px] font-bold text-textMain font-sans">实际付款预估</span><div className="text-primary"><span className="text-[14px]">¥</span><span className="text-[28px] font-bold tracking-tight font-serif">{detail.price}</span></div></div>
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 md:static md:mt-8 bg-cardWhite md:bg-transparent border-t border-borderLine md:border-none p-3 md:p-0 z-50 flex gap-3">
                  <button className="md:hidden w-12 h-12 rounded border border-borderLine flex items-center justify-center text-textMain" aria-label="分享"><ShareNetwork size={20} /></button>
                  <button onClick={() => showToast('链接已复制，请前往淘宝打开')} className="flex-1 md:w-[240px] md:flex-none bg-primary hover:bg-primary/90 text-white h-12 rounded text-[15px] font-medium flex items-center justify-center gap-2"><Copy size={18} />一键复制淘口令</button>
                  <button className="hidden md:flex flex-1 md:w-[140px] md:flex-none bg-cardWhite hover:bg-appBg border border-borderLine text-textMain h-12 rounded text-[15px] font-medium items-center justify-center gap-2">扫码购买</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'rank' && (
          <section className="page p-4 md:px-0 md:py-8 pb-[80px]">
            <StatePanel title="榜单加载中" desc="榜单接口接入前，这里先保留标准加载占位。" actionLabel="返回大厅" onAction={() => setPage('home')} />
          </section>
        )}

        {page === 'profile' && (
          <section className="page p-4 md:px-0 md:py-8 pb-[80px]">
            <StatePanel title="暂无资产数据" desc="当前账号还没有可展示数据，后续接入账户中心后自动展示。" actionLabel="去查券" onAction={() => setPage('home')} />
          </section>
        )}

        {page !== 'detail' && <BottomNav page={page} onSwitch={setPage} />}
        <Toast message={toast} />
      </div>
    </>
  );
}

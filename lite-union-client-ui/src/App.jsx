import { useMemo, useState } from 'react';
import { ArrowLeft, Clock, Copy, Leaf, Receipt, ShareNetwork, ShieldCheck, User } from '@phosphor-icons/react';
import BottomNav from './components/BottomNav';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import MailboxAuthPanel from './components/MailboxAuthPanel';
import HomeDealsPage from './themes/lite-union/pages/HomePage';
import HotDealsRankPage from './themes/lite-union/pages/GoodPricePage';

const PARSE_API_URL = '/dtk/tbService/parseContent';

function toCurrency(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function extractParseData(resp) {
  return resp?.data?.data?.data ?? resp?.data?.data ?? resp?.data ?? {};
}

function mapParseItem(raw = {}) {
  const originPrice = Number(raw?.originInfo?.price ?? 0);
  const threshold = Number(raw?.originInfo?.startFee ?? 0);
  const couponAmount = Number(raw?.originInfo?.amount ?? 0);
  const commission = Number(raw?.commissionRate ?? 0);
  const finalPrice = Math.max(originPrice - couponAmount, 0);

  return {
    id: raw.goodsId ?? raw.itemId ?? `${raw.itemName || raw.title || Math.random()}`,
    title: raw.itemName || raw?.originInfo?.title || '未命名商品',
    image: raw.mainPic || raw?.originInfo?.image || '',
    coupon: couponAmount > 0 ? `满${toCurrency(threshold)}减${toCurrency(couponAmount)}` : '暂无优惠券',
    price: toCurrency(finalPrice || originPrice),
    original: `¥${toCurrency(originPrice)}`,
    rebate: toCurrency(commission),
    cpsFullTpwd: raw.cpsFullTpwd || '',
    couponLongUrl: raw.couponLongUrl || '',
    shortUrl: raw.shortUrl || '',
    itemLink: raw.itemLink || raw.shortUrl || raw.originUrl || ''
  };
}

async function copyTextWithFallback(text) {
  if (!text) {
    return false;
  }

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback to execCommand below
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function App() {
  const isGoodPriceRoute = typeof window !== 'undefined' && window.location.pathname === '/good-price';
  const [page, setPage] = useState('home');
  const [toast, setToast] = useState('');

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [lastPastedText, setLastPastedText] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const requestParse = async (content) => {
    const parsedContent = (content || '').trim();
    if (!parsedContent) {
      showToast('请输入内容');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const resp = await fetch(PARSE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: parsedContent })
      });
      if (!resp.ok) {
        throw new Error(`解析接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const parsed = extractParseData(json);
      const mapped = mapParseItem(parsed);

      setDetail(mapped);
      setPage('detail');
      setSearchText(parsedContent);
      showToast('解析成功');
    } catch (e) {
      setError(e.message || '解析失败');
      showToast(e.message || '解析失败');
    } finally {
      setLoading(false);
    }
  };

  const parseLink = async () => {
    let text = (searchText || '').trim();

    if (navigator?.clipboard?.readText) {
      try {
        const clipboardText = (await navigator.clipboard.readText()).trim();
        if (clipboardText) {
          text = clipboardText;
          setSearchText(clipboardText);
          setLastPastedText(clipboardText);
        }
      } catch {
        // ignore clipboard read error and fallback to input content
      }
    }

    if (!text) {
      showToast('请输入内容');
      return;
    }
    setLastPastedText(text);
    await requestParse(text);
  };

  const handlePasteCapture = (text) => {
    const pasted = (text || '').trim();
    setLastPastedText(pasted);
  };

  const openQrModal = () => {
    const qrText = (detail?.shortUrl || '').trim();
    if (!qrText) {
      showToast('暂无可生成二维码的口令');
      return;
    }
    setShowQrModal(true);
  };

  const activeDesktopNav = useMemo(() => (page === 'detail' ? 'home' : page), [page]);

  if (isGoodPriceRoute) {
    return (
      <div className="min-h-screen bg-appBg">
        <div className="max-w-[1200px] mx-auto md:px-8">
          <HotDealsRankPage standalone />
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="hidden md:flex bg-cardWhite border-b border-borderLine sticky top-0 z-50 h-[72px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <h1 className="text-[22px] font-bold text-textMain tracking-wide flex items-center gap-2"><Leaf size={22} className="text-primary" />轻购</h1>
          <nav className="flex gap-6">
            {['home', 'rank', 'profile'].map((n) => (
              <button
                key={n}
                onClick={() => (n === 'rank' ? window.location.assign('/good-price') : setPage(n))}
                className={`text-[15px] py-6 ${activeDesktopNav === n ? 'font-medium text-primary border-b-2 border-primary' : 'text-textMuted hover:text-textMain'}`}
              >
                {n === 'home' ? '首页' : n === 'rank' ? '好价' : '我'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onPasteCapture={handlePasteCapture}
            onParse={parseLink}
          />
          <button
            onClick={() => setPage('profile')}
            aria-label="打开资产管理"
            className="w-10 h-10 rounded-full border border-borderLine flex items-center justify-center bg-appBg text-primary hover:bg-primaryLight transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </header>

      <div className="app-wrapper md:px-8">
        {page === 'home' && (
          <HomeDealsPage />
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
                  <button
                    onClick={async () => {
                      const content = detail.cpsFullTpwd || detail.itemLink;
                      if (!content) {
                        showToast('暂无可复制内容');
                        return;
                      }
                      const copied = await copyTextWithFallback(content);
                      if (copied) {
                        showToast('已复制，请前往淘宝打开');
                      } else {
                        showToast('复制失败，请手动长按复制');
                      }
                    }}
                    className="flex-1 md:w-[240px] md:flex-none bg-primary hover:bg-primary/90 text-white h-12 rounded text-[15px] font-medium flex items-center justify-center gap-2"
                  >
                    <Copy size={18} />一键复制淘口令
                  </button>
                  <button onClick={openQrModal} className="hidden md:flex flex-1 md:w-[140px] md:flex-none bg-cardWhite hover:bg-appBg border border-borderLine text-textMain h-12 rounded text-[15px] font-medium items-center justify-center gap-2">扫码购买</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'profile' && (
          <section className="page p-4 md:px-0 md:py-8 pb-[80px]">
            <MailboxAuthPanel onToast={showToast} />
          </section>
        )}

        {page !== 'detail' && <BottomNav page={page} onSwitch={(next) => (next === 'rank' ? window.location.assign('/good-price') : setPage(next))} />}
        <Toast message={toast} />
        {showQrModal && (
          <div className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4" onClick={() => setShowQrModal(false)}>
            <div className="w-full max-w-[320px] rounded-2xl bg-cardWhite p-5 border border-borderLine shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[16px] font-bold text-textMain text-center">扫码购买</h3>
              <div className="w-[220px] h-[220px] mx-auto mt-4 bg-appBg rounded-xl border border-borderLine overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(detail?.shortUrl || '')}`}
                  alt="购买二维码"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full mt-4 h-10 rounded-lg bg-primary text-white text-[14px] font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

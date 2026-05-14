import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Copy, Leaf, Receipt, ShareNetwork, ShieldCheck, User } from '@phosphor-icons/react';
import BottomNav from './components/BottomNav';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import StatePanel from './components/StatePanel';
import Toast from './components/Toast';

const items = [
  { id: 1, title: 'Lamer 海蓝之谜精粹水 150ml 保湿修护', coupon: '隐藏券 ¥300', price: '750.0', original: '¥1050' },
  { id: 2, title: '蕉下防晒衣女 冰丝透气防紫外线长袖', coupon: '隐藏券 ¥50', price: '149.0', original: '¥199' },
  { id: 3, title: 'SK-II 神仙水 230ml 精华液 官方正品', coupon: '隐藏券 ¥700', price: '890.0', original: '¥1590' },
  { id: 4, title: 'Apple iPhone 15 Pro 256G 钛金属', coupon: '百亿补贴', price: '7999.0', original: '¥8999' }
];

export default function App() {
  const [page, setPage] = useState('home');
  const [toast, setToast] = useState('');
  const [detail, setDetail] = useState(items[0]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const parseLink = () => {
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
          <h1 className="text-[22px] font-bold text-textMain tracking-wide flex items-center gap-2"><Leaf size={22} className="text-primary" />精明购</h1>
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
              <h1 className="text-[20px] font-bold text-textMain tracking-wide mb-4">精明购</h1>
              <SearchBar mobile onParse={parseLink} />
            </div>
            <div className="p-4 md:p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] md:text-[18px] text-textMain font-bold">今日实测低价</h2>
                <span className="text-[12px] text-textMuted flex items-center gap-1"><CheckCircle size={14} /> 已去除水分</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => <ProductCard key={item.id} item={item} onOpen={openDetail} />)}
              </div>
            </div>
          </section>
        )}

        {page === 'detail' && (
          <section className="page md:py-8 pb-[80px]">
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none">
              <button onClick={() => setPage('home')} className="w-9 h-9 bg-cardWhite/90 backdrop-blur border border-borderLine text-textMain rounded-full flex items-center justify-center pointer-events-auto"><ArrowLeft size={18} /></button>
            </div>
            <div className="hidden md:flex items-center gap-2 mb-6 text-[14px] text-textMuted"><button className="hover:text-primary" onClick={() => setPage('home')}>首页</button><span>›</span><span className="text-textMain">商品明细</span></div>
            <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-cardWhite md:border md:border-borderLine md:rounded-2xl md:p-6 md:shadow-sm overflow-hidden">
              <div className="w-full md:w-[400px] lg:w-[500px] shrink-0"><div className="w-full aspect-square bg-cardWhite md:border md:border-borderLine md:rounded-xl overflow-hidden"><img src="https://placehold.co/800x800/F0F6F5/94A3B8?text=商品主图" className="w-full h-full object-cover" /></div></div>
              <div className="flex-1 flex flex-col relative">
                <div className="px-4 py-4 md:px-0 md:pt-0 border-b border-borderLine md:border-none">
                  <h1 className="text-[16px] md:text-[22px] text-textMain font-bold leading-relaxed mb-3">{detail.title}</h1>
                  <div className="flex items-center gap-4 text-[12px] md:text-[13px] text-textMuted mb-4"><span className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary" /> 官方正品</span><span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> 7天保价</span></div>
                </div>
                <div className="bg-cardWhite md:bg-appBg border-y md:border border-borderLine md:rounded-xl p-5 mt-2 md:mt-0">
                  <div className="flex items-center gap-2 mb-5"><Receipt size={20} className="text-textMain" /><span className="text-[15px] font-bold text-textMain tracking-wide">财务明细单</span></div>
                  <div className="font-mono text-[13px] md:text-[14px]">
                    <div className="flex justify-between items-center mb-4"><span className="text-textMuted font-sans">日常售价</span><span className="text-textMain">{detail.original.replace('¥', '¥ ')}</span></div>
                    <div className="flex justify-between items-center mb-4 text-textMain"><span className="font-sans flex items-center gap-2"><span className="w-1 h-3 bg-primary rounded-full" />{detail.coupon}</span><span>- ¥ 300.00</span></div>
                    <div className="flex justify-between items-center pb-4 dashed-border-y pt-4 text-textMain"><span className="font-sans flex items-center gap-2"><span className="w-1 h-3 bg-textMain rounded-full" />预计返利佣金</span><span>- ¥ 50.00</span></div>
                    <div className="flex justify-between items-end pt-5"><span className="text-[14px] font-bold text-textMain font-sans">实际付款预估</span><div className="text-primary"><span className="text-[14px]">¥</span><span className="text-[28px] font-bold tracking-tight font-serif">{detail.price}</span></div></div>
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 md:static md:mt-8 bg-cardWhite md:bg-transparent border-t border-borderLine md:border-none p-3 md:p-0 z-50 flex gap-3">
                  <button className="md:hidden w-12 h-12 rounded border border-borderLine flex items-center justify-center text-textMain" aria-label="分享"><ShareNetwork size={20} /></button>
                  <button onClick={() => showToast('口令已复制，请手动打开淘宝App')} className="flex-1 md:w-[240px] md:flex-none bg-primary hover:bg-primary/90 text-white h-12 rounded text-[15px] font-medium flex items-center justify-center gap-2"><Copy size={18} />一键复制淘口令</button>
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

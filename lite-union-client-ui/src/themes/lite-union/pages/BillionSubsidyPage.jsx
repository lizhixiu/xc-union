import { ArrowLeft, MagnifyingGlass, ShieldCheck, Sparkle, TrendDown } from '@phosphor-icons/react';
import { useState } from 'react';

const tabs = ['精选', '母婴文教', '食品', '美妆', '健康'];

const list = [
  { id: 'y1', title: '特仑苏纯牛奶250ml*16盒 官方直供', brand: '特仑苏', subsidy: '补后价', rebate: '约返¥0.87', price: '33.90', market: '¥39.90', sales: '已售100万+', image: 'https://placehold.co/220x220/FEEFEF/C17373?text=SUB' },
  { id: 'y2', title: '认养一头牛纯牛奶200ml*20盒', brand: '认养一头牛', subsidy: '补后价', rebate: '约返¥6.51', price: '64.90', market: '¥74.90', sales: '已售4万+', image: 'https://placehold.co/220x220/FDF1F1/BE7272?text=SUB' },
  { id: 'y3', title: '婴幼儿维生素D3滴剂 30ml', brand: '健敏思', subsidy: '补后价', rebate: '约返¥5.12', price: '162.00', market: '¥189.00', sales: '已售2万+', image: 'https://placehold.co/220x220/FCEEEF/C67676?text=SUB' }
];

export default function BillionSubsidyPage({ standalone = false }) {
  const [activeTab, setActiveTab] = useState('精选');

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-4' : 'p-4 md:p-0'}`}>
        <div className="h-full rounded-3xl overflow-hidden border border-[#ffc7b7] bg-[#fff6f4] shadow-[0_12px_30px_rgba(234,88,12,0.16)] flex flex-col">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#ff6f4f_0%,#ff5a3f_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? <button onClick={() => window.location.assign('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ArrowLeft size={18} /></button> : null}
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
              <div className="h-8 rounded-full bg-white/18 flex items-center justify-center gap-1"><Sparkle size={13} />一淘补贴</div>
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
              {list.map((it) => (
                <div key={it.id} className="bg-white rounded-2xl border border-[#fde1d7] p-3 flex gap-3">
                  <img src={it.image} alt={it.title} className="w-[108px] h-[108px] rounded-xl border border-[#f6ded5] object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#ff6b4d] font-semibold">{it.brand}</div>
                    <p className="text-[14px] font-semibold text-[#2f3a4d] line-clamp-2">{it.title}</p>
                    <div className="mt-1 h-7 rounded-lg bg-[#fff5f0] border border-[#ffe2d8] px-2 text-[12px] text-[#c06553] flex items-center justify-between"><span>{it.subsidy}</span><span>{it.rebate}</span></div>
                    <div className="mt-1.5 flex items-end justify-between">
                      <div>
                        <div className="text-[#ef4444]"><span className="text-[12px]">¥</span><span className="text-[24px] font-bold">{it.price}</span></div>
                        <div className="text-[11px] text-[#a8b1bf]">全网参考 {it.market}</div>
                      </div>
                      <div className="text-[11px] text-[#8b95a5]">{it.sales}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

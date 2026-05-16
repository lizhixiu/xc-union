import { ArrowLeft, ClockCountdown, FireSimple, Info, ShareNetwork } from '@phosphor-icons/react';

const rankItems = [
  { id: 'r1', top: 'TOP1', title: '【神价】巴布豆儿童防蚊裤 2条装', price: '19.90', rebate: '2.68', extra: '需淘金币抵扣', image: 'https://placehold.co/180x180/FCE7E7/8B5E5E?text=TOP1' },
  { id: 'r2', top: 'TOP2', title: '【神价】夏季速干T恤 2件装', price: '39.00', rebate: '3.10', extra: '需店铺券', image: 'https://placehold.co/180x180/EEF2FF/5165A7?text=TOP2' },
  { id: 'r3', top: 'TOP3', title: '【神价】厨房纸巾 16卷', price: '25.80', rebate: '1.70', extra: '限时购', image: 'https://placehold.co/180x180/E8F7EF/4D8668?text=TOP3' }
];

export default function HotDealsRankPage({ standalone = false }) {
  return (
    <section className="page pb-[80px]">
      <div className="p-4 md:p-0">
        <div className="rounded-3xl overflow-hidden border border-[#ffaea6] shadow-[0_10px_24px_rgba(245,66,66,0.2)]">
          <div className="p-4 md:p-5 bg-[linear-gradient(135deg,#ff4f4f_0%,#f33c3c_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone && (
                <button onClick={() => window.location.assign('/')} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="text-[20px] md:text-[22px] font-bold tracking-wide flex-1 min-w-0">神价好货</div>
              {standalone && (
                <>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Info size={16} /></button>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ShareNetwork size={16} /></button>
                </>
              )}
            </div>
            <div className="mt-3 h-10 rounded-full bg-white/95 px-3 flex items-center gap-2 text-[#9a3a3a]">
              <span className="text-[13px] opacity-80 flex-1 truncate">mlb斜挎包</span>
              <button className="h-7 px-3 rounded-full bg-[#f33c3c] text-white text-[12px] shrink-0">搜神价</button>
            </div>
            <div className="text-[13px] mt-2 text-white/95">返利限时加码中，低价榜实时更新</div>
          </div>

          <div className="bg-cardWhite p-4 md:p-5 rounded-t-3xl -mt-2">
            <div className="flex items-center justify-between mb-3 bg-[#fff5f3] border border-[#ffd8d2] rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 text-[14px] font-bold text-textMain">
                <FireSimple size={18} className="text-[#f54242]" />
                实时爆款精选
              </div>
              <div className="text-[12px] text-[#f54242] flex items-center gap-1">
                <ClockCountdown size={14} />
                仅剩 00:59:29
              </div>
            </div>

            <div className="space-y-3">
              {rankItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-borderLine p-3 flex gap-3 bg-white shadow-[0_2px_8px_rgba(44,62,80,0.05)]">
                  <div className="relative shrink-0">
                    <img src={item.image} alt={item.title} className="w-[96px] h-[96px] rounded-lg border border-borderLine object-cover" />
                    <span className="absolute -top-2 -left-2 px-2 py-0.5 rounded-full bg-[#f54242] text-white text-[10px]">{item.top}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-textMain line-clamp-2">{item.title}</p>
                    <div className="mt-2 text-[12px] text-[#8f6b5f] bg-[#fff3ee] rounded-lg px-2 py-1 inline-block">约返 {item.rebate} 元 · 爆料价</div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-[#f54242]">
                        <span className="text-[12px]">¥</span>
                        <span className="text-[22px] font-bold">{item.price}</span>
                      </div>
                      <button className="h-8 px-3 rounded-lg bg-[#f54242] text-white text-[12px]">抢神价</button>
                    </div>
                    <div className="text-[11px] text-textMuted mt-1">{item.extra}</div>
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

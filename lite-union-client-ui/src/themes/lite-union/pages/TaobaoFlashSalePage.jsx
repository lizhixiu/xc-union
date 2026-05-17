import { ArrowLeft, DotsThree, FireSimple, Lightning } from '@phosphor-icons/react';

const items = [
  { id: 'm1', title: '蕉下防晒伞 晴雨两用轻量款', desc: '今日秒杀限量 500 件', price: '89.00', drop: '直降¥39', heat: 86, image: 'https://picsum.photos/seed/flashsale-1/320/320' },
  { id: 'm2', title: '维达抽纸 120抽*24包 家庭装', desc: '大牌日用补货好价', price: '39.90', drop: '直降¥12', heat: 72, image: 'https://picsum.photos/seed/flashsale-2/320/320' },
  { id: 'm3', title: '美的空气炸锅 4L 智能菜单', desc: '厨房神器限时抢', price: '179.00', drop: '直降¥50', heat: 91, image: 'https://picsum.photos/seed/flashsale-3/320/320' }
];

export default function TaobaoFlashSalePage({ standalone = false }) {
  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#fff5f5] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#ffb8b8] md:shadow-[0_12px_30px_rgba(236,72,72,0.18)]">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#ff5959_0%,#ef4444_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? <button onClick={() => window.location.assign('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ArrowLeft size={18} /></button> : null}
              <div className="text-[22px] font-bold flex-1">淘宝秒杀</div>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><DotsThree size={18} /></button>
            </div>
            <div className="mt-3 text-[22px] font-extrabold tracking-wide">品牌超值秒杀</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {items.map((it) => (
              <div key={it.id} className="bg-white rounded-2xl border border-[#ffe2e2] p-3 flex gap-3">
                <img src={it.image} alt={it.title} className="w-[112px] h-[112px] rounded-xl border border-[#f6dede] object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fff1f1] text-[#e84545] text-[10px] font-semibold"><Lightning size={10} /> 限时秒杀</div>
                  <p className="mt-1 text-[15px] font-semibold text-[#2f3a4d] line-clamp-2">{it.title}</p>
                  <div className="mt-1 text-[12px] text-[#8b95a5]">{it.desc}</div>
                  <div className="mt-2 h-2 rounded-full bg-[#ffe5e5] overflow-hidden"><div className="h-full bg-[#ff6b6b]" style={{ width: `${it.heat}%` }} /></div>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <div className="text-[#ef4444]"><span className="text-[12px]">¥</span><span className="text-[24px] font-bold">{it.price}</span></div>
                      <div className="text-[12px] text-[#f15a5a]">{it.drop}</div>
                    </div>
                    <button className="h-10 px-5 rounded-xl bg-[#ff4d4d] text-white text-[16px] font-bold">抢</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

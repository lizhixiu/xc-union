import { ArrowLeft, CalendarCheck, Coins, Gift, Lightning, Scroll } from '@phosphor-icons/react';

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

const dayRewards = [
  '0.3元', '0.5元', '0.8元', '1.0元', '1.2元', '2.0元', '额外红包'
];

const taskGoods = [
  { id: 'c1', title: '逛母婴会场', image: 'https://picsum.photos/seed/checkin-1/220/220' },
  { id: 'c2', title: '逛零食专场', image: 'https://picsum.photos/seed/checkin-2/220/220' },
  { id: 'c3', title: '逛个护精选', image: 'https://picsum.photos/seed/checkin-3/220/220' }
];

export default function CheckinRewardPage({ standalone = false }) {
  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#f4f8ff] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#b8d4ff] md:shadow-[0_12px_30px_rgba(59,130,246,0.16)]">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#4f86ff_0%,#3b78f0_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ArrowLeft size={18} /></button> : null}
              <div className="text-[22px] font-bold flex-1">签到领钱</div>
              <button className="h-8 px-3 rounded-full bg-white/20 text-[12px]">攻略</button>
              <button className="h-8 px-3 rounded-full bg-white/20 text-[12px]">订阅</button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['签到', '逛大促会场', '淘金币20亿'].map((x) => <div key={x} className="h-16 rounded-2xl bg-white/20 flex items-center justify-center text-[12px] font-semibold">{x}</div>)}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white rounded-2xl border border-[#d9e6ff] p-3">
              <div className="flex items-center justify-between"><div className="text-[15px] font-bold text-[#2d4a73]">连签奖励</div><div className="text-[12px] text-[#6f87a8]">已连签 3 天</div></div>
              <div className="mt-3 overflow-x-auto"><div className="inline-flex gap-2 min-w-max">{dayRewards.map((r, i) => <div key={r + i} className={`w-[74px] h-[82px] rounded-xl border p-2 ${i < 3 ? 'bg-[#eef4ff] border-[#cfe0ff]' : 'bg-white border-[#dce7fb]'}`}><div className="text-[11px] text-[#6f87a8]">Day{i + 1}</div><div className="mt-2 text-[13px] font-bold text-[#3f69a8]">{r}</div></div>)}</div></div>
            </div>

            <div className="bg-[#fff1f1] rounded-2xl border border-[#ffd7d7] p-3">
              <div className="flex items-center justify-between"><div className="text-[15px] font-bold text-[#8b3c3c]">限时福利</div><div className="text-[12px] text-[#c44848]">0/3</div></div>
              <div className="mt-2 grid grid-cols-3 gap-2">{taskGoods.map((g) => <button key={g.id} className="bg-white rounded-xl border border-[#f3d4d4] p-2 text-left"><img src={g.image} alt={g.title} className="w-full h-[74px] rounded-lg object-cover" /><div className="mt-1 text-[11px] text-[#6d4a4a] line-clamp-2">{g.title}</div></button>)}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#d9e6ff] p-3">
              <button className="w-full h-11 rounded-xl bg-[#3e7ef5] text-white font-semibold">做任务赚能量</button>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px]">
                <div className="h-16 rounded-xl bg-[#f1f6ff] border border-[#dbe8ff] flex flex-col items-center justify-center gap-1"><Gift size={16} className="text-[#3e7ef5]" />兑红包</div>
                <div className="h-16 rounded-xl bg-[#f1f6ff] border border-[#dbe8ff] flex flex-col items-center justify-center gap-1"><Scroll size={16} className="text-[#3e7ef5]" />开福袋</div>
                <div className="h-16 rounded-xl bg-[#f1f6ff] border border-[#dbe8ff] flex flex-col items-center justify-center gap-1"><Coins size={16} className="text-[#3e7ef5]" />奖品</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#d9e6ff] p-3">
              <div className="text-[14px] font-semibold text-[#2d4a73]">浏览商品得最高能量值</div>
              <div className="mt-2 space-y-2">
                {['浏览奶粉会场 +10能量', '浏览个护会场 +8能量', '浏览家清会场 +6能量'].map((t) => (
                  <div key={t} className="h-10 rounded-xl bg-[#f3f8ff] border border-[#deebff] px-3 flex items-center justify-between text-[12px]">
                    <span className="text-[#58759b]">{t}</span>
                    <button className="h-7 px-3 rounded-lg bg-[#3e7ef5] text-white">去完成</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

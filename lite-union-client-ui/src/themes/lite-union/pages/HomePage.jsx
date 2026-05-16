import { Gift, Lightning, MagnifyingGlass, Medal, SealPercent, ShoppingCartSimple, Ticket } from '@phosphor-icons/react';
import { useState } from 'react';

const channels = [
  { name: '品牌特卖', icon: Medal },
  { name: '百亿补贴', icon: SealPercent },
  { name: '签到领钱', icon: Gift },
  { name: '猫超特卖', icon: ShoppingCartSimple },
  { name: '淘宝秒杀', icon: Lightning },
  { name: '国家补贴', icon: Ticket }
];
const channelIconBg = ['#ff4d8b', '#ff2b2b', '#3b82f6', '#22c55e', '#ef4444', '#10b981'];

const products = [
  { id: 'h1', title: '【神价精选】防蚊裤子 巴布豆儿童夏季透气薄款', price: '19.90', rebate: '2.68', image: 'https://placehold.co/220x220/FCE7E7/8B5E5E?text=TOP' },
  { id: 'h2', title: '【天猫】运动短袖速干T恤 男士夏季轻薄款', price: '39.00', rebate: '3.10', image: 'https://placehold.co/220x220/EEF2FF/5165A7?text=HOT' },
  { id: 'h3', title: '【U选】厨房纸巾实惠装 4提组合', price: '25.80', rebate: '1.70', image: 'https://placehold.co/220x220/E8F7EF/4D8668?text=SAVE' }
];

export default function HomeDealsPage() {
  const [channelPage, setChannelPage] = useState(0);
  const [campaignPage, setCampaignPage] = useState(0);
  const [channelTouchX, setChannelTouchX] = useState(0);
  const [campaignTouchX, setCampaignTouchX] = useState(0);

  const channelPages = [channels.slice(0, 4), channels.slice(4, 6)];
  const campaignPages = [
    [
      { title: '下单挑战赛', desc: '完成指定单量，额外返现奖励' },
      { title: '夏日清凉券', desc: '清凉好物直降专区' }
    ],
    [
      { title: '百补爆款', desc: '精选爆款补贴直降' },
      { title: '家清囤货', desc: '居家清洁囤货低价' }
    ],
    [
      { title: '新人专享券', desc: '新客专享额外福利' },
      { title: '限时秒杀', desc: '整点限量低价开抢' }
    ]
  ];

  const goChannelPrev = () => setChannelPage((p) => (p === 0 ? channelPages.length - 1 : p - 1));
  const goChannelNext = () => setChannelPage((p) => (p + 1) % channelPages.length);
  const goCampaignPrev = () => setCampaignPage((p) => (p === 0 ? campaignPages.length - 1 : p - 1));
  const goCampaignNext = () => setCampaignPage((p) => (p + 1) % campaignPages.length);

  const onChannelTouchStart = (e) => setChannelTouchX(e.touches?.[0]?.clientX || 0);
  const onCampaignTouchStart = (e) => setCampaignTouchX(e.touches?.[0]?.clientX || 0);

  const onChannelTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX || 0;
    const delta = endX - channelTouchX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) goChannelNext();
    else goChannelPrev();
  };

  const onCampaignTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX || 0;
    const delta = endX - campaignTouchX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) goCampaignNext();
    else goCampaignPrev();
  };

  return (
    <section className="page pb-[80px]">
      <div className="p-4 md:p-0 space-y-3">
        <div className="sticky top-0 md:top-[72px] z-30 py-1 bg-appBg/95 backdrop-blur">
          <div className="flex items-center gap-2 h-11 rounded-xl bg-white border border-[#ffcec2] px-3 shadow-[0_4px_12px_rgba(217,75,61,0.1)]">
            <MagnifyingGlass size={16} className="text-[#c96c59]" />
            <span className="text-[13px] text-[#8b3b2d] flex-1">粘贴口令/链接，输入内容后一键解析</span>
            <button className="h-8 px-3 rounded-lg bg-[#d94b3d] text-white text-[12px]">解析</button>
          </div>
        </div>

        <div className="bg-cardWhite border border-borderLine rounded-2xl p-3" onTouchStart={onChannelTouchStart} onTouchEnd={onChannelTouchEnd}>
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-4 gap-1.5 flex-1">
            {channelPages[channelPage].map((c, idx) => {
              const Icon = c.icon;
              return (
                <button key={`${channelPage}_${c.name}`} className="h-[68px] rounded-xl bg-transparent flex flex-col items-center justify-center gap-1">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: channelIconBg[idx % channelIconBg.length] }}>
                    <Icon size={18} className="text-white" weight="bold" />
                  </span>
                  <span className="text-[12px] text-textMain whitespace-nowrap">{c.name}</span>
                </button>
              );
            })}
            </div>
          </div>
          <div className="mt-1 flex justify-center gap-1">
            {channelPages.map((_, idx) => (
              <span key={idx} className={`h-1 rounded-full ${idx === channelPage ? 'w-5 bg-[#ff4f4f]' : 'w-4 bg-borderLine'}`} />
            ))}
          </div>
        </div>

        <div className="bg-[#fff4f2] border border-[#ffd7d1] rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="text-[13px] text-textMain">购物车商品找到 <span className="text-[#d94b3d] font-bold">88元</span> 隐藏红包</div>
          <button className="h-8 px-4 rounded-lg bg-[#d94b3d] text-white text-[13px]">去领取</button>
        </div>

        <div className="grid grid-cols-2 gap-2" onTouchStart={onCampaignTouchStart} onTouchEnd={onCampaignTouchEnd}>
          {campaignPages[campaignPage].map((item) => (
            <button
              key={`${campaignPage}_${item.title}`}
              onClick={goCampaignNext}
              className="bg-cardWhite border border-borderLine rounded-2xl p-3 text-left min-h-[92px]"
            >
              <p className="text-[15px] font-bold text-textMain">{item.title}</p>
              <p className="text-[12px] text-textMuted mt-1">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-cardWhite border border-borderLine rounded-2xl p-3 flex gap-3">
              <img src={p.image} alt={p.title} className="w-[110px] h-[110px] rounded-lg border border-borderLine object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-textMain line-clamp-2">{p.title}</p>
                <div className="mt-2 text-[12px] text-textMuted">全网比价低 · 月销2w+</div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-[20px] font-bold text-[#d94b3d]">¥ {p.price}</div>
                    <div className="text-[12px] text-[#d94b3d]">约返 ¥ {p.rebate}</div>
                  </div>
                  <button className="h-8 px-3 rounded-lg bg-primary text-white text-[12px]">领券购买</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

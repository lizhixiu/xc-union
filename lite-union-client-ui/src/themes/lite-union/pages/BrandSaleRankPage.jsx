import { ArrowLeft, MagnifyingGlass, ShareNetwork, Sparkle } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

const brandStrip = [
  { name: '小米', off: '低至2.3折' },
  { name: '美的', off: '低至3.5折' },
  { name: '海飞丝', off: '低至4.2折' },
  { name: '优衣库', off: '低至5.0折' },
  { name: '百雀羚', off: '低至3.8折' }
];

const featuredGoods = [
  { id: 'f1', title: '海飞丝去屑洗发露 750ml', price: '39.9', tag: '领券', image: 'https://picsum.photos/seed/brand-hot-1/240/240' },
  { id: 'f2', title: '美的空气炸锅 4L', price: '179.0', tag: '同款低价', image: 'https://picsum.photos/seed/brand-hot-2/240/240' },
  { id: 'f3', title: '小米无线耳机青春版', price: '89.0', tag: '约返', image: 'https://picsum.photos/seed/brand-hot-3/240/240' },
  { id: 'f4', title: '百雀羚护肤套装', price: '99.0', tag: '领券', image: 'https://picsum.photos/seed/brand-hot-4/240/240' }
];

const tabs = ['精选品牌', '上新', '美妆', '个护', '食品', '母婴'];

const stores = [
  {
    id: 's1',
    name: '美的官方旗舰店',
    count: 326,
    discount: '低至3.6折',
    logo: 'https://picsum.photos/seed/store-logo-1/88/88',
    goods: [
      { id: 's1g1', price: '¥199', tag: '超值', image: 'https://picsum.photos/seed/store-1-1/180/180' },
      { id: 's1g2', price: '¥89', tag: '同款低价', image: 'https://picsum.photos/seed/store-1-2/180/180' },
      { id: 's1g3', price: '¥329', tag: '最低价', image: 'https://picsum.photos/seed/store-1-3/180/180' }
    ]
  },
  {
    id: 's2',
    name: '小米品牌专场',
    count: 218,
    discount: '低至4.1折',
    logo: 'https://picsum.photos/seed/store-logo-2/88/88',
    goods: [
      { id: 's2g1', price: '¥79', tag: '超值', image: 'https://picsum.photos/seed/store-2-1/180/180' },
      { id: 's2g2', price: '¥149', tag: '同款低价', image: 'https://picsum.photos/seed/store-2-2/180/180' },
      { id: 's2g3', price: '¥269', tag: '最低价', image: 'https://picsum.photos/seed/store-2-3/180/180' }
    ]
  }
];

export default function BrandSaleRankPage({ standalone = false }) {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('精选品牌');

  const shownStores = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter((s) => s.name.toLowerCase().includes(q));
  }, [keyword]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#fff6fa] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#ffcadb] md:shadow-[0_12px_28px_rgba(218,83,137,0.2)]">
          <div className="sticky top-0 z-20 p-4 bg-[linear-gradient(160deg,#ff6da1_0%,#ff5a93_60%,#f94f89_100%)] text-white">
            <div className="flex items-center gap-2">
              {standalone ? (
                <button onClick={() => window.location.assign('/')} className="w-10 h-10 rounded-full bg-white/22 flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <div className="text-[22px] font-bold flex-1">品牌特卖</div>
              <button className="w-9 h-9 rounded-full bg-white/22 flex items-center justify-center"><ShareNetwork size={16} /></button>
            </div>

            <div className="mt-3 h-11 rounded-full bg-white pl-4 pr-1.5 flex items-center gap-2 border border-[#ffd4e2]">
              <MagnifyingGlass size={16} className="text-[#a25d79]" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索品牌或商品"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#5f3248] placeholder:text-[#af8096] outline-none"
              />
              <button className="h-8 min-w-[88px] rounded-full bg-[#ff5b95] text-white text-[14px] font-semibold">搜索</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
              {['精选大牌', '补贴加码', '专场折扣'].map((x) => (
                <div key={x} className="h-8 rounded-full bg-white/18 flex items-center justify-center">{x}</div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-[#fffaf4] rounded-2xl border border-[#fde6d7] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-bold text-[#603a4d]">今日大牌</div>
                <div className="text-[12px] text-[#b27a5a]">品牌专享折扣</div>
              </div>
              <div className="mt-3 overflow-x-auto">
                <div className="inline-flex gap-2 min-w-max pr-2">
                  {brandStrip.map((b) => (
                    <button key={b.name} className="w-[84px] rounded-xl bg-white border border-[#f5d7e4] p-2 text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#ffe8f1] text-[#be6288] flex items-center justify-center font-bold text-[12px]">{b.name.slice(0, 2)}</div>
                      <div className="mt-1 text-[11px] text-[#5f4151] truncate">{b.name}</div>
                      <div className="text-[10px] text-[#e75886]">{b.off}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#f8f1ff] rounded-2xl border border-[#ead9ff] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-bold text-[#553a7a]">特卖精选</div>
                  <div className="text-[12px] text-[#8b73ac]">品牌热门单品</div>
                </div>
                <button className="h-7 px-3 rounded-full bg-white text-[#7d63a6] text-[12px] border border-[#e1d2f8]">更多</button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <div className="inline-flex gap-2 min-w-max pr-2">
                  {featuredGoods.map((g) => (
                    <div key={g.id} className="w-[118px] bg-white rounded-xl border border-[#e7dbf8] p-2">
                      <img src={g.image} alt={g.title} className="w-full h-[78px] rounded-lg object-cover" />
                      <div className="mt-1 text-[11px] text-[#4f3f67] line-clamp-2 min-h-[30px]">{g.title}</div>
                      <div className="mt-1 text-[#e84b7f] font-bold text-[15px]">¥{g.price}</div>
                      <div className="text-[10px] text-[#896ab5]">{g.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#f3d9e5] p-2 flex gap-2 overflow-x-auto">
              <div className="inline-flex gap-2 min-w-max">
                {tabs.map((t) => {
                  const active = t === activeTab;
                  return (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`h-9 px-4 rounded-full text-[13px] font-semibold ${active ? 'bg-[#ff5b95] text-white' : 'bg-[#fff2f7] text-[#8c5f73]'}`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pb-2">
              {shownStores.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[#f0d9e3] p-3">
                  <div className="flex items-center gap-3">
                    <img src={s.logo} alt={s.name} className="w-11 h-11 rounded-lg border border-[#f2d6e2]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#4f2f3e] truncate">{s.name}</div>
                      <div className="text-[12px] text-[#907081]">{s.count}件商品 · {s.discount}</div>
                    </div>
                    <button className="h-8 px-3 rounded-full bg-[#ff5b95] text-white text-[12px] font-semibold">逛专场</button>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {s.goods.map((g) => (
                      <div key={g.id} className="rounded-xl border border-[#f2dbe6] p-2">
                        <img src={g.image} alt={g.id} className="w-full h-[72px] rounded-lg object-cover" />
                        <div className="mt-1 text-[13px] text-[#e84b7f] font-bold">{g.price}</div>
                        <div className="text-[10px] text-[#8f6c7c]">{g.tag}</div>
                      </div>
                    ))}
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

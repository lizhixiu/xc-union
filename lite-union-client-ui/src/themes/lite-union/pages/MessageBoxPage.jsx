import { ArrowLeft, Bell, DotsThree, Gear, MegaphoneSimple, ShoppingCart, Tag } from '@phosphor-icons/react';

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

const groups = [
  {
    id: 'merchant',
    title: '商家消息',
    action: '查看',
    unread: 2,
    summary: '你关注的店铺上新了3款爆品，首单可领专属券。',
    time: '今天 10:28',
    icon: ShoppingCart,
    image: 'https://picsum.photos/seed/msg-merchant/220/140',
    subscribe: false
  },
  {
    id: 'promotion',
    title: '一淘活动优惠',
    action: '更多',
    unread: 5,
    summary: '超级补贴日开启，部分会场券后低至5折起。',
    time: '今天 09:12',
    icon: Tag,
    image: 'https://picsum.photos/seed/msg-promo/220/140',
    subscribe: false
  },
  {
    id: 'system',
    title: '系统通知',
    action: '更多',
    unread: 1,
    summary: '账户安全提醒：建议你完善手机认证提升账户安全性。',
    time: '昨天 21:33',
    icon: Bell,
    image: 'https://picsum.photos/seed/msg-system/220/140',
    subscribe: false
  },
  {
    id: 'cart',
    title: '购物车提醒',
    action: '更多',
    unread: 0,
    summary: '你有6件商品降价，最高可省¥72，建议及时查看。',
    time: '昨天 18:05',
    icon: ShoppingCart,
    image: 'https://picsum.photos/seed/msg-cart/220/140',
    subscribe: true
  },
  {
    id: 'rebate',
    title: '返利到账通知',
    action: '查看',
    unread: 0,
    summary: '你有2笔订单返利已到账，可前往“我的-提现”查看。',
    time: '05-18 14:26',
    icon: MegaphoneSimple,
    image: 'https://picsum.photos/seed/msg-rebate/220/140',
    subscribe: false
  }
];

export default function MessageBoxPage({ standalone = false }) {
  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#F5F6FA] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#FFD9D9] md:shadow-[0_12px_30px_rgba(255,86,86,0.12)]">
          <div className="sticky top-0 z-20 bg-white border-b border-[#F0DADD] px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-[#FFF1F3] text-[#FF0036] flex items-center justify-center">
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                <h2 className="text-[20px] font-bold text-[#2B3442]">消息盒子</h2>
                <button className="text-[12px] text-[#FF0036] px-2 py-1 rounded-md bg-[#FFF0F3]">清除未读</button>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#F5F6FA] text-[#657089] flex items-center justify-center">
                <Gear size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {groups.map((g) => {
              const Icon = g.icon;
              return (
                <article key={g.id} className="bg-white rounded-2xl border border-[#E8EDF3] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#FFF0F3] text-[#FF0036] flex items-center justify-center">
                        <Icon size={15} />
                      </span>
                      <h3 className="text-[15px] font-semibold text-[#2B3442]">{g.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-[12px] text-[#8E99AB]">{g.action}</button>
                      {g.unread > 0 ? <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF0036] text-white text-[10px] inline-flex items-center justify-center">{g.unread}</span> : null}
                    </div>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <img src={g.image} alt={g.title} className="w-[84px] h-[60px] rounded-lg object-cover border border-[#EEF1F5] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-[#5E6A7D] leading-[1.45] line-clamp-2">{g.summary}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-[#A3ADBD]">{g.time}</span>
                        <div className="flex items-center gap-2">
                          <button className="text-[12px] text-[#FF0036]">查看详情</button>
                          {g.subscribe ? <button className="h-7 px-3 rounded-full bg-[#FF0036] text-white text-[12px] font-medium">订阅</button> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

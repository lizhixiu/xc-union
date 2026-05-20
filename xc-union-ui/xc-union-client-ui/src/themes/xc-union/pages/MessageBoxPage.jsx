import { ArrowLeft, Bell, Broom, CaretRight, Gear, MegaphoneSimple, ShoppingCart, Tag } from '@phosphor-icons/react';

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
    unread: 2,
    summary: '你关注的店铺上新了3款爆品，首单可领专属券。',
    time: '今天 10:28',
    icon: ShoppingCart,
    iconColor: '#FF5000',
    image: 'https://picsum.photos/seed/msg-merchant/220/220'
  },
  {
    id: 'promotion',
    title: '活动优惠',
    unread: 5,
    summary: '超级补贴日开启，部分会场券后低至5折起。',
    time: '今天 09:12',
    icon: Tag,
    iconColor: '#FF0036',
    image: 'https://picsum.photos/seed/msg-promo/220/220'
  },
  {
    id: 'system',
    title: '系统通知',
    unread: 1,
    summary: '账户安全提醒：建议你完善手机认证提升账户安全性。',
    time: '昨天 21:33',
    icon: Bell,
    iconColor: '#2F7BFF',
    image: 'https://picsum.photos/seed/msg-system/220/220'
  },
  {
    id: 'cart',
    title: '购物车提醒',
    unread: 0,
    summary: '你有6件商品降价，最高可省¥72，建议及时查看。',
    time: '昨天 18:05',
    icon: ShoppingCart,
    iconColor: '#FF5000',
    image: 'https://picsum.photos/seed/msg-cart/220/220'
  },
  {
    id: 'rebate',
    title: '返利到账通知',
    unread: 0,
    summary: '你有2笔订单返利已到账，可前往“我的-提现”查看。',
    time: '05-18 14:26',
    icon: MegaphoneSimple,
    iconColor: '#FF6A00',
    image: 'https://picsum.photos/seed/msg-rebate/220/220'
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
                <button className="inline-flex items-center gap-1 text-[13px] text-[#666666]">
                  <Broom size={14} />
                  清除未读
                </button>
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
                <button key={g.id} className="w-full bg-white rounded-2xl border border-[#E8EDF3] p-3 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 flex items-center justify-center" style={{ color: g.iconColor || '#FF0036' }}>
                        <Icon size={15} />
                      </span>
                      <h3 className="text-[15px] font-semibold text-[#2B3442]">{g.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#999999] text-[11px]">{g.time}</span>
                      {g.unread > 0 ? <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF0036] text-white text-[10px] inline-flex items-center justify-center">{g.unread}</span> : null}
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-3">
                    <div className="min-w-0 flex-1 pt-[1px]">
                      <p className="text-[13px] text-[#333333] leading-[1.4] line-clamp-2">{g.summary}</p>
                    </div>
                    <span className="text-[#C9CDD4] shrink-0 self-center">
                      <CaretRight size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

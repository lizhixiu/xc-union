import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, CurrencyCircleDollar, ShieldCheck, UserCircle } from '@phosphor-icons/react';
import { isLoggedIn, setLoggedIn } from '../utils/auth';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function nowString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function MailboxAuthPanel({ onToast, onLoginSuccess }) {
  const [channel, setChannel] = useState('email');
  const [authMode, setAuthMode] = useState('login');
  const [authed, setAuthed] = useState(() => isLoggedIn());

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);
  const [mineTab, setMineTab] = useState('overview');
  const [orderStatus, setOrderStatus] = useState('paid');
  const [bindHintVisible, setBindHintVisible] = useState(false);
  const [withdrawHintVisible, setWithdrawHintVisible] = useState(false);
  const [inviteCode] = useState('QG8F2M');

  const inviteList = [
    { id: 'inv_1', name: '用户A', time: '2026-05-16 09:21', status: '已首单', reward: '12.80' },
    { id: 'inv_2', name: '用户B', time: '2026-05-15 20:17', status: '待首单', reward: '0.00' }
  ];

  const canEmailLogin = useMemo(() => isValidEmail(email) && password.trim().length > 0, [email, password]);
  const canEmailRegister = useMemo(
    () => isValidEmail(email) && password.trim().length >= 6 && confirmPassword.trim().length >= 6 && password === confirmPassword,
    [email, password, confirmPassword]
  );

  const emailAuthSubmit = () => {
    if (!isValidEmail(email)) {
      onToast?.('请输入正确邮箱地址');
      return;
    }
    if (!password.trim()) {
      onToast?.('请输入密码');
      return;
    }
    if (authMode === 'register') {
      if (password.length < 6) {
        onToast?.('密码至少6位');
        return;
      }
      if (password !== confirmPassword) {
        onToast?.('两次密码不一致');
        return;
      }
    }
    setAuthed(true);
    setLoggedIn(true);
    setEmailVerified(false);
    onToast?.(authMode === 'register' ? '注册成功' : '登录成功');
    onLoginSuccess?.();
  };

  const phoneUnavailable = () => onToast?.('手机登录/注册暂不可用');

  const submitOrderBind = () => {
    setBindHintVisible(true);
  };

  const submitWithdraw = () => {
    setWithdrawHintVisible(true);
  };

  const tabClass = (active) =>
    `h-10 flex-1 min-w-0 whitespace-nowrap text-[15px] transition-all flex items-center justify-center relative ${
      active ? 'text-[#111111] font-bold' : 'text-[#666666]'
    }`;

  const orderStatusTabs = [
    { key: 'paid', label: '已付款' },
    { key: 'received', label: '已收货' },
    { key: 'settled', label: '已结算' },
    { key: 'invalid', label: '已失效' }
  ];

  const orderCards = [
    {
      id: 'o1',
      status: 'paid',
      statusText: '已付款',
      product: {
        image: 'https://img.alicdn.com/bao/uploaded/i2/2217402909158/O1CN01dMZ5Wx2HWQIOb1fM0_!!2217402909158.jpg',
        title: '维生素B族复合片 60粒装 日常营养补充',
        shopName: '阿里健康大药房',
        productType: '淘宝联盟'
      },
      metrics: [
        ['付款金额(元)', '23.50'],
        ['付款预估收入(元)', '1.41'],
        ['总提成率', '6.00%'],
        ['平台技术服务费(元)', '0.00']
      ],
      paidAt: '2026-05-20 01:22:46',
      settledAt: ''
    },
    {
      id: 'o2',
      status: 'received',
      statusText: '已收货',
      product: {
        image: 'https://img.alicdn.com/bao/uploaded/i3/2219113300539/O1CN01AoiRFw1FquZDcbMh6_!!4611686018427380283-0-item_pic.jpg',
        title: '儿童防蚊裤夏季薄款两条装 透气速干',
        shopName: 'bobdoghouse童鞋旗舰店',
        productType: '淘宝联盟'
      },
      metrics: [
        ['付款金额(元)', '39.90'],
        ['付款预估收入(元)', '2.39'],
        ['总提成率', '6.00%'],
        ['平台技术服务费(元)', '0.00']
      ],
      paidAt: '2026-05-19 12:08:23',
      settledAt: ''
    },
    {
      id: 'o3',
      status: 'settled',
      statusText: '已结算',
      product: {
        image: 'https://img.alicdn.com/bao/uploaded/i4/2216944218317/O1CN01YIG2ax2BJFD1mzttl_!!4611686018427384013-0-item_pic.jpg',
        title: '黑咖啡浓缩液 32杯装 无糖提神',
        shopName: '瑞幸即享咖啡旗舰店',
        productType: '淘宝联盟'
      },
      metrics: [
        ['结算金额(元)', '44.70'],
        ['结算预估收入(元)', '2.68'],
        ['总提成率', '6.00%'],
        ['平台技术服务费(元)', '0.00']
      ],
      paidAt: '2026-05-15 11:28:54',
      settledAt: '2026-05-17 21:15:16'
    },
    {
      id: 'o4',
      status: 'invalid',
      statusText: '已失效',
      product: {
        image: 'https://img.alicdn.com/bao/uploaded/i2/2217402909158/O1CN01dMZ5Wx2HWQIOb1fM0_!!2217402909158.jpg',
        title: '家清套装 多规格组合',
        shopName: '国货严选企业工厂店',
        productType: '淘宝联盟'
      },
      metrics: [
        ['付款金额(元)', '19.90'],
        ['付款预估收入(元)', '0.00'],
        ['总提成率', '0.00%'],
        ['平台技术服务费(元)', '0.00']
      ],
      paidAt: '2026-05-13 08:01:22',
      settledAt: ''
    }
  ];

  const shownOrders = useMemo(() => orderCards.filter((x) => x.status === orderStatus), [orderCards, orderStatus]);

  useEffect(() => {
    if (!bindHintVisible) return undefined;
    const timer = setTimeout(() => setBindHintVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [bindHintVisible]);

  useEffect(() => {
    if (!withdrawHintVisible) return undefined;
    const timer = setTimeout(() => setWithdrawHintVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [withdrawHintVisible]);

  const orderStatusClass = (status) => {
    if (status === 'paid') return 'bg-[#EEF4FF] text-[#2F7BFF]';
    if (status === 'received') return 'bg-[#F2F8FF] text-[#3B6FCB]';
    if (status === 'settled') return 'bg-[#EDFBF2] text-[#18A05D]';
    return 'bg-[#F3F4F6] text-[#7A8597]';
  };

  return (
    <div className="space-y-5">
      {!authed && (
        <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 md:p-6 shadow-[var(--shadow-card)]">
          <div className="w-full flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full border border-borderLine flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,#fff0f3_70%)]">
              <UserCircle size={38} className="text-[#FF0036]" />
            </div>
          </div>
          <div className="flex rounded-xl bg-appBg p-1 mb-5">
            <button onClick={() => { setChannel('email'); setAuthMode('login'); }} className={`h-10 flex-1 rounded-lg text-[14px] transition-all ${channel === 'email' ? 'bg-cardWhite text-[#FF0036] shadow-sm border border-[#FF0036]/30' : 'text-textMuted hover:text-textMain'}`}>邮箱登录</button>
            <button onClick={() => { setChannel('phone'); setAuthMode('login'); }} className={`h-10 flex-1 rounded-lg text-[14px] transition-all ${channel === 'phone' ? 'bg-cardWhite text-[#FF0036] shadow-sm border border-[#FF0036]/30' : 'text-textMuted hover:text-textMain'}`}>手机登录</button>
          </div>

          {channel === 'email' && authMode === 'login' && (
            <div className="space-y-3">
              <input value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="请输入邮箱地址" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <button onClick={emailAuthSubmit} disabled={!canEmailLogin} className="w-full h-11 rounded-xl bg-[#FF0036] text-white disabled:opacity-50">登录邮箱</button>
              <button onClick={() => setAuthMode('register')} className="w-full text-[13px] text-textMuted hover:text-[#FF0036]">没有账号？去注册</button>
            </div>
          )}

          {channel === 'email' && authMode === 'register' && (
            <div className="space-y-3">
              <input value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="请输入邮箱地址" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码（至少6位）" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="请再次输入密码" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <button onClick={emailAuthSubmit} disabled={!canEmailRegister} className="w-full h-11 rounded-xl bg-[#FF0036] text-white disabled:opacity-50">注册邮箱</button>
              <button onClick={() => setAuthMode('login')} className="w-full text-[13px] text-textMuted hover:text-[#FF0036]">已有账号？去登录</button>
            </div>
          )}

          {channel === 'phone' && authMode === 'login' && (
            <div className="space-y-3">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 11))} placeholder="请输入手机号" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <div className="flex gap-2">
                <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} placeholder="请输入验证码" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
                <button onClick={phoneUnavailable} className="h-11 px-3 rounded-xl border border-borderLine bg-appBg text-[13px]">获取验证码</button>
              </div>
              <button onClick={phoneUnavailable} className="w-full h-11 rounded-xl bg-[#FF0036] text-white">手机登录</button>
              <button onClick={() => setAuthMode('register')} className="w-full text-[13px] text-textMuted hover:text-[#FF0036]">没有账号？去注册</button>
            </div>
          )}

          {channel === 'phone' && authMode === 'register' && (
            <div className="space-y-3">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 11))} placeholder="请输入手机号" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <div className="flex gap-2">
                <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} placeholder="请输入验证码" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
                <button onClick={phoneUnavailable} className="h-11 px-3 rounded-xl border border-borderLine bg-appBg text-[13px]">获取验证码</button>
              </div>
              <button onClick={phoneUnavailable} className="w-full h-11 rounded-xl bg-[#FF0036] text-white">手机注册</button>
              <button onClick={() => setAuthMode('login')} className="w-full text-[13px] text-textMuted hover:text-[#FF0036]">已有账号？去登录</button>
            </div>
          )}
        </div>
      )}

      {authed && (
        <div className="space-y-4">
          <div className="bg-white px-1">
            <div className="flex flex-nowrap gap-1 border-b border-[#F1F2F4]">
              <button onClick={() => setMineTab('overview')} className={tabClass(mineTab === 'overview')}>
                概览
                {mineTab === 'overview' ? <span className="absolute -bottom-[1px] w-5 h-[3px] bg-[#FF0036] rounded-full" /> : null}
              </button>
              <button onClick={() => setMineTab('orders')} className={tabClass(mineTab === 'orders')}>
                订单
                {mineTab === 'orders' ? <span className="absolute -bottom-[1px] w-5 h-[3px] bg-[#FF0036] rounded-full" /> : null}
              </button>
              <button onClick={() => setMineTab('withdraw')} className={tabClass(mineTab === 'withdraw')}>
                提现
                {mineTab === 'withdraw' ? <span className="absolute -bottom-[1px] w-5 h-[3px] bg-[#FF0036] rounded-full" /> : null}
              </button>
            </div>
          </div>
          {mineTab === 'overview' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3 flex items-center gap-2"><ShieldCheck size={18} />认证信息</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50 flex items-center justify-between">
                <span className="text-[14px]">邮箱认证</span>
                <span className={`text-[12px] ${emailVerified ? 'text-[#FF0036]' : 'text-textMuted'}`}>{emailVerified ? '已认证' : '未认证'}</span>
              </div>
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50 flex items-center justify-between">
                <span className="text-[14px]">手机认证</span>
                <button onClick={() => onToast?.('手机认证暂不可用')} className="text-[12px] text-textMuted hover:text-[#FF0036]">{phoneVerified ? '已认证' : '去认证'}</button>
              </div>
            </div>
          </div>
          )}

          {mineTab === 'orders' && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {orderStatusTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOrderStatus(tab.key)}
                  className={`h-8 rounded-full text-[12px] font-medium ${
                    orderStatus === tab.key ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF5000] text-white' : 'bg-[#F1F3F5] text-[#333333]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {shownOrders.map((item) => (
              <article key={item.id} className="bg-white border border-[#ECEFF4] rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] text-[#707B8C]">{item.product.shopName} · {item.product.productType}</div>
                  <span className={`h-5 px-2 rounded-[4px] text-[10px] inline-flex items-center ${item.status === 'paid' ? 'bg-[#F0F5FF] text-[#0066FF]' : item.status === 'received' ? 'bg-[#F2F7FF] text-[#3A6FD8]' : item.status === 'settled' ? 'bg-[#EDF9F1] text-[#0D9B57]' : 'bg-[#F3F4F6] text-[#778395]'}`}>{item.statusText}</span>
                </div>

                <div className="mt-2.5 flex gap-2.5 items-start">
                  <img src={item.product.image} alt={item.product.title} className="w-14 h-14 rounded-md object-cover shrink-0" />
                  <h4 className="text-[14px] leading-[1.4] text-[#111111] font-bold line-clamp-2">{item.product.title}</h4>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {item.metrics.map(([name, value]) => (
                    <div key={name}>
                      <div className="text-[11px] text-[#999999]">{name}</div>
                      <div className="mt-0.5 text-[16px] text-[#111111] font-mono font-bold flex items-center gap-1">
                        <span>{value}</span>
                        {name === '付款预估收入(元)' || name === '结算预估收入(元)' ? (
                          <span className="text-[9px] px-1 py-[1px] bg-[#FFF0F2] text-[#FF0036] rounded-[2px] leading-none">佣金</span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between text-[11px] text-[#9AA3B2]">
                  <span>{item.paidAt} 付款</span>
                  <span>{item.settledAt ? `${item.settledAt} 结算` : ''}</span>
                </div>
              </article>
            ))}

            <div className="bg-cardWhite border border-borderLine rounded-2xl p-4 shadow-[var(--shadow-card)]">
              <div className="text-[14px] font-semibold text-[#1F2937] mb-2">订单绑定</div>
              <div className="flex gap-2">
                <input value={orderNo} onChange={(e) => setOrderNo(e.target.value)} placeholder="输入订单号，提交后进行订单绑定" className="flex-1 h-10 bg-[#F5F6F8] rounded-full px-4 outline-none text-[13px] text-[#333333]" />
                <button onClick={submitOrderBind} className="h-10 px-5 rounded-full bg-gradient-to-r from-[#FF0036] to-[#FF4724] text-white text-[13px] shadow-[0_4px_10px_rgba(255,45,66,0.28)]">绑定</button>
              </div>
              {orders.length > 0 ? (
                <div className="mt-2 space-y-1.5">
                  {orders.slice(0, 2).map((x) => (
                    <div key={x.id} className="text-[12px] text-[#6B7280]">{x.orderNo} · {x.time}</div>
                  ))}
                </div>
              ) : null}
            </div>

            {bindHintVisible ? (
              <div className="fixed left-1/2 -translate-x-1/2 bottom-[88px] z-50 pointer-events-none">
                <div
                  className="h-9 px-4 rounded-full text-[13px] inline-flex items-center whitespace-nowrap"
                  style={{
                    color: '#fff',
                    background: 'rgba(35, 41, 51, 0.9)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.18)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    animation: 'fadeInInviteToast 160ms ease-out'
                  }}
                >
                  功能暂未开放，敬请期待
                </div>
              </div>
            ) : null}
          </div>
          )}

          {mineTab === 'overview' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3 flex items-center gap-2"><CurrencyCircleDollar size={18} />我的奖励</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div
                className="p-4 rounded-2xl text-white border border-primary/20"
                style={{ background: 'linear-gradient(135deg, #ff4d6d 0%, #ff0036 100%)' }}
              >
                <p className="text-[12px] text-white/85">可提现余额</p>
                <p className="text-[26px] font-bold mt-2">¥ {balance.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-appBg border border-borderLine">
                <p className="text-[12px] text-textMuted">累计奖励</p>
                <p className="text-[24px] text-textMain font-bold mt-2">¥ 0.00</p>
              </div>
              <div className="p-4 rounded-2xl bg-appBg border border-borderLine">
                <p className="text-[12px] text-textMuted">本月奖励</p>
                <p className="text-[24px] text-textMain font-bold mt-2">¥ 0.00</p>
              </div>
            </div>
          </div>
          )}

          {mineTab === 'withdraw' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3">提现</h3>
            <div className="flex gap-2">
              <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="请输入提现金额" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-[#FF0036] outline-none bg-appBg/40" />
              <button onClick={submitWithdraw} className="h-11 px-4 rounded-xl bg-[#FF0036] text-white">申请提现</button>
            </div>
          </div>
          )}

          {mineTab === 'withdraw' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3 flex items-center gap-2"><CheckCircle size={18} />提现列表</h3>
            <div className="space-y-2">
              {withdrawals.length === 0 && <p className="text-[12px] text-textMuted">暂无提现记录</p>}
              {withdrawals.map((item) => (
                <div key={item.id} className="p-3 rounded-xl border border-borderLine bg-appBg/40 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-textMain">提现金额：¥ {item.amount}</p>
                    <p className="text-[11px] text-textMuted mt-1">{item.time}</p>
                  </div>
                  <span className="text-[12px] text-[#FF0036]">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {withdrawHintVisible ? (
            <div className="fixed left-1/2 -translate-x-1/2 bottom-[88px] z-50 pointer-events-none">
              <div
                className="h-9 px-4 rounded-full text-[13px] inline-flex items-center whitespace-nowrap"
                style={{
                  color: '#fff',
                  background: 'rgba(35, 41, 51, 0.9)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.18)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  animation: 'fadeInInviteToast 160ms ease-out'
                }}
              >
                功能暂未开放，敬请期待
              </div>
            </div>
          ) : null}

        </div>
      )}
    </div>
  );
}

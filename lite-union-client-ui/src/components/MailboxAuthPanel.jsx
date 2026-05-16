import { useMemo, useState } from 'react';
import { CheckCircle, CurrencyCircleDollar, ShieldCheck, UserCircle } from '@phosphor-icons/react';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function nowString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function MailboxAuthPanel({ onToast }) {
  const [channel, setChannel] = useState('email');
  const [authMode, setAuthMode] = useState('login');
  const [authed, setAuthed] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(128.5);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);
  const [mineTab, setMineTab] = useState('overview');
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
    setEmailVerified(true);
    onToast?.(authMode === 'register' ? '注册成功' : '登录成功');
  };

  const phoneUnavailable = () => onToast?.('手机登录/注册暂不可用');

  const submitOrderBind = () => {
    const no = orderNo.trim();
    if (!no) {
      onToast?.('请输入订单号');
      return;
    }
    setOrders((prev) => [{ id: `ord_${Date.now()}`, orderNo: no, time: nowString(), status: '已绑定' }, ...prev]);
    setOrderNo('');
    onToast?.('订单绑定成功');
  };

  const submitWithdraw = () => {
    const amt = Number(withdrawAmount);
    if (!Number.isFinite(amt) || amt <= 0) {
      onToast?.('请输入正确提现金额');
      return;
    }
    if (amt > balance) {
      onToast?.('余额不足');
      return;
    }
    setBalance((b) => Number((b - amt).toFixed(2)));
    setWithdrawals((prev) => [{ id: `wd_${Date.now()}`, amount: amt.toFixed(2), time: nowString(), status: '处理中' }, ...prev]);
    setWithdrawAmount('');
    onToast?.('提现申请已提交');
  };

  const tabClass = (active) =>
    `h-10 flex-1 min-w-0 whitespace-nowrap rounded-lg text-[14px] transition-all ${
      active
        ? 'bg-cardWhite text-textMain border border-borderLine shadow-sm'
        : 'text-textMuted hover:text-textMain'
    }`;

  return (
    <div className="space-y-5">
      {!authed && (
        <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 md:p-6 shadow-[var(--shadow-card)]">
          <div className="w-full flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full border border-borderLine flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,#f0f6f5_70%)]">
              <UserCircle size={38} className="text-primary" />
            </div>
          </div>
          <div className="flex rounded-xl bg-appBg p-1 mb-5">
            <button onClick={() => { setChannel('email'); setAuthMode('login'); }} className={`h-10 flex-1 rounded-lg text-[14px] transition-all ${channel === 'email' ? 'bg-cardWhite text-textMain shadow-sm border border-borderLine' : 'text-textMuted hover:text-textMain'}`}>邮箱登录</button>
            <button onClick={() => { setChannel('phone'); setAuthMode('login'); }} className={`h-10 flex-1 rounded-lg text-[14px] transition-all ${channel === 'phone' ? 'bg-cardWhite text-textMain shadow-sm border border-borderLine' : 'text-textMuted hover:text-textMain'}`}>手机登录</button>
          </div>

          {channel === 'email' && authMode === 'login' && (
            <div className="space-y-3">
              <input value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="请输入邮箱地址" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <button onClick={emailAuthSubmit} disabled={!canEmailLogin} className="w-full h-11 rounded-xl bg-primary text-white disabled:opacity-50">登录邮箱</button>
              <button onClick={() => setAuthMode('register')} className="w-full text-[13px] text-textMuted hover:text-primary">没有账号？去注册</button>
            </div>
          )}

          {channel === 'email' && authMode === 'register' && (
            <div className="space-y-3">
              <input value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="请输入邮箱地址" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码（至少6位）" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="请再次输入密码" type="password" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <button onClick={emailAuthSubmit} disabled={!canEmailRegister} className="w-full h-11 rounded-xl bg-primary text-white disabled:opacity-50">注册邮箱</button>
              <button onClick={() => setAuthMode('login')} className="w-full text-[13px] text-textMuted hover:text-primary">已有账号？去登录</button>
            </div>
          )}

          {channel === 'phone' && authMode === 'login' && (
            <div className="space-y-3">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 11))} placeholder="请输入手机号" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <div className="flex gap-2">
                <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} placeholder="请输入验证码" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
                <button onClick={phoneUnavailable} className="h-11 px-3 rounded-xl border border-borderLine bg-appBg text-[13px]">获取验证码</button>
              </div>
              <button onClick={phoneUnavailable} className="w-full h-11 rounded-xl bg-primary text-white">手机登录</button>
              <button onClick={() => setAuthMode('register')} className="w-full text-[13px] text-textMuted hover:text-primary">没有账号？去注册</button>
            </div>
          )}

          {channel === 'phone' && authMode === 'register' && (
            <div className="space-y-3">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 11))} placeholder="请输入手机号" className="w-full h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <div className="flex gap-2">
                <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} placeholder="请输入验证码" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
                <button onClick={phoneUnavailable} className="h-11 px-3 rounded-xl border border-borderLine bg-appBg text-[13px]">获取验证码</button>
              </div>
              <button onClick={phoneUnavailable} className="w-full h-11 rounded-xl bg-primary text-white">手机注册</button>
              <button onClick={() => setAuthMode('login')} className="w-full text-[13px] text-textMuted hover:text-primary">已有账号？去登录</button>
            </div>
          )}
        </div>
      )}

      {authed && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-1 border border-borderLine"
            style={{ background: 'linear-gradient(135deg, #eaf4f3 0%, #f8fafc 100%)' }}
          >
            <div className="flex flex-nowrap gap-2">
              <button onClick={() => setMineTab('overview')} className={tabClass(mineTab === 'overview')}>概览</button>
              <button onClick={() => setMineTab('orders')} className={tabClass(mineTab === 'orders')}>订单</button>
              <button onClick={() => setMineTab('withdraw')} className={tabClass(mineTab === 'withdraw')}>提现</button>
              <button onClick={() => setMineTab('invite')} className={tabClass(mineTab === 'invite')}>邀请</button>
            </div>
          </div>
          {mineTab === 'overview' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3 flex items-center gap-2"><ShieldCheck size={18} />认证信息</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50 flex items-center justify-between">
                <span className="text-[14px]">邮箱认证</span>
                <span className={`text-[12px] ${emailVerified ? 'text-primary' : 'text-textMuted'}`}>{emailVerified ? '已认证' : '未认证'}</span>
              </div>
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50 flex items-center justify-between">
                <span className="text-[14px]">手机认证</span>
                <button onClick={() => onToast?.('手机认证暂不可用')} className="text-[12px] text-textMuted hover:text-primary">{phoneVerified ? '已认证' : '去认证'}</button>
              </div>
            </div>
          </div>
          )}

          {mineTab === 'orders' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3">订单列表</h3>
            <div className="flex gap-2">
              <input value={orderNo} onChange={(e) => setOrderNo(e.target.value)} placeholder="输入订单号，提交后进行订单绑定" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <button onClick={submitOrderBind} className="h-11 px-4 rounded-xl bg-primary text-white">绑定</button>
            </div>
            <div className="mt-3 space-y-2">
              {orders.length === 0 && <p className="text-[12px] text-textMuted">暂无绑定订单</p>}
              {orders.map((item) => (
                <div key={item.id} className="p-3 rounded-xl border border-borderLine bg-appBg/40 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-textMain">订单号：{item.orderNo}</p>
                    <p className="text-[11px] text-textMuted mt-1">{item.time}</p>
                  </div>
                  <span className="text-[12px] text-primary">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {mineTab === 'overview' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3 flex items-center gap-2"><CurrencyCircleDollar size={18} />我的奖励</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div
                className="p-4 rounded-2xl text-white border border-primary/20"
                style={{ background: 'linear-gradient(135deg, #75a8a4 0%, #6b9c98 100%)' }}
              >
                <p className="text-[12px] text-white/85">可提现余额</p>
                <p className="text-[26px] font-bold mt-2">¥ {balance.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-appBg border border-borderLine">
                <p className="text-[12px] text-textMuted">累计奖励</p>
                <p className="text-[24px] text-textMain font-bold mt-2">¥ 268.90</p>
              </div>
              <div className="p-4 rounded-2xl bg-appBg border border-borderLine">
                <p className="text-[12px] text-textMuted">本月奖励</p>
                <p className="text-[24px] text-textMain font-bold mt-2">¥ 46.20</p>
              </div>
            </div>
          </div>
          )}

          {mineTab === 'withdraw' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-textMain mb-3">提现</h3>
            <div className="flex gap-2">
              <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="请输入提现金额" className="flex-1 h-11 px-3 rounded-xl border border-borderLine focus:border-primary outline-none bg-appBg/40" />
              <button onClick={submitWithdraw} className="h-11 px-4 rounded-xl bg-primary text-white">申请提现</button>
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
                  <span className="text-[12px] text-primary">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {mineTab === 'invite' && (
          <div className="bg-cardWhite border border-borderLine rounded-2xl p-5 shadow-[var(--shadow-card)] space-y-4">
            <h3 className="text-[15px] font-bold text-textMain">邀请好友</h3>
            <div
              className="p-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #75a8a4 0%, #6b9c98 100%)' }}
            >
              <p className="text-[12px] text-white/85">我的邀请码</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[28px] font-bold tracking-widest">{inviteCode}</p>
                <button
                  onClick={() => {
                    navigator?.clipboard?.writeText?.(inviteCode);
                    onToast?.('邀请码已复制');
                  }}
                  className="h-9 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-[13px]"
                >
                  复制邀请码
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50">
                <p className="text-[12px] text-textMuted">今日邀请奖励</p>
                <p className="text-[22px] font-bold text-textMain mt-1">¥ 18.30</p>
              </div>
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50">
                <p className="text-[12px] text-textMuted">累计邀请奖励</p>
                <p className="text-[22px] font-bold text-textMain mt-1">¥ 206.50</p>
              </div>
              <div className="p-3 rounded-xl border border-borderLine bg-appBg/50">
                <p className="text-[12px] text-textMuted">待结算奖励</p>
                <p className="text-[22px] font-bold text-textMain mt-1">¥ 33.20</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[14px] font-bold text-textMain">邀请列表</h4>
              {inviteList.map((item) => (
                <div key={item.id} className="p-3 rounded-xl border border-borderLine bg-appBg/40 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-textMain">{item.name} · {item.status}</p>
                    <p className="text-[11px] text-textMuted mt-1">{item.time}</p>
                  </div>
                  <span className="text-[13px] font-medium text-primary">+¥ {item.reward}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl border border-borderLine bg-appBg/30">
              <h4 className="text-[13px] font-bold text-textMain mb-2">邀请规则</h4>
              <p className="text-[12px] text-textMuted">1. 被邀请用户完成首单后发放奖励。</p>
              <p className="text-[12px] text-textMuted mt-1">2. 奖励预计T+1结算到可提现余额。</p>
              <p className="text-[12px] text-textMuted mt-1">3. 异常订单或退款订单不参与奖励。</p>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}

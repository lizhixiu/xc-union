import { ArrowLeft, ClipboardText } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import assistantAvatar from '../assets/chat-rebate-assistant.png';
import userAvatar from '../assets/chat-fortune-cat.png';

const INPUT_MIN_HEIGHT = 40;
const INPUT_MAX_HEIGHT = 104;

function Avatar({ type }) {
  const isUser = type === 'user';
  const image = isUser ? userAvatar : assistantAvatar;

  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-10 w-10 shrink-0 overflow-hidden rounded-[10px] border p-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${isUser ? 'border-[#FFC8C8] bg-[#FFF3F3]' : 'border-[#FFE0A3] bg-[#FFF9E8]'}`}
    >
      <img src={image} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

function getPlatformMeta(product) {
  const source = `${product.itemLink || ''} ${product.couponLongUrl || ''}`.toLowerCase();

  if (source.includes('jd.com') || source.includes('jingdong')) {
    return { mark: '京', name: '京东购物', color: 'bg-[#E1251B]' };
  }
  if (source.includes('pinduoduo') || source.includes('yangkeduo')) {
    return { mark: '拼', name: '拼多多', color: 'bg-[#E02E24]' };
  }
  if (source.includes('douyin')) {
    return { mark: '抖', name: '抖音购物', color: 'bg-[#171717]' };
  }

  return { mark: '淘', name: '淘宝购物', color: 'bg-[#FF5000]' };
}

function formatAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return String(value ?? '0');
  return amount.toFixed(2).replace(/\.?0+$/, '');
}

function ProductPreview({ product, onAction }) {
  const platform = getPlatformMeta(product);
  const hasCoupon = product.couponAmount > 0;
  const couponAmount = formatAmount(product.couponAmount);
  const price = formatAmount(product.price);
  const rebate = formatAmount(product.rebate);

  return (
    <article className="parse-product-card">
      <header className="parse-product-title flex min-w-0 items-start gap-2 border-b border-[#F2F2F2] pb-2.5">
        <span
          title={platform.name}
          aria-label={platform.name}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] text-[11px] font-semibold leading-none text-white ${platform.color}`}
        >
          {platform.mark}
        </span>
        <div className="min-w-0 flex-1">
          <h2 title={product.title} className="parse-product-title-text line-clamp-2 text-[15px] font-semibold leading-5 text-[#242424]">
            {product.title}
          </h2>
          <p className="parse-product-title-meta mt-1 truncate text-[11px] leading-4 text-[#9A9A9A]">{product.shopName || platform.name}</p>
        </div>
      </header>

      <div className="parse-product-body mt-2.5 flex min-h-[104px] gap-3">
        <div className="parse-product-image h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[8px] bg-[#F7F7F7]">
          <img
            src={product.image || 'https://placehold.co/320x320/F7F8FA/94A3B8?text=GOODS'}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="parse-product-info flex min-w-0 flex-1 flex-col justify-center">
          <div className="parse-product-metrics space-y-1">
            <div className="parse-product-metric flex min-w-0 items-baseline gap-1.5 text-[15px] leading-5 text-[#4A4A4A]">
              <span className="shrink-0">券后：</span>
              <span className="parse-product-amount truncate text-[18px] font-semibold leading-5 text-[#2E2E2E]">{price}</span>
            </div>
            <div className="parse-product-metric flex min-w-0 items-baseline gap-1.5 text-[15px] leading-5 text-[#4A4A4A]">
              <span className="shrink-0">优惠：</span>
              <span className={`parse-product-amount truncate text-[18px] font-semibold leading-5 ${hasCoupon ? 'text-[#FF315A]' : 'text-[#2E2E2E]'}`}>{couponAmount}</span>
            </div>
            <div className="parse-product-metric flex min-w-0 items-baseline gap-1.5 text-[15px] leading-5 text-[#4A4A4A]">
              <span className="shrink-0">返现：</span>
              <span className="parse-product-amount truncate text-[18px] font-semibold leading-5 text-[#FF6A00]">{rebate}元</span>
            </div>
          </div>
        </div>
      </div>
      <div className="parse-product-actions mt-3 flex gap-2 border-t border-[#F0F0F0] pt-2.5">
        <button
          type="button"
          onClick={() => onAction(product, 'share')}
          className="parse-product-action flex h-9 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#FFC900] to-[#FF9402] text-[13px] font-semibold text-[#7A3D00] shadow-[0_3px_8px_rgba(255,157,19,0.25)] outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#FF9402]/35"
        >
          立即分享
        </button>
        <button
          type="button"
          onClick={() => onAction(product, 'buy')}
          className="parse-product-action flex h-9 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4724] to-[#FF0036] text-[13px] font-semibold text-white shadow-[0_3px_8px_rgba(255,45,66,0.26)] outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#FF5000]/35"
        >
          马上购买
        </button>
      </div>
    </article>
  );
}

function ProductResultBubble({ product, onAction }) {
  return (
    <div className="relative w-full">
      <span aria-hidden="true" className="absolute -left-[5px] top-3 h-3 w-3 rotate-45 bg-white" />
      <div className="wx-rich-message parse-product-bubble relative z-10 w-full rounded-[12px] bg-white p-3.5 text-[#1F1F1F]">
        <ProductPreview product={product} onAction={onAction} />
      </div>
    </div>
  );
}

function CouponResultBubble({ product, onAction }) {
  if (product.couponAmount <= 0) return null;

  return (
    <div className="relative w-full">
      <span aria-hidden="true" className="absolute -left-[5px] top-3 h-3 w-3 rotate-45 bg-white" />
      <div className="wx-rich-message relative z-10 w-full rounded-[10px] bg-white p-3 text-[#1F1F1F]">
        <p className="text-[14px] font-medium leading-5">有的哦！这款商品有 {product.couponAmount} 元优惠券，点击即可领取。</p>
        <button
          type="button"
          onClick={() => onAction(product, 'buy')}
          className="mt-2.5 flex h-[72px] w-full items-center gap-2 rounded-[7px] border border-[#FFE0E6] bg-[#FFF7F8] px-3 text-left outline-none transition-transform active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#FF5000]/35"
        >
          <span className="text-[28px] font-semibold leading-none text-[#FF315A]">¥{product.couponAmount}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] font-medium text-[#333333]">{product.coupon}</span>
            <span className="mt-1 block text-[11px] text-[#9A9A9A]">领券后下单更优惠</span>
          </span>
          <span className="shrink-0 rounded-[4px] bg-[#FF315A] px-2.5 py-1.5 text-[12px] font-semibold text-white">立即领取</span>
        </button>
      </div>
    </div>
  );
}

function TextBubble({ content, isUser }) {
  const background = isUser ? 'bg-[#95EC69]' : 'bg-white';
  const tailPosition = isUser ? '-right-[5px]' : '-left-[5px]';

  return (
    <div className="relative min-w-0 max-w-full">
      <span aria-hidden="true" className={`absolute ${tailPosition} top-3 h-3 w-3 rotate-45 ${background}`} />
      <div className={`wx-text-bubble relative z-10 w-fit max-w-full rounded-[8px] px-3 py-2.5 text-[15px] leading-6 text-[#191919] ${background}`}>
        {content}
      </div>
    </div>
  );
}

function ChatRow({ message, onAction }) {
  if (message.type === 'timestamp') {
    return <div className="wx-chat-time mx-auto py-1 text-center text-[12px] leading-5 text-[#B2B2B2]">{message.content}</div>;
  }

  if (message.type === 'system') {
    return <div className="mx-auto max-w-[88%] py-0.5 text-center text-[12px] leading-5 text-[#A8A8A8]">{message.content}</div>;
  }

  const isUser = message.type === 'user';
  const isProduct = message.type === 'product';
  const isCoupon = message.type === 'coupon';

  const isRichMessage = isProduct || isCoupon;

  return (
    <div className="wx-chat-row grid w-full grid-cols-[40px_minmax(0,1fr)_40px] items-start gap-x-2.5">
      {!isUser ? <Avatar type="bot" /> : null}
      <div className={`col-start-2 min-w-0 max-w-full ${isUser ? 'justify-self-end' : 'justify-self-start'} ${isRichMessage ? 'w-full' : 'w-fit'}`}>
        {isProduct ? (
          <ProductResultBubble product={message.product} onAction={onAction} />
        ) : isCoupon ? (
          <CouponResultBubble product={message.product} onAction={onAction} />
        ) : (
          <TextBubble content={message.content} isUser={isUser} />
        )}
      </div>
      {isUser ? <div className="col-start-3"><Avatar type="user" /></div> : null}
    </div>
  );
}

export default function ParseChatPage({ messages, isParsing = false, onParse, onBack, onAction }) {
  const [input, setInput] = useState('');
  const [inputHasOverflow, setInputHasOverflow] = useState(false);
  const [noticeProduct, setNoticeProduct] = useState(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const canSubmit = Boolean(input.trim()) && !isParsing;

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return undefined;

    const frame = requestAnimationFrame(() => {
      chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, isParsing]);

  const resizeInput = (element) => {
    if (!element) return;

    element.style.height = 'auto';
    const contentHeight = element.scrollHeight;
    const nextHeight = Math.min(Math.max(contentHeight, INPUT_MIN_HEIGHT), INPUT_MAX_HEIGHT);
    element.style.height = `${nextHeight}px`;
    const hasOverflow = contentHeight > INPUT_MAX_HEIGHT;
    setInputHasOverflow((previous) => (previous === hasOverflow ? previous : hasOverflow));
  };

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard?.readText?.();
      if (clipboardText) {
        setInput(clipboardText);
        requestAnimationFrame(() => {
          if (inputRef.current) {
            resizeInput(inputRef.current);
            inputRef.current.focus();
          }
        });
        return;
      }
    } catch {
      // Some browsers block clipboard reads until permission is granted.
    }

    inputRef.current?.focus();
  };

  const submit = (event) => {
    event?.preventDefault();
    const content = input.trim();
    if (!content || isParsing) return;

    onParse(content);
    setInput('');
    setInputHasOverflow(false);
    if (inputRef.current) inputRef.current.style.height = `${INPUT_MIN_HEIGHT}px`;
  };

  const confirmNotice = () => {
    const notice = noticeProduct;
    setNoticeProduct(null);
    if (notice?.product) onAction?.(notice.product, notice.action);
  };

  return (
    <section className="page parse-chat-page h-[100dvh] overflow-hidden bg-[#EDEDED] md:h-screen md:py-6">
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-[#F7F7F7] md:rounded-[24px] md:shadow-[0_18px_48px_rgba(0,0,0,0.16)]">
        <div className="flex h-12 shrink-0 items-center border-b border-[#E7E7E7] bg-[#F7F7F7] px-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="返回首页"
            className="flex h-8 w-8 items-center justify-center text-[#191919] active:opacity-55"
          >
            <ArrowLeft size={21} weight="regular" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-medium text-[#191919]">返利助手</h1>
          <span className="h-8 w-8" aria-hidden="true" />
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto px-3.5 py-4">
          <div className="flex flex-col gap-3.5">
            <div className="wx-chat-row grid w-full grid-cols-[40px_minmax(0,1fr)_40px] items-start gap-x-2.5">
              <Avatar type="bot" />
              <div className="col-start-2 w-fit max-w-full">
                <TextBubble content="你好呀，我是返利助手。把商品链接或淘口令发给我，我来帮你查询优惠和返利。" isUser={false} />
              </div>
            </div>
            {messages.map((message) => (
              <ChatRow key={message.id} message={message} onAction={(product, action) => setNoticeProduct({ product, action })} />
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="flex min-h-[58px] shrink-0 items-center gap-2 border-t border-[#DDDDDD] bg-[#F7F7F7] px-3 py-2">
          <textarea
            ref={inputRef}
            rows="1"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              resizeInput(event.target);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            placeholder="粘贴商品链接或淘口令"
            className={`h-10 flex-1 resize-none overflow-x-hidden rounded-[4px] border border-[#E0E0E0] bg-white px-3 py-2 text-[15px] leading-5 text-[#191919] outline-none placeholder:text-[#B3B3B3] focus:border-[#AEE7C2] ${inputHasOverflow ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
          />
          {input.trim() ? (
            <button
              type="submit"
              disabled={!canSubmit}
              className="h-9 shrink-0 rounded-[4px] bg-[#07C160] px-3.5 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isParsing ? '查询中' : '发送'}
            </button>
          ) : (
            <button
              type="button"
              onClick={pasteFromClipboard}
              aria-label="粘贴商品链接或淘口令"
              className="flex h-9 shrink-0 items-center justify-center gap-1 rounded-[4px] border border-[#D8EFDE] bg-[#F4FFF6] px-2.5 text-[13px] font-medium text-[#07C160] active:opacity-55"
            >
              <ClipboardText size={18} weight="regular" />
              粘贴
            </button>
          )}
        </form>
      </div>

      {noticeProduct ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/35 p-4" onClick={() => setNoticeProduct(null)}>
          <div className="w-full max-w-[360px] rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)]" onClick={(event) => event.stopPropagation()}>
            <div className="text-[15px] font-semibold text-[#111111]">温馨提示</div>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#333333]">
              测试环境产生的返利默认作为平台维护赞助。系统已预留完整的底层 API，欢迎开发者开箱即用、二次开发，快速孵化独立的私域返利助手。技术答疑请加群沟通。
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={confirmNotice}
                className="h-9 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF5000] px-4 text-[13px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#FF5000]/35"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

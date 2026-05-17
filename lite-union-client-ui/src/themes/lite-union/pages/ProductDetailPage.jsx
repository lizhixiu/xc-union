import { ArrowLeft, CaretRight, House, Heart, Storefront } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

const heroImages = [
  'https://img.alicdn.com/imgextra/i3/2200726807241/O1CN01kM8pGf23xwV7kU6T9_!!2200726807241.jpg',
  'https://img.alicdn.com/imgextra/i2/2200726807241/O1CN01B5Evq523xwV7jijpt_!!2200726807241.jpg',
  'https://img.alicdn.com/imgextra/i1/2200726807241/O1CN01zQyv9C23xwV5Qh8Jq_!!2200726807241.jpg'
];

export default function ProductDetailPage({ standalone = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedProduct = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('lite_union_selected_product');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  const title =
    selectedProduct?.title ||
    selectedProduct?.itemName ||
    '敬修堂膏贴...';
  const shopName = selectedProduct?.shopName || '敬修堂官方旗舰店';
  const price = String(selectedProduct?.price || '10.00');
  const originalPrice = String(selectedProduct?.originalPrice || selectedProduct?.original || '19.90').replace('¥', '');
  const rebate = String(selectedProduct?.rebate || '1.58');
  const couponText = selectedProduct?.coupon || (Number(selectedProduct?.couponPrice || 0) > 0 ? `平台券 ¥${selectedProduct.couponPrice}` : '平台优惠券');
  const couponAmount = Number(selectedProduct?.couponPrice || 20);
  const mainImage = selectedProduct?.image || heroImages[0];
  const carouselImages = [mainImage, ...heroImages.filter((img) => img !== mainImage)].slice(0, 3);

  const currentImage = useMemo(() => carouselImages[activeIndex % carouselImages.length], [activeIndex, carouselImages]);
  const returnPath = useMemo(() => {
    try {
      return sessionStorage.getItem('lite_union_return_path') || '/';
    } catch {
      return '/';
    }
  }, []);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-white md:rounded-3xl md:overflow-hidden md:border md:border-[#ECEEF2]">
          <div className="relative bg-white flex items-center justify-center overflow-hidden">
            <img src={currentImage} alt="商品主图" className="w-full h-[375px] object-cover" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <button onClick={() => window.location.assign(returnPath)} className="w-9 h-9 rounded-full bg-black/25 text-white flex items-center justify-center backdrop-blur-sm">
                <ArrowLeft size={18} />
              </button>
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full ${idx === activeIndex ? 'w-5 bg-white' : 'w-2 bg-white/60'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-[84px] px-0 space-y-0 bg-white">
            <div className="bg-white px-4 py-2.5 border-b border-[#F0F1F4]">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-end gap-2 min-w-0">
                  <div className="text-[#FF0036] font-bold leading-none shrink-0">
                    <span className="text-[16px] mr-0.5">¥</span>
                    <span className="text-[28px]">{price}</span>
                  </div>
                  <span className="h-4 px-1 py-[1px] rounded-[3px] bg-[#FFF0F3] text-[#FF0036] text-[10px] inline-flex items-center shrink-0 leading-none">券后价</span>
                  <span className="text-[12px] text-[#999999] line-through mb-0.5 shrink-0">原价 ¥{originalPrice}</span>
                </div>
                <span className="text-[#999999] text-[11px] leading-none shrink-0">月销 1.00万+</span>
              </div>
              <h1 className="mt-1.5 text-[16px] text-[#111111] font-semibold leading-[1.35]">{title}</h1>
              <div className="mt-2 inline-flex items-center px-2 py-[2px] rounded-[3px] bg-[#FFF4ED] border border-[#FFD8B2] text-[#FF5000] text-[12px] leading-none">
                预估佣金 ¥{rebate}
              </div>
              <div className="mt-2.5 h-8 rounded-[6px] bg-[#FFF4ED] border border-[#FFE7D8] px-2.5 flex items-center justify-between">
                <span className="text-[11px] text-[#B26A3E]">邀请好友下单，最高奖励 ¥5.88</span>
                <button className="h-6 px-2.5 rounded-full bg-[#FF6A2A] text-white text-[11px] font-medium">立即邀请</button>
              </div>
            </div>

            <div className="bg-white p-3 border-b border-[#F0F1F4]">
              <div className="rounded-xl bg-gradient-to-r from-[#FFF0F2] to-[#FFE4E8] border border-[#FFD5DC] px-3 py-2.5 text-[#FF0036] flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-[72%] top-[-8px] w-4 h-4 rounded-full bg-white" />
                <div className="absolute left-[72%] bottom-[-8px] w-4 h-4 rounded-full bg-white" />
                <div>
                  <div className="mt-0.5 text-[26px] leading-none font-bold">¥{couponAmount}</div>
                  <div className="mt-1 text-[10px] text-[#C24A61]">有效期至 2026-05-31</div>
                </div>
                <div className="h-10 border-l border-dashed border-[#FF8DA2] mx-3" />
                <button className="h-9 px-4 rounded-full bg-[#FF0036] text-white text-[13px] font-semibold shrink-0">立即领取</button>
              </div>
            </div>

            <div className="bg-white border-b border-[#F0F1F4] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#F7F8FA] border border-[#ECEEF2] flex items-center justify-center text-[#666E7A]"><Storefront size={16} /></span>
                  <div>
                    <div className="text-[14px] text-[#111111] font-semibold">玛丽安娜旗舰店</div>
                    <div className="mt-1 inline-flex h-5 px-2 rounded-md bg-[#FCF6ED] text-[#A6742B] text-[11px] items-center">品牌直营 · 正品保障</div>
                  </div>
                </div>
                <button className="h-7 px-2.5 rounded-full border border-[#E4E8EF] bg-white text-[#4B5565] text-[12px] inline-flex items-center gap-0.5">店铺逛逛<CaretRight size={12} /></button>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 md:static bg-white border-t border-[#ECEEF2] px-3 py-2.5 z-40">
            <div className="flex items-center gap-2.5">
              <button className="w-12 h-11 rounded-xl border border-[#ECEEF2] text-[#596273] flex flex-col items-center justify-center">
                <House size={16} />
                <span className="text-[10px] mt-0.5">首页</span>
              </button>
              <button className="w-12 h-11 rounded-xl border border-[#ECEEF2] text-[#596273] flex flex-col items-center justify-center">
                <Heart size={16} />
                <span className="text-[10px] mt-0.5">收藏</span>
              </button>
              <button className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#FFC900] to-[#FF9402] text-[#7A3D00] text-[14px] font-semibold shadow-[0_4px_10px_rgba(255,157,19,0.3)]">立即分享</button>
              <button className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#FF4724] to-[#FF0036] text-white text-[14px] font-semibold shadow-[0_4px_10px_rgba(255,45,66,0.32)]">马上购买</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

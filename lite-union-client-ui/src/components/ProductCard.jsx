export default function ProductCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="text-left bg-cardWhite border border-borderLine rounded-xl p-3 flex md:flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <img src="https://placehold.co/400x400/F0F6F5/94A3B8?text=商品图" className="w-[110px] h-[110px] md:w-full md:h-[220px] rounded object-cover bg-appBg border border-borderLine/50" />
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <h3 className="text-[14px] md:text-[15px] text-textMain font-medium leading-tight line-clamp-2 md:mb-3">{item.title}</h3>
        <div>
          <div className="inline-block border border-primary text-primary text-[10px] px-1.5 py-0.5 rounded-sm mb-1.5 bg-primaryLight">{item.coupon}</div>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-0.5">
              <span className="text-[12px] text-textMain">到手 ¥</span>
              <span className="text-[18px] md:text-[20px] font-bold text-textMain font-serif">{item.price}</span>
            </div>
            <span className="text-[11px] text-textMuted line-through">{item.original}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

import { Link } from '@phosphor-icons/react';

export default function SearchBar({ mobile = false, value, onChange, onPasteCapture, onParse }) {
  return (
    <div className={`flex items-center bg-cardWhite rounded border border-borderLine overflow-hidden focus-within:border-primary transition-colors ${mobile ? 'h-[44px]' : 'h-[40px] w-[300px] bg-appBg'}`}>
      <div className="pl-3 pr-2 text-textMuted"><Link size={18} /></div>
      <input
        placeholder={mobile ? '粘贴淘宝链接或口令' : '粘贴商品链接或口令'}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onPaste={(e) => onPasteCapture?.(e.clipboardData?.getData('text') || '')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onParse?.();
          }
        }}
        className="flex-1 bg-transparent border-none text-[14px] outline-none placeholder:text-textMuted text-textMain"
      />
      <button onClick={onParse} className={`h-full px-4 bg-primary text-white text-[13px] font-medium ${mobile ? 'border-l border-borderLine' : ''}`}>解析</button>
    </div>
  );
}

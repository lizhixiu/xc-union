import { ClockCounterClockwise, Leaf, TrendUp, User } from '@phosphor-icons/react';

const tabs = [
  { key: 'home', label: '首页', icon: Leaf },
  { key: 'footprint', label: '足迹返利', icon: ClockCounterClockwise },
  { key: 'rank', label: '好价', icon: TrendUp },
  { key: 'profile', label: '我', icon: User }
];

export default function BottomNav({ page, onSwitch }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cardWhite border-t border-borderLine flex justify-around items-center h-[56px] z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = page === tab.key;
        return (
          <button key={tab.key} onClick={() => onSwitch(tab.key)} className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-[#FF0036]' : 'text-textMuted'}`}>
            <Icon size={22} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

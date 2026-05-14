import { Leaf, TrendUp, User } from '@phosphor-icons/react';

const tabs = [
  { key: 'home', label: '大厅', icon: Leaf },
  { key: 'rank', label: '榜单', icon: TrendUp },
  { key: 'profile', label: '资产', icon: User }
];

export default function BottomNav({ page, onSwitch }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cardWhite border-t border-borderLine flex justify-around items-center h-[56px] z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = page === tab.key;
        return (
          <button key={tab.key} onClick={() => onSwitch(tab.key)} className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-textMain' : 'text-textMuted'}`}>
            <Icon size={22} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

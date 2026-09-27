import { Icon, type IconName } from './Icon';

export type TabKey = 'home' | 'history' | 'profile';

const tabs: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'history', label: 'Alert History', icon: 'history' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

// Material Design bottom navigation bar with three tabs.
export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 inset-x-0 bg-white border-t border-neutral-200 px-2 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 z-30">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span
                className={`h-8 w-16 flex items-center justify-center rounded-full transition-all duration-200 ${
                  isActive ? 'bg-red-100' : 'bg-transparent'
                }`}
              >
                <Icon
                  name={tab.icon}
                  size={22}
                  className={isActive ? 'text-red-700' : 'text-neutral-500'}
                  strokeWidth={isActive ? 2.4 : 2}
                />
              </span>
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isActive ? 'text-red-700' : 'text-neutral-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

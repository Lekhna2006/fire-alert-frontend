import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

// Reusable top app bar used across the main screens.
interface AppBarProps {
  title: string;
  icon: IconName;
  action?: ReactNode;
}

export function AppBar({ title, icon, action }: AppBarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-neutral-200 px-4 h-14 flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-red-50 ring-1 ring-red-200 flex items-center justify-center">
        <Icon name={icon} size={20} className="text-red-700" />
      </div>
      <h1 className="text-lg font-semibold text-neutral-800 flex-1 truncate">{title}</h1>
      {action}
    </header>
  );
}

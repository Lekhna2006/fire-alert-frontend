import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

type Tone = 'neutral' | 'success' | 'danger' | 'warning';

const toneStyles: Record<Tone, { bg: string; text: string; ring: string }> = {
  neutral: { bg: 'bg-neutral-100', text: 'text-neutral-700', ring: 'ring-neutral-200' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
  danger: { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200' },
};

interface StatusCardProps {
  icon: IconName;
  title: string;
  value: string;
  tone: Tone;
  index?: number;
  children?: ReactNode;
}

// A rounded Material Design card used on the Home screen for each status tile.
export function StatusCard({ icon, title, value, tone, index = 0, children }: StatusCardProps) {
  const t = toneStyles[tone];
  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-black/5 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-500">{title}</span>
          <span className={`text-lg font-semibold ${t.text}`}>{value}</span>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ring-1 ${t.bg} ${t.ring}`}>
          <Icon name={icon} size={22} className={t.text} />
        </div>
      </div>
      {children}
    </div>
  );
}

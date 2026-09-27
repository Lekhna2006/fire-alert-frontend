import { Icon, type IconName } from './Icon';

export interface AlertCardProps {
  type: 'Fire Detected' | 'Smoke Detected';
  date: string;
  time: string;
  index?: number;
}

// A single alert entry in the Alert History list.
export function AlertCard({ type, date, time, index = 0 }: AlertCardProps) {
  const isFire = type === 'Fire Detected';
  const icon: IconName = isFire ? 'fire' : 'smoke';
  const tone = isFire
    ? { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200' }
    : { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200' };

  return (
    <div
      className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm ring-1 ring-black/5 animate-fade-in-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className={`h-12 w-12 shrink-0 rounded-xl flex items-center justify-center ring-1 ${tone.bg} ${tone.ring}`}>
        <Icon name={icon} size={24} className={tone.text} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold ${tone.text}`}>{type}</p>
        <p className="text-sm text-neutral-500 mt-0.5">
          {date} · {time}
        </p>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { Icon } from '../components/Icon';

interface SplashScreenProps {
  onDone: () => void;
}

// Splash screen: fire logo, app name, subtitle, and a loading indicator.
export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
      <div className="animate-scale-in flex flex-col items-center">
        <div className="h-28 w-28 rounded-3xl bg-red-50 ring-1 ring-red-100 flex items-center justify-center animate-pulse-ring">
          <Icon name="fire" size={64} className="text-red-700" strokeWidth={1.8} />
        </div>
        <h1 className="mt-7 text-3xl font-bold text-neutral-800 tracking-tight">Fire Alert</h1>
        <p className="mt-1 text-sm font-medium text-red-600 tracking-wide">Stay Safe</p>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3 animate-fade-in">
        <span className="h-8 w-8 rounded-full border-[3px] border-red-200 border-t-red-700 animate-spin-slow" />
        <span className="text-xs text-neutral-400">Loading…</span>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';

// Renders children inside a phone-shaped frame so the mobile UI is visible
// on desktop while remaining fully responsive on real phones.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-200 p-0 sm:p-6">
      <div className="relative w-full sm:w-[400px] h-[100svh] sm:h-[820px] sm:max-h-[92vh] bg-white sm:rounded-[2.5rem] sm:border-[10px] sm:border-neutral-900 sm:shadow-2xl overflow-hidden">
        {/* Notch (desktop only) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50" />
        {children}
      </div>
    </div>
  );
}

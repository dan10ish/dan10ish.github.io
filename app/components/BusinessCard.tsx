'use client';

import { TiltCard } from '@/components/ui/tilt-card';

export default function BusinessCard() {
  return (
    <div className="flex justify-center py-2">
      <TiltCard
        tiltLimit={15}
        scale={1.05}
        perspective={1200}
        className="rounded-2xl"
      >
        <div className="aspect-[1075/720] w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <img
            src="/assets/business-card.svg"
            alt="Danish's business card"
            className="h-full w-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </TiltCard>
    </div>
  );
}

import React from 'react';
import { CustomerOrder } from '../types';
import { CheckCircle2, PackageCheck, Truck, PartyPopper, Clock, XCircle } from 'lucide-react';

interface OrderStatusTrackerProps {
  status: CustomerOrder['status'];
  /** Compact mode uses smaller text/icons for tight spaces like list rows. */
  compact?: boolean;
}

// The four customer-facing milestones. "shipped" (an internal-only status
// some orders may briefly pass through) counts toward "Out for Delivery"
// being reached, since from the customer's point of view those are the
// same moment: the order has left the kitchen and is on its way.
const STEPS: { key: string; label: string; icon: React.ElementType; matches: CustomerOrder['status'][] }[] = [
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    icon: CheckCircle2,
    matches: ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'],
  },
  {
    key: 'packed',
    label: 'Order Packed',
    icon: PackageCheck,
    matches: ['packed', 'shipped', 'out_for_delivery', 'delivered'],
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery',
    icon: Truck,
    matches: ['shipped', 'out_for_delivery', 'delivered'],
  },
  {
    key: 'delivered',
    label: 'Delivered',
    icon: PartyPopper,
    matches: ['delivered'],
  },
];

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status, compact = false }) => {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
        <XCircle className="w-4 h-4 shrink-0" />
        <span className="text-xs font-bold">This order was cancelled.</span>
      </div>
    );
  }

  // Highest step index whose `matches` includes the current status.
  const reachedIndex = STEPS.reduce(
    (acc, step, idx) => (step.matches.includes(status) ? idx : acc),
    -1
  );

  if (status === 'pending') {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
        <Clock className="w-4 h-4 shrink-0" />
        <span className="text-xs font-bold">Order received — awaiting confirmation.</span>
      </div>
    );
  }

  return (
    <div className="flex items-start w-full">
      {STEPS.map((step, idx) => {
        const isReached = idx <= reachedIndex;
        const isCurrent = idx === reachedIndex;
        const Icon = step.icon;

        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center text-center" style={{ width: `${100 / STEPS.length}%` }}>
              <div
                className={`rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  compact ? 'w-6 h-6' : 'w-9 h-9 sm:w-10 sm:h-10'
                } ${
                  isReached
                    ? isCurrent
                      ? 'bg-[#E89A25] text-[#134e48] ring-4 ring-[#E89A25]/25'
                      : 'bg-[#134e48] text-white'
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                <Icon className={compact ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} />
              </div>
              <span
                className={`mt-1.5 font-bold leading-tight ${compact ? 'text-[9px]' : 'text-[10px] sm:text-xs'} ${
                  isReached ? 'text-[#134e48]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 rounded-full mt-2.5 sm:mt-3 ${compact ? 'h-1 mt-3' : 'h-1'} ${
                  idx < reachedIndex ? 'bg-[#134e48]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
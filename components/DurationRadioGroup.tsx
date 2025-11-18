'use client';

import type { PricingData } from '@/lib/pricing';
import RadioButton from './ui/RadioButton';

interface DurationRadioGroupProps {
  options: Array<{ days: number; price: number; gb: string }>;
  selectedDays: number | null;
  onDaysChange: (days: number) => void;
}

export default function DurationRadioGroup({
  options,
  selectedDays,
  onDaysChange,
}: DurationRadioGroupProps) {
  return (
    <div className="w-full space-y-3">
      {options.map((option) => (
        <RadioButton
          key={option.days}
          name="duration"
          value={option.days}
          checked={selectedDays === option.days}
          onChange={() => onDaysChange(option.days)}
          label={
            <div>
              <span>{option.days} days</span>
              {option.days === 15 && (
                <span className="ml-3 px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded">
                  Popular choice
                </span>
              )}
            </div>
          }
          rightContent={
            <div>
              <span className="font-black text-gray-900 text-lg">${option.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 ml-1">USD</span>
            </div>
          }
        />
      ))}
    </div>
  );
}


'use client';

interface PricingDisplayProps {
  price: number | null;
  gb?: string;
  days?: number;
  country?: string;
}

export default function PricingDisplay({
  price,
  gb,
  days,
  country,
}: PricingDisplayProps) {
  if (price === null) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-sm font-medium">Please select a country and duration</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-2xl border-2 border-blue-500">
      <div className="text-center text-white">
        <p className="text-sm font-medium text-blue-100 mb-3 opacity-90">
          {country && `${country} • `}
          {days && `${days} days`}
          {gb && ` • ${gb}`}
        </p>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-5xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs font-medium text-blue-100 opacity-80">Total price</p>
      </div>
    </div>
  );
}


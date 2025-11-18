'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { PricingData } from '@/lib/pricing';
import CountryDropdown from './CountryDropdown';
import DataPlanTabs from './DataPlanTabs';
import DurationRadioGroup from './DurationRadioGroup';
import DeviceCompatibilityButton from './DeviceCompatibilityButton';
import Button from './ui/Button';

interface PricingClientProps {
  pricingData: PricingData[];
  countryList: Array<{ name: string; code: string }>;
}

function parseDataSize(size: string): number {
  if (size === 'Unlimited') return Infinity;
  const upper = size.toUpperCase();
  if (upper.includes('TB')) {
    const num = parseFloat(size.replace(/[^0-9.]/g, ''));
    return num * 1024 * 1024;
  }
  if (upper.includes('GB')) {
    const num = parseFloat(size.replace(/[^0-9.]/g, ''));
    return num * 1024;
  }
  if (upper.includes('MB')) {
    return parseFloat(size.replace(/[^0-9.]/g, ''));
  }
  const num = parseFloat(size.replace(/[^0-9.]/g, ''));
  return num * 1024;
}

export default function PricingClient({
  pricingData,
  countryList,
}: PricingClientProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedGb, setSelectedGb] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [currentPricing, setCurrentPricing] = useState<PricingData | null>(null);
  const router = useRouter();

  const availableGbOptions = useMemo(() => {
    if (!selectedCountry) return [];
    const gbSet = new Set(
      pricingData
        .filter(item => item.countryCode === selectedCountry)
        .map(item => item.gb)
    );
    return Array.from(gbSet).sort((a, b) => {
      if (a === 'Unlimited') return 1;
      if (b === 'Unlimited') return -1;
      return parseDataSize(a) - parseDataSize(b);
    });
  }, [selectedCountry, pricingData]);

  const availableDurationOptions = useMemo(() => {
    if (!selectedCountry || !selectedGb) return [];
    return pricingData
      .filter(item => item.countryCode === selectedCountry && item.gb === selectedGb)
      .map(item => ({ days: item.days, price: item.price, gb: item.gb }))
      .sort((a, b) => a.days - b.days);
  }, [selectedCountry, selectedGb, pricingData]);

  useEffect(() => {
    if (selectedCountry && availableGbOptions.length > 0) {
      setSelectedGb(prev => {
        if (!prev || !availableGbOptions.includes(prev)) {
          return availableGbOptions[0];
        }
        return prev;
      });
    } else {
      setSelectedGb(null);
    }
  }, [selectedCountry, availableGbOptions]);

  useEffect(() => {
    if (selectedGb && availableDurationOptions.length > 0) {
      setSelectedDays(prev => {
        if (!prev || !availableDurationOptions.find(o => o.days === prev)) {
          return availableDurationOptions[0].days;
        }
        return prev;
      });
    } else {
      setSelectedDays(null);
    }
  }, [selectedGb, availableDurationOptions]);

  useEffect(() => {
    if (selectedCountry && selectedGb && selectedDays) {
      const pricing = pricingData.find(
        item => 
          item.countryCode === selectedCountry && 
          item.gb === selectedGb && 
          item.days === selectedDays
      ) || null;
      setCurrentPricing(pricing);
    } else {
      setCurrentPricing(null);
    }
  }, [selectedCountry, selectedGb, selectedDays, pricingData]);

  const handleCheckout = () => {
    if (selectedCountry && selectedDays && currentPricing) {
      const params = new URLSearchParams({
        country: currentPricing.country,
        countryCode: currentPricing.countryCode,
        days: selectedDays.toString(),
        price: currentPricing.price.toString(),
        gb: currentPricing.gb,
      });
      router.push(`/checkout?${params.toString()}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <CountryDropdown
          countries={countryList}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
        />
      </div>

      {selectedCountry && availableGbOptions.length > 0 && (
        <div>
          <DataPlanTabs
            options={availableGbOptions}
            selectedGb={selectedGb}
            onGbChange={setSelectedGb}
          />
        </div>
      )}

      {selectedGb && availableDurationOptions.length > 0 && (
        <div>
          <DurationRadioGroup
            options={availableDurationOptions}
            selectedDays={selectedDays}
            onDaysChange={setSelectedDays}
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>All plans have a 30-day activation period.</span>
        </div>
        <DeviceCompatibilityButton />
      </div>

      {currentPricing && (
        <Button
          onClick={handleCheckout}
          variant="gradient"
          size="lg"
          className="w-full shadow-lg"
        >
          Go to checkout
        </Button>
      )}
    </div>
  );
}

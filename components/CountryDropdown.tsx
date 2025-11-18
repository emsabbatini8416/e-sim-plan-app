'use client';

import { useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';
import Button from './ui/Button';

interface CountryDropdownProps {
  countries: Array<{ name: string; code: string }>;
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

export default function CountryDropdown({
  countries,
  selectedCountry,
  onCountryChange,
}: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg border-2 border-gray-300 bg-white hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          {selectedCountryData && (
            <span
              className={`fi fi-${selectedCountryData.code.toLowerCase()} text-xl`}
            ></span>
          )}
          <span className="text-gray-700 font-medium">
            {selectedCountryData?.name || 'Select Country'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Country</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <Button
                key={country.code}
                onClick={() => {
                  onCountryChange(country.code);
                  setIsOpen(false);
                }}
                variant="secondary"
                size="sm"
                className="w-full flex items-center gap-3 justify-start text-left hover:bg-gray-50 border-0 rounded-none"
              >
                <span
                  className={`fi fi-${country.code.toLowerCase()} text-xl`}
                ></span>
                <span>{country.name}</span>
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


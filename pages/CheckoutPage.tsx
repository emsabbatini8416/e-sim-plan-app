'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import 'flag-icons/css/flag-icons.min.css';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  
  const country = searchParams?.get('country') || 'N/A';
  const countryCode = searchParams?.get('countryCode') || '';
  const days = searchParams?.get('days') || 'N/A';
  const price = searchParams?.get('price') || 'N/A';
  const gb = searchParams?.get('gb') || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Selected Information
          </h1>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Your Selection
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium w-32">Country:</span>
                  <div className="flex items-center gap-2">
                    {countryCode && (
                      <span
                        className={`fi fi-${countryCode.toLowerCase()} text-2xl`}
                      ></span>
                    )}
                    <span className="text-gray-900 font-semibold">{country}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium w-32">Duration:</span>
                  <span className="text-gray-900 font-semibold">{days} days</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium w-32">Data:</span>
                  <span className="text-gray-900 font-semibold">{gb}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium w-32">Price:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${typeof price === 'string' && !isNaN(parseFloat(price)) 
                      ? parseFloat(price).toFixed(2) 
                      : price}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center pt-6">
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Back to Selection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


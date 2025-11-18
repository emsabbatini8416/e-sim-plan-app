import { fetchPricingData, getCountriesFromPricingData } from '@/lib/pricing';
import PricingClient from '@/components/PricingClient';
import Image from 'next/image';

export default async function Home() {
  const pricingData = await fetchPricingData();
  const countries = getCountriesFromPricingData(pricingData);
  
  const countryList = countries.map(country => {
    const firstMatch = pricingData.find(item => item.country === country);
    return {
      name: country,
      code: firstMatch?.countryCode || '',
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/image.png"
                alt="Scenic landscape with cherry blossoms"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Select eSIM plan
                </h1>
                <p className="text-gray-600 text-base">
                  Get an eSIM and enjoy reliable and affordable internet access on your trip.
                </p>
              </div>
              
              <PricingClient
                pricingData={pricingData}
                countryList={countryList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

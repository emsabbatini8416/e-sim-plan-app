import { Suspense } from 'react';
import 'flag-icons/css/flag-icons.min.css';
import CheckoutPage from '@/pages/CheckoutPage';

export default function Checkout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <CheckoutPage />
    </Suspense>
  );
}


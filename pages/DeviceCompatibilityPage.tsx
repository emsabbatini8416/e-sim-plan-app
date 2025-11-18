import Link from 'next/link';

export default function DeviceCompatibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Device Compatibility Check
        </h1>
        <p className="text-gray-600 mb-6">
          This page will be developed in the future to check device compatibility.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}


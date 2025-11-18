'use client';

import { useRouter } from 'next/navigation';
import Button from './ui/Button';

export default function DeviceCompatibilityButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/device-compatibility');
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="sm"
      className="flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <span>Check device compatibility</span>
    </Button>
  );
}


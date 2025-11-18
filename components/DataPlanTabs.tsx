'use client';

import Button from './ui/Button';

interface DataPlanTabsProps {
  options: string[];
  selectedGb: string | null;
  onGbChange: (gb: string) => void;
}

export default function DataPlanTabs({
  options,
  selectedGb,
  onGbChange,
}: DataPlanTabsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {options.map((gb) => (
          <Button
            key={gb}
            onClick={() => onGbChange(gb)}
            variant={selectedGb === gb ? 'primary' : 'secondary'}
            size="sm"
            className={`
              flex-shrink-0 whitespace-nowrap
              ${selectedGb === gb ? 'bg-gray-900 hover:bg-gray-800' : ''}
            `}
          >
            {gb}
          </Button>
        ))}
      </div>
    </div>
  );
}


import { InputHTMLAttributes, ReactNode } from 'react';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  checked: boolean;
  rightContent?: ReactNode;
}

export default function RadioButton({
  label,
  checked,
  rightContent,
  className = '',
  ...props
}: RadioButtonProps) {
  return (
    <label
      className={`
        flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        ${
          checked
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          checked={checked}
          className="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900"
          {...props}
        />
        <div className={checked ? 'text-gray-900 font-semibold' : 'text-gray-700 font-semibold'}>
          {label}
        </div>
      </div>
      {rightContent && (
        <div className="text-right">
          {rightContent}
        </div>
      )}
    </label>
  );
}


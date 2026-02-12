import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div className="flex-1">
          {label && <h4 className="font-semibold text-text-primary mb-1">{label}</h4>}
          {description && (
            <p className="text-xs text-text-secondary">{description}</p>
          )}
        </div>
      )}
      <div
        className={`toggle-premium ${checked ? 'active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <div className="toggle-circle" />
      </div>
    </div>
  );
};

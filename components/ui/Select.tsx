import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wide text-text-secondary mb-2">
          {label}
        </label>
      )}
      <select className={`select-premium ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-text-muted text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

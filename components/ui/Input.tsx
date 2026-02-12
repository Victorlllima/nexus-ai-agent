import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
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
      <input
        className={`input-premium ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-text-muted text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};
